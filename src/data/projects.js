/**
 * Shared project copy for the UI and build-time SEO prerender.
 * Image files stay mapped in Projects.jsx via imageKey.
 */
export const projectsData = [
  {
    id: 9,
    imageKey: "reziq",
    name: "RezIQ",
    description:
      "RezIQ is an AI career assistant that compares your resume to a real job description and explains the fit with evidence. Upload a DOCX, paste the posting, and get a Strong, Possible, or Poor fit read plus improvement suggestions you can accept before exporting. It never invents skills or experience you cannot claim.",
    demoLogin: [{ role: "Demo", user: "demo", pass: "demo11" }],
    techStack: ["React", "Next.js", "MongoDB", "Gemini", "Groq"],
    codeLink: "https://github.com/eric-capiz/reziq",
    liveLink: "https://reziq-phi.vercel.app/",
    videoSrc: "/demo_clips/reziq.mp4",
  },
  {
    id: 8,
    imageKey: "referra",
    name: "Referra",
    description:
      "Privacy first referral networking app. Post anonymous referral leads, request a handshake, and unlock identity and chat only after both sides accept. Also includes a private job search on your profile: Standard or AI powered searches across US job boards, resume matching, application tracking, and export for weekly follow up.",
    demoLogin: [{ role: "Demo", user: "henry@demo.referra", pass: "demo" }],
    techStack: ["MERN", "Socket.IO"],
    codeLink: "https://github.com/eric-capiz/refera",
    liveLink: "https://referra-iota.vercel.app/",
    videoSrc: "/demo_clips/referra.mp4",
  },
  {
    id: 11,
    imageKey: "devdrill",
    name: "Dev Drill",
    description:
      "Dev Drill is a gameshow style web dev quiz app. Contestants pick a level, track, and subject, then play fixed length or unlimited multiple choice rounds. Questions are AI generated when needed, stored in MongoDB, and reused later. Quizzes are graded deterministically, with skip and rotate, saved recaps, and a live global scoreboard for high scores and unlimited streaks.",
    demoLogin: [{ role: "Demo", user: "demo", pass: "demo" }],
    techStack: ["React", "TypeScript", "Next.js", "MongoDB", "Groq"],
    codeLink: "https://github.com/eric-capiz/devdrill",
    liveLink: "https://devdrill-ec.vercel.app/",
  },
  {
    id: 7,
    imageKey: "lead",
    name: "LeadReach",
    description:
      "Next.js app for solo outreach: search Google Places by category or business name, pull leads into MongoDB, enrich with optional social hints, and draft outreach using reusable merge field templates.",
    demoLogin: [{ role: "Demo", user: "demo", pass: "demo" }],
    techStack: ["React", "Next.js", "MongoDB"],
    liveLink: "https://lead-reach.vercel.app/",
  },
  {
    id: 1,
    imageKey: "chopShop",
    name: "Chop Shop",
    description:
      "Multi barber booking app. Users book appointments and leave reviews; admins manage barbers, services, gallery, and availability.",
    demoLogin: [
      { role: "Admin", user: "admin0", pass: "admin0" },
      { role: "User", user: "breezy", pass: "breezy" },
    ],
    techStack: ["MERN", "TypeScript", "React Query", "TanStack"],
    codeLink: "https://github.com/eric-capiz/chop_shop",
    liveLink: "https://chop-shop-ec.vercel.app/",
    videoSrc: "/demo_clips/barber.mp4",
  },
  {
    id: 4,
    imageKey: "courseCorrect",
    name: "Course Correct",
    description:
      "Connects students with tutors and study groups. Calendar based booking and subject filtering.",
    demoLogin: [
      { role: "Tutor", user: "mariagarcia@example.com", pass: "demo" },
      { role: "Student", user: "sofiarodriguez@example.com", pass: "demo" },
    ],
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    codeLink: "https://github.com/eric-capiz/course-correct",
    liveLink: "https://course-correct-red.vercel.app/",
    videoSrc: "/demo_clips/course.mp4",
  },
  {
    id: 5,
    imageKey: "lostAndFound",
    name: "Lost and Found",
    description:
      "Report and find lost items. Create posts with images, comment, and receive notifications.",
    demoLogin: [{ role: "User", user: "breezy", pass: "breezy" }],
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    codeLink: "https://github.com/eric-capiz/lost-and-found",
    liveLink: "https://lost-and-found-rosy.vercel.app/",
    videoSrc: "/demo_clips/lost.mp4",
  },
  {
    id: 3,
    imageKey: "dj",
    name: "DJ Cosmic Drift",
    description:
      "Cosmic DJ site with an animated hero, turntable, and sections for about, samples, contact, and tour dates.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind", "React Bits"],
    codeLink: "https://github.com/eric-capiz/dj",
    liveLink: "https://dj-cosmic-drift.vercel.app/",
    videoSrc: "/demo_clips/dj-demo.mp4",
  },
  {
    id: 10,
    name: "Local business sites",
    description:
      "Sample marketing sites for local service businesses. Sweet Dreams Bakery is a bakery showcase with reviews and an admin dashboard. Brume is a florist for custom made arrangements. Ellis covers landscape work plus car detail and car wash. Pit is a mechanic for in shop and mobile service.",
    techStack: ["React", "Next.js", "TypeScript"],
    samples: [
      {
        name: "Sweet Dreams Bakery",
        blurb: "Bakery showcase with contact, reviews, and admin tools",
        imageKey: "sweetDreamsBakery",
        liveLink: "https://bakery-ec.vercel.app/",
        codeLink: "https://github.com/eric-capiz/bakery",
        demoLogin: [{ role: "Admin", user: "demo", pass: "demo" }],
      },
      {
        name: "Brume",
        blurb: "Florist for custom made arrangements",
        imageKey: "brume",
        liveLink: "https://florist-ec.vercel.app/",
        codeLink: "https://github.com/eric-capiz/bakery/tree/florist",
      },
      {
        name: "Ellis",
        blurb: "Landscape, car detail, and car wash",
        imageKey: "ellis",
        liveLink: "https://landscape-ec.vercel.app/",
        codeLink: "https://github.com/eric-capiz/bakery/tree/landscape",
      },
      {
        name: "Pit",
        blurb: "In shop and mobile mechanic",
        imageKey: "pit",
        liveLink: "https://mechanic-five.vercel.app/",
        codeLink: "https://github.com/eric-capiz/bakery/tree/mechanic",
      },
    ],
  },
  {
    id: 6,
    imageKey: "kumiko",
    name: "Kumiko Component Library",
    description:
      "Reusable React components with TypeScript, Storybook documentation, and SCSS styling.",
    techStack: ["React", "TypeScript", "Storybook", "SCSS"],
    liveLink:
      "https://kumiko-dev.icrossing.com/?path=/docs/components-link-all-stories--docs",
  },
];
