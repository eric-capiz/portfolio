import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiJavascript,
  SiReact,
  SiTypescript,
  SiHtml5,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiStorybook,
  SiGit,
} from "react-icons/si";
import { FaCode, FaCube } from "react-icons/fa";
import { BsKanban } from "react-icons/bs";
import { DiCodeBadge } from "react-icons/di";

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".icon-wrapper",
        {
          rotate: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
        {
          rotate: 360,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top center+=100",
            toggleActions: "restart restart restart restart",
          },
          ease: "power1.out",
        }
      );
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="skills-content">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul>
              <li>
                <span className="icon-wrapper">
                  <SiJavascript className="skill-icon" />
                </span>{" "}
                JavaScript
              </li>
              <li>
                <span className="icon-wrapper">
                  <SiReact className="skill-icon" />
                </span>{" "}
                React
              </li>
              <li>
                <span className="icon-wrapper">
                  <DiCodeBadge className="skill-icon" />
                </span>{" "}
                LitElement
              </li>
              <li>
                <span className="icon-wrapper">
                  <SiTypescript className="skill-icon" />
                </span>{" "}
                TypeScript
              </li>
              <li>
                <span className="icon-wrapper">
                  <SiHtml5 className="skill-icon" />
                </span>{" "}
                HTML5
              </li>
              <li>
                <span className="icon-wrapper">
                  <SiSass className="skill-icon" />
                </span>{" "}
                SCSS
              </li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <ul>
              <li>
                <span className="icon-wrapper">
                  <SiNodedotjs className="skill-icon" />
                </span>{" "}
                Node.js
              </li>
              <li>
                <span className="icon-wrapper">
                  <SiExpress className="skill-icon" />
                </span>{" "}
                Express.js
              </li>
              <li>
                <span className="icon-wrapper">
                  <SiMongodb className="skill-icon" />
                </span>{" "}
                MongoDB
              </li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Development Tools & Practices</h3>
            <ul>
              <li>
                <span className="icon-wrapper">
                  <SiStorybook className="skill-icon" />
                </span>{" "}
                Storybook
              </li>
              <li>
                <span className="icon-wrapper">
                  <SiGit className="skill-icon" />
                </span>{" "}
                Git
              </li>
              <li>
                <span className="icon-wrapper flip-icon">
                  <FaCode className="skill-icon" />
                </span>{" "}
                Version Control
              </li>
              <li>
                <span className="icon-wrapper flip-icon">
                  <FaCube className="skill-icon" />
                </span>{" "}
                Adobe Experience Manager
              </li>
              <li>
                <span className="icon-wrapper flip-icon">
                  <BsKanban className="skill-icon" />
                </span>{" "}
                Agile Development
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
