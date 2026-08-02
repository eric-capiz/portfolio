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
      "RezIQ is an AI career assistant that compares your resume to a real job description and explains the fit with evidence, not guesswork. Upload a DOCX, paste the posting, and get a Strong, Possible, or Poor fit read plus honest improvement suggestions you can accept before exporting. It never invents skills or experience you cannot claim.",
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
    id: 2,
    imageKey: "sweetDreamsBakery",
    name: "Sweet Dreams Bakery",
    description:
      "Bakery showcase site with samples, contact form, and reviews. Admin dashboard for content management.",
    demoLogin: [{ role: "Admin", user: "demo", pass: "demo" }],
    techStack: ["React", "TypeScript", "Framer Motion", "SCSS"],
    codeLink: "https://github.com/eric-capiz/bakery",
    liveLink: "https://bakery-ec.vercel.app/",
    videoSrc: "/demo_clips/bakery.mp4",
  },
  {
    id: 3,
    imageKey: "dj",
    name: "DJ Cosmic Drift",
    description:
      "Cosmic DJ experience with immersive hero, animated turntable, and sections for about, samples, contact, and tour dates.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind", "React Bits"],
    codeLink: "https://github.com/eric-capiz/dj",
    liveLink: "https://dj-cosmic-drift.vercel.app/",
    videoSrc: "/demo_clips/dj-demo.mp4",
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
