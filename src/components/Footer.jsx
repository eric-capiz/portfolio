import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import logo from "../assets/logo.png";
import { navItems, socialLinks } from "../data/siteCopy";
import Analytics from "../services/analytics";
import { scrollToId, scrollToTop } from "../utils/scrollToSection";

const footerLinks = navItems.filter((item) => item.href !== "#top");

const footerSocialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
};

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

  const handleSocialClick = (item) => {
    Analytics.trackAction({
      type: "link",
      element: "icon",
      text: item.label,
      url: item.href,
    });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__beam" aria-hidden="true" />
      <div className="section-shell site-footer__grid">
        <div className="site-footer__brand">
          <a
            href="#top"
            onClick={handleScrollToTop}
            className="site-footer__mark"
            aria-label="Back to top"
          >
            <img src={logo} alt="" width={40} height={40} />
          </a>
          <div>
            <p>Eric Capiz</p>
            <span>Frontend Developer</span>
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
          {socialLinks.map((item) => {
            const Icon = footerSocialIcons[item.id];
            const isExternal = item.href.startsWith("http");

            return (
              <a
                key={item.id}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={item.label}
                onClick={() => handleSocialClick(item)}
              >
                <Icon size={17} />
              </a>
            );
          })}
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
