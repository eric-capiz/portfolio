import { useEffect, useRef } from "react";
import { siteCopy } from "../data/siteCopy";
import { gsap } from "../utils/gsap";
import { prefersReducedMotion } from "../utils/motion";
import { scrollToId } from "../utils/scrollToSection";

const { hero } = siteCopy;

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

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
            {hero.eyebrow}
          </p>

          <h1 className="hero__title">
            {hero.titleLines.map((line, index) => (
              <span
                key={line}
                className={
                  index === hero.titleLines.length - 1
                    ? "hero__title-line hero__title-line--accent"
                    : "hero__title-line"
                }
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__lede">{hero.lede}</p>

          <div className="hero__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => scrollToId("projects")}
            >
              View projects
              <span aria-hidden="true">↗</span>
            </button>
            <a
              className="btn btn--ghost"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("contact");
              }}
            >
              Start a conversation
            </a>
          </div>
        </header>

        <aside className="hero__deck" aria-label="Quick highlights">
          {hero.deck.map((card) => (
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
              {hero.ticker.map((item) => (
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
