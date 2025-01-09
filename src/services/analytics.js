class Analytics {
  constructor() {
    this.baseUrl = "https://analytics-ykxfja.fly.dev/api/analytics";
    this.sessionId = null;
  }

  async startSession() {
    try {
      const response = await fetch(`${this.baseUrl}/session/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referrer: document.referrer || "Direct",
        }),
      });

      if (!response.ok) return;

      const data = await response.json();
      this.sessionId = data.sessionId;
    } catch {
      // Silently fail
    }
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
