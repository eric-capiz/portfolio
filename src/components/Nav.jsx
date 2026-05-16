import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import Analytics from "../services/analytics";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetId = e.currentTarget.getAttribute("href").slice(1);
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
      url: "https://github.com/eric-capiz",
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
        <a href="#projects" onClick={handleNavClick}>
          Projects
        </a>
        <a href="#skills" onClick={handleNavClick}>
          Skills
        </a>

        <a href="#contact" onClick={handleNavClick}>
          Contact
        </a>
        <a
          href="https://github.com/eric-capiz"
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
