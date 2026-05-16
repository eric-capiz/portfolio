import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { scrollToId } from "../utils/scrollToSection";

const tickerItems = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Express",
  "Storybook",
  "Tailwind",
  "SCSS",
  "Redux",
  "AEM",
  "Git",
  "Figma",
  "Jira",
  "Agile",
  "Responsive UI",
];

const deckCards = [
  { label: "Focus", value: "React SPAs" },
  { label: "UI", value: "Mobile first web" },
  { label: "Workflow", value: "AI assisted dev" },
];

function Hero() {
  const heroRef = useRef(null);

  const handleScroll = useCallback(() => {
    scrollToId("projects");
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero__eyebrow, .hero__title-line, .hero__lede, .hero__actions", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".hero__card", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.35,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero__inner">
        <header className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__pulse" aria-hidden="true" />
            Frontend developer · Eric Capiz
          </p>

          <h1 className="hero__title">
            <span className="hero__title-line">Building digital</span>
            <span className="hero__title-line hero__title-line--accent">
              solutions that matter
            </span>
          </h1>

          <p className="hero__lede">
            I design and build React interfaces, from enterprise SPAs and component
            work to freelance sites and frontend demos.
          </p>

          <div className="hero__actions">
            <button type="button" className="btn btn--primary" onClick={handleScroll}>
              View projects
              <span aria-hidden="true">↗</span>
            </button>
            <a className="btn btn--ghost" href="#contact">
              Start a conversation
            </a>
          </div>
        </header>

        <aside className="hero__deck" aria-label="Quick highlights">
          {deckCards.map((card) => (
            <article key={card.label} className="hero__card shine-border">
              <span className="hero__card-label">{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          ))}
        </aside>
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="hero__ticker-track">
              {tickerItems.map((item) => (
                <span key={`${copy}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
