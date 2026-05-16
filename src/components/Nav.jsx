import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Analytics from "../services/analytics";

const navItems = [
  { label: "Home", href: "#top", short: "HM" },
  { label: "About", href: "#about", short: "AB" },
  { label: "Projects", href: "#projects", short: "PR" },
  { label: "Skills", href: "#skills", short: "SK" },
  { label: "Contact", href: "#contact", short: "CT" },
];

const socialItems = [
  {
    label: "GitHub Profile",
    href: "https://github.com/eric-capiz",
    icon: <FaGithub size={18} />,
  },
  {
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/eric-capiz",
    icon: <FaLinkedin size={18} />,
  },
];

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setIsCommandOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setIsCommandOpen(false);

    const targetId = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(targetId);

    if (element) {
      const offset = window.innerWidth < 900 ? 88 : 32;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
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
    <>
      <nav className="nav-rail" aria-label="Primary navigation">
        <a href="#top" className="nav-rail__brand" onClick={handleNavClick} aria-label="Home">
          EC
        </a>

        <div className="nav-rail__links">
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                className={isActive ? "is-active" : ""}
                onClick={handleNavClick}
                title={item.label}
              >
                <span className="nav-rail__short">{item.short}</span>
                <span className="nav-rail__label">{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="nav-rail__footer">
          <button
            type="button"
            className="nav-rail__command"
            onClick={() => setIsCommandOpen(true)}
            title="Command palette"
          >
            ⌘K
          </button>
          {socialItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-rail__social"
              aria-label={item.label}
              onClick={() => handleSocialClick(item)}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </nav>

      <header className="nav-mobile" aria-label="Mobile navigation">
        <a href="#top" className="nav-mobile__brand" onClick={handleNavClick}>
          Eric Capiz
        </a>
        <button
          type="button"
          className="nav-mobile__toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
        </button>
        <div className={`nav-mobile__sheet ${isMenuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
          <button type="button" onClick={() => setIsCommandOpen(true)}>
            Command palette <kbd>⌘K</kbd>
          </button>
        </div>
      </header>

      {isCommandOpen && (
        <div
          className="command-backdrop"
          role="presentation"
          onMouseDown={() => setIsCommandOpen(false)}
        >
          <div
            className="command-panel shine-border"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="command-header">
              <span>Jump anywhere</span>
              <button type="button" onClick={() => setIsCommandOpen(false)}>
                Esc
              </button>
            </div>
            <div className="command-list">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={handleNavClick}>
                  <span>{item.label}</span>
                  <small>{item.href}</small>
                </a>
              ))}
              {socialItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(item)}
                >
                  <span>{item.label}</span>
                  <small>external</small>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
