import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiHtml5,
  SiTailwindcss,
  SiSass,
  SiRedux,
  SiStorybook,
  SiJest,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiFigma,
  SiJira,
  SiNpm,
} from "react-icons/si";
import { FaCube } from "react-icons/fa";
import { BsKanban } from "react-icons/bs";
import { siteCopy } from "../data/siteCopy";
import { prefersReducedMotion } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const skillIcons = {
  "React (SPA)": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "HTML / CSS": SiHtml5,
  Tailwind: SiTailwindcss,
  SCSS: SiSass,
  "Mobile first layouts": SiHtml5,
  Redux: SiRedux,
  Storybook: SiStorybook,
  "Unit testing & TDD": SiJest,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  "Adobe Experience Manager": FaCube,
  Git: SiGit,
  "Agile / Scrum": BsKanban,
  Figma: SiFigma,
  Jira: SiJira,
  NPM: SiNpm,
};

const skillGroups = siteCopy.skills.groups.map((group) => ({
  title: group.title,
  items: group.items.map((label) => ({
    label,
    icon: skillIcons[label] || SiJavascript,
  })),
}));

const { skills } = siteCopy;

function Skills() {
  const skillsRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".skills-panel", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 72%",
        },
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="section-shell">
        <header className="section-head section-head--center">
          <p className="section-kicker">03 · Capabilities</p>
          <h2>{skills.title}</h2>
          <p className="section-lede">{skills.lede}</p>
        </header>

        <div className="skills-panels">
          {skillGroups.map((group) => (
            <article key={group.title} className="skills-panel shine-border">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Icon aria-hidden="true" />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
