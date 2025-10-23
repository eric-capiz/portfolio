class Analytics {
  constructor() {
    this.baseUrl = "https://analytics-new.fly.dev/api/analytics";

    this.sessionId = null;
    this.sectionStartTimes = {};
    this.lastScrollUpdate = Date.now();
    this.scrollUpdateInterval = 5000;
    this.location = null;
  }

  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    let version = "Unknown";

    if (ua.includes("Firefox/")) {
      browser = "Firefox";
      version = ua.match(/Firefox\/([0-9.]+)/)[1];
    } else if (ua.includes("Chrome/")) {
      browser = "Chrome";
      version = ua.match(/Chrome\/([0-9.]+)/)[1];
    } else if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
      browser = "Safari";
      version = ua.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (ua.includes("Edge/")) {
      browser = "Edge";
      version = ua.match(/Edge\/([0-9.]+)/)[1];
    }

    return { browser, version };
  }

  async getLocation() {
    if (this.location) return this.location;

    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      this.location = {
        country: data.country_name,
        region: data.region,
        city: data.city,
        timezone: data.timezone,
        ip: data.ip,
      };
      return this.location;
    } catch {
      this.location = {
        country: "Unknown",
        region: "Unknown",
        city: "Unknown",
        timezone: "Unknown",
        ip: "Unknown",
      };
      return this.location;
    }
  }

  getTrafficSource() {
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    const utmCampaign = urlParams.get("utm_campaign");

    if (!referrer || referrer === "") {
      return {
        type: "direct",
        source: "Direct",
        medium: "none",
        campaign: utmCampaign || "none",
      };
    }

    const referrerUrl = new URL(referrer);
    const hostname = referrerUrl.hostname;

    // Check for social media
    if (hostname.includes("facebook.com") || hostname.includes("fb.com")) {
      return {
        type: "social",
        source: "Facebook",
        medium: "social",
        campaign: utmCampaign || "none",
      };
    } else if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return {
        type: "social",
        source: "Twitter/X",
        medium: "social",
        campaign: utmCampaign || "none",
      };
    } else if (hostname.includes("linkedin.com")) {
      return {
        type: "social",
        source: "LinkedIn",
        medium: "social",
        campaign: utmCampaign || "none",
      };
    } else if (hostname.includes("github.com")) {
      return {
        type: "referral",
        source: "GitHub",
        medium: "referral",
        campaign: utmCampaign || "none",
      };
    } else if (
      hostname.includes("google.com") ||
      hostname.includes("bing.com") ||
      hostname.includes("yahoo.com")
    ) {
      return {
        type: "search",
        source: hostname.includes("google.com")
          ? "Google"
          : hostname.includes("bing.com")
          ? "Bing"
          : "Yahoo",
        medium: "organic",
        campaign: utmCampaign || "none",
      };
    } else {
      return {
        type: "referral",
        source: hostname,
        medium: "referral",
        campaign: utmCampaign || "none",
      };
    }
  }

  async startSession() {
    try {
      const deviceInfo = {
        type: this.getDeviceType(),
        ...this.getBrowserInfo(),
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      };

      const location = await this.getLocation();
      const trafficSource = this.getTrafficSource();

      const response = await fetch(`${this.baseUrl}/session/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referrer: document.referrer || "Direct",
          deviceInfo,
          location,
          trafficSource,
        }),
      });

      if (!response.ok) return;

      const data = await response.json();
      this.sessionId = data.sessionId;
      this.startScrollTracking();
    } catch {
      // Silently fail
    }
  }

  startScrollTracking() {
    // Track section visibility
    const sections = ["about", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.id;
            this.sectionStartTimes[section] = Date.now();
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    // Track scroll depth
    window.addEventListener(
      "scroll",
      this.throttle(() => {
        this.updateScrollTracking();
      }, 1000)
    );
  }

  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  async updateScrollTracking() {
    if (!this.sessionId) return;

    const now = Date.now();
    if (now - this.lastScrollUpdate < this.scrollUpdateInterval) return;

    const sections = ["about", "projects", "skills", "contact"];
    const scrollData = [];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Calculate scroll depth percentage
      let scrollDepth = 0;
      if (sectionTop < windowHeight && sectionBottom > 0) {
        const visibleHeight =
          Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0);
        scrollDepth = (visibleHeight / sectionHeight) * 100;
      }

      // Calculate time spent
      const timeSpent = this.sectionStartTimes[section]
        ? now - this.sectionStartTimes[section]
        : 0;

      if (scrollDepth > 0) {
        scrollData.push({
          section,
          maxScrollDepth: scrollDepth,
          timeSpent,
        });
      }
    }

    if (scrollData.length > 0) {
      try {
        await fetch(`${this.baseUrl}/session/${this.sessionId}/scroll`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scrollData),
        });
      } catch {
        // Silently fail
      }
    }

    this.lastScrollUpdate = now;
  }

  async trackAction(action) {
    if (!this.sessionId) return;

    try {
      await fetch(`${this.baseUrl}/session/${this.sessionId}/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action),
      });
    } catch {
      // Silently fail
    }
  }
}

export default new Analytics();
