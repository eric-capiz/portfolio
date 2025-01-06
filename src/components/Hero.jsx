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
        Hi, Im Eric, a developer focused on creating clean, efficient web
        applications
      </p>
      <button className="cta" onClick={handleScroll}>
        View Sample Projects <span className="arrow">→</span>
      </button>
    </section>
  );
}

export default Hero;
