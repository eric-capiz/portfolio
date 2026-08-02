/** Shared marketing copy for the UI and build-time SEO prerender. */
export const siteCopy = {
  hero: {
    eyebrow: "Frontend developer · Eric Capiz",
    title: "Building digital solutions that matter",
    titleLines: ["Building digital", "solutions that matter"],
    lede:
      "I design and build React interfaces, from enterprise SPAs and component work to freelance sites and frontend demos.",
    deck: [
      { label: "Focus", value: "React SPAs" },
      { label: "UI", value: "Mobile first web" },
      { label: "Workflow", value: "AI assisted dev" },
    ],
    ticker: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express",
      "Storybook",
      "Tailwind",
      "SCSS",
      "Redux",
      "AEM",
      "Git",
      "Figma",
      "Jira",
      "Agile",
      "Responsive UI",
    ],
  },
  about: {
    title: "Building reliable interfaces",
    paragraphs: [
      "Frontend developer focused on React, TypeScript, and modern CSS. Experience spans enterprise SPAs, component libraries, and layouts that work across screen sizes, with attention to structure, performance, and maintainable code.",
      "Recent work includes marketing sites, booking flows, and frontend web apps with Node and MongoDB. Comfortable in agile teams and documenting UI in Storybook when projects call for it.",
    ],
    highlights: [
      { value: "5+", label: "Years in frontend" },
      { value: "React", label: "SPAs & UI systems" },
      { value: "Web", label: "Mobile first layouts" },
    ],
  },
  projects: {
    kicker: "02 · Selected work",
    title: "Selected work",
    lede: "Freelance builds, personal demos, and experiments I've worked on.",
  },
  skills: {
    title: "Technical skills",
    lede:
      "Tools and practices I use for enterprise React work, freelance builds, and day to day delivery.",
    groups: [
      {
        title: "Frontend",
        items: [
          "React (SPA)",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "HTML / CSS",
          "Tailwind",
          "SCSS",
          "Mobile first layouts",
        ],
      },
      {
        title: "UI, state & quality",
        items: ["Redux", "Storybook", "Unit testing & TDD"],
      },
      {
        title: "Backend & CMS",
        items: ["Node.js", "Express", "MongoDB", "Adobe Experience Manager"],
      },
      {
        title: "Workflow & practice",
        items: ["Git", "Agile / Scrum", "Figma", "Jira", "NPM"],
      },
    ],
  },
  contact: {
    title: "Let's build something",
    lede:
      "Open to frontend roles, contract work, and collaborations. Send a message or reach out directly. I'll get back to you.",
    email: "ericcapiz@gmail.com",
    github: "https://github.com/eric-capiz",
    linkedin: "https://www.linkedin.com/in/eric-capiz/",
  },
};

export const navItems = [
  { label: "Home", href: "#top", short: "HM" },
  { label: "About", href: "#about", short: "AB" },
  { label: "Projects", href: "#projects", short: "PR" },
  { label: "Skills", href: "#skills", short: "SK" },
  { label: "Contact", href: "#contact", short: "CT" },
];

export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    value: "eric-capiz",
    href: siteCopy.contact.github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "eric-capiz",
    href: siteCopy.contact.linkedin,
  },
  {
    id: "email",
    label: "Email",
    value: siteCopy.contact.email,
    href: `mailto:${siteCopy.contact.email}`,
  },
];
