import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { scrollToId, scrollToTop } from "../utils/scrollToSection";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e) => {
    e.preventDefault();
    scrollToId(e.currentTarget.getAttribute("href").slice(1));
  };

  const handleScrollToTop = (e) => {
    e.preventDefault();
    scrollToTop();
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__beam" aria-hidden="true" />
      <div className="section-shell site-footer__grid">
        <div className="site-footer__brand">
          <a href="#top" onClick={handleScrollToTop} className="site-footer__mark">
            EC
          </a>
          <div>
            <p>Eric Capiz</p>
            <span>Frontend developer</span>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          {footerLinks.map((item) => (
            <a key={item.href} href={item.href} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__social">
          <a
            href="https://github.com/eric-capiz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/eric-capiz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={17} />
          </a>
          <a href="mailto:ericcapiz@gmail.com" aria-label="Email">
            <FaEnvelope size={17} />
          </a>
        </div>
      </div>

      <div className="section-shell site-footer__bar">
        <p>© {currentYear} Eric Capiz. All rights reserved.</p>
        <a href="#top" onClick={handleScrollToTop} className="site-footer__top">
          Top <FaArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
