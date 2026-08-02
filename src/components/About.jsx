import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteCopy } from "../data/siteCopy";
import { prefersReducedMotion } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { value: "5+", label: "Years in frontend" },
  { value: "React", label: "SPAs & UI systems" },
  { value: "Web", label: "Mobile first layouts" },
];

const { about } = siteCopy;

function About() {
  const aboutRef = useRef(null);
  const paragraphRefs = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about__title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
          },
        },
      );

      paragraphRefs.current.forEach((para, index) => {
        if (!para) return;

        gsap.fromTo(
          para,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: para,
              start: "top 82%",
            },
          },
        );
      });

      gsap.fromTo(
        ".about__stat",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".about__stats",
            start: "top 80%",
          },
        },
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="section-shell">
        <header className="section-head section-head--split">
          <p className="section-kicker">01 · About</p>
          <h2 className="about__title">{about.title}</h2>
        </header>

        <div className="about__layout">
          <div className="about__stats">
            {highlights.map((item) => (
              <article key={item.label} className="about__stat shine-border">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>

          <div className="about__copy">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                ref={(el) => {
                  paragraphRefs.current[index] = el;
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
