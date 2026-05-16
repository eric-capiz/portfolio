import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { value: "5+", label: "Years in frontend" },
  { value: "React", label: "SPAs & UI systems" },
  { value: "Web", label: "Mobile-first layouts" },
];

function About() {
  const aboutRef = useRef(null);
  const paragraphRefs = useRef([]);

  useEffect(() => {
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
          <h2 className="about__title">Building reliable interfaces</h2>
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
            <p ref={(el) => (paragraphRefs.current[0] = el)}>
              Frontend developer focused on React, TypeScript, and modern CSS. Experience
              spans enterprise SPAs, component libraries, and layouts that work across
              screen sizes — with attention to structure, performance, and maintainable code.
            </p>
            <p ref={(el) => (paragraphRefs.current[1] = el)}>
              Recent work includes marketing sites, booking flows, and full-stack web apps
              with Node and MongoDB. Comfortable in agile teams and documenting UI in
              Storybook when projects call for it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
