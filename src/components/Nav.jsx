import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import Analytics from "../services/analytics";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResumeDownload = () => {
    Analytics.trackAction({
      type: "button",
      element: "button",
      text: "Resume Download",
      url: "/Resume.pdf",
    });

    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Eric_Capiz_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetId = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 40;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleGithubClick = () => {
    Analytics.trackAction({
      type: "link",
      element: "icon",
      text: "GitHub Profile",
      url: "https://github.com/ericcapiz",
    });
  };

  const handleLinkedInClick = () => {
    Analytics.trackAction({
      type: "link",
      element: "icon",
      text: "LinkedIn Profile",
      url: "https://www.linkedin.com/in/eric-capiz",
    });
  };

  return (
    <nav className="nav">
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <a href="#about" onClick={handleNavClick}>
          About
        </a>
        <a href="#skills" onClick={handleNavClick}>
          Skills
        </a>
        <a href="#projects" onClick={handleNavClick}>
          Projects
        </a>
        <a href="#contact" onClick={handleNavClick}>
          Contact
        </a>
        <button onClick={handleResumeDownload} className="resume-link">
          Resume
        </button>
        <a
          href="https://github.com/ericcapiz"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
          onClick={handleGithubClick}
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/eric-capiz"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
          onClick={handleLinkedInClick}
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </nav>
  );
}

export default Nav;
