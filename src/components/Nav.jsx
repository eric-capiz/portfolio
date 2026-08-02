import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { navItems, socialLinks } from "../data/siteCopy";
import Analytics from "../services/analytics";
import { scrollToId } from "../utils/scrollToSection";
import { setBodyScrollLock, trapFocus } from "../utils/overlay";

const navSocials = socialLinks
  .filter((item) => item.id !== "email")
  .map((item) => ({
    ...item,
    label: `${item.label} Profile`,
    icon: item.id === "github" ? <FaGithub size={18} /> : <FaLinkedin size={18} />,
  }));

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const menuSheetRef = useRef(null);
  const menuToggleRef = useRef(null);
  const wasMenuOpenRef = useRef(false);

  useEffect(() => {
    setBodyScrollLock(isMenuOpen);
    return () => setBodyScrollLock(false);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      menuSheetRef.current?.querySelector("a")?.focus();
    } else if (wasMenuOpenRef.current) {
      menuToggleRef.current?.focus();
    }
    wasMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isMenuOpen && menuSheetRef.current) {
        trapFocus(menuSheetRef.current, event);
      }

      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean);

    const setActiveFromScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection("top");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 120) {
          setActiveSection("top");
          return;
        }

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
    window.addEventListener("scroll", setActiveFromScroll, { passive: true });
    setActiveFromScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", setActiveFromScroll);
    };
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    scrollToId(e.currentTarget.getAttribute("href").slice(1));
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
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <nav className="nav-rail" aria-label="Primary navigation">
        <a href="#top" className="nav-rail__brand" onClick={handleNavClick} aria-label="Home">
          <img src={logo} alt="" width={40} height={40} />
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
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="nav-rail__short">{item.short}</span>
              </a>
            );
          })}
        </div>

        <div className="nav-rail__footer">
          {navSocials.map((item) => (
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
        {isMenuOpen && (
          <button
            type="button"
            className="nav-mobile__backdrop"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        <a
          href="#top"
          className="nav-mobile__brand"
          onClick={handleNavClick}
          aria-label="Home"
        >
          <img src={logo} alt="" width={28} height={28} />
          <span>Eric Capiz</span>
        </a>
        <button
          ref={menuToggleRef}
          type="button"
          className="nav-mobile__toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-sheet"
        >
          {isMenuOpen ? <RiCloseLine size={22} /> : <RiMenu3Line size={22} />}
        </button>
        <div
          ref={menuSheetRef}
          id="mobile-nav-sheet"
          className={`nav-mobile__sheet ${isMenuOpen ? "is-open" : ""}`}
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
        </div>
      </header>
    </>
  );
}

export default Nav;
