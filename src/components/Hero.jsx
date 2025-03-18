import { useCallback } from "react";

function Hero() {
  const handleScroll = useCallback(() => {
    const projectsSection = document.getElementById("projects");
    projectsSection.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="hero">
      <span className="subtitle">FULL-STACK DEVELOPER</span>
      <h1 className="title">
        Building Digital Solutions
        <span className="highlight"> That Matter</span>
      </h1>
      <p className="intro">
        Hi, I&apos;m Eric, a developer dedicated to building sleek, efficient,
        and user-friendly web experiences with clean, scalable, and maintainable
        code.
      </p>
      <button className="cta" onClick={handleScroll}>
        View Sample Projects <span className="arrow">→</span>
      </button>
    </section>
  );
}

export default Hero;
