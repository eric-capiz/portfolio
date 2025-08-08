import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a
            href="https://github.com/eric-capiz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/eric-capiz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a href="mailto:ericcapiz@gmail.com" aria-label="Email">
            <FaEnvelope size={20} />
          </a>
        </div>
        <p>© 2025 Eric Capiz. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
