import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useState } from "react";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResumeDownload = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Eric_Capiz_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <a href="#about" onClick={() => setIsMenuOpen(false)}>
          About
        </a>
        <a href="#skills" onClick={() => setIsMenuOpen(false)}>
          Skills
        </a>
        <button onClick={handleResumeDownload} className="resume-link">
          Resume
        </button>
        <a
          href="https://github.com/ericcapiz"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/eric-capiz"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </nav>
  );
}

export default Nav;
