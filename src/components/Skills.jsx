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

function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills-content">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul>
              <li>
                <SiJavascript className="skill-icon" /> JavaScript
              </li>
              <li>
                <SiReact className="skill-icon" /> React
              </li>
              <li>
                <DiCodeBadge className="skill-icon" /> LitElement
              </li>
              <li>
                <SiTypescript className="skill-icon" /> TypeScript
              </li>
              <li>
                <SiHtml5 className="skill-icon" /> HTML5
              </li>
              <li>
                <SiSass className="skill-icon" /> SCSS
              </li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <ul>
              <li>
                <SiNodedotjs className="skill-icon" /> Node.js
              </li>
              <li>
                <SiExpress className="skill-icon" /> Express.js
              </li>
              <li>
                <SiMongodb className="skill-icon" /> MongoDB
              </li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Development Tools & Practices</h3>
            <ul>
              <li>
                <SiStorybook className="skill-icon" /> Storybook
              </li>
              <li>
                <SiGit className="skill-icon" /> Git
              </li>
              <li>
                <FaCode className="skill-icon" /> Version Control
              </li>
              <li>
                <FaCube className="skill-icon" /> Adobe Experience Manager
              </li>
              <li>
                <BsKanban className="skill-icon" /> Agile Development
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
