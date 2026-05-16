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

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Frontend",
    items: [
      { label: "React (SPA)", icon: SiReact },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "TypeScript", icon: SiTypescript },
      { label: "JavaScript", icon: SiJavascript },
      { label: "HTML / CSS", icon: SiHtml5 },
      { label: "Tailwind", icon: SiTailwindcss },
      { label: "SCSS", icon: SiSass },
      { label: "Mobile first layouts", icon: SiHtml5 },
    ],
  },
  {
    title: "UI, state & quality",
    items: [
      { label: "Redux", icon: SiRedux },
      { label: "Storybook", icon: SiStorybook },
      { label: "Unit testing & TDD", icon: SiJest },
    ],
  },
  {
    title: "Backend & CMS",
    items: [
      { label: "Node.js", icon: SiNodedotjs },
      { label: "Express", icon: SiExpress },
      { label: "MongoDB", icon: SiMongodb },
      { label: "Adobe Experience Manager", icon: FaCube },
    ],
  },
  {
    title: "Workflow & practice",
    items: [
      { label: "Git", icon: SiGit },
      { label: "Agile / Scrum", icon: BsKanban },
      { label: "Figma", icon: SiFigma },
      { label: "Jira", icon: SiJira },
      { label: "NPM", icon: SiNpm },
    ],
  },
];

function Skills() {
  const skillsRef = useRef(null);

  useEffect(() => {
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
          <h2>Technical skills</h2>
          <p className="section-lede">
            Tools and practices I use for enterprise React work, freelance builds, and
            day to day delivery.
          </p>
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
