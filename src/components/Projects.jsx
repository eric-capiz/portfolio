import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { projectsData as projectsMeta } from "../data/projects";
import lostAndFoundImg from "../assets/lost-and-found.jpg";
import sweetDreamsBakeryImg from "../assets/sweet-dreams-bakery.jpg";
import courseCorrectImg from "../assets/course-correct.jpg";
import Analytics from "../services/analytics";
import chopShopImg from "../assets/chop-shop.jpg";
import kumikoImg from "../assets/kumiko.jpg";
import djImg from "../assets/dj.jpg";
import leadImg from "../assets/lead.jpg";
import referraImg from "../assets/referra.jpg";
import reziqImg from "../assets/reziq.jpg";

const imageByKey = {
  reziq: reziqImg,
  referra: referraImg,
  lead: leadImg,
  chopShop: chopShopImg,
  courseCorrect: courseCorrectImg,
  lostAndFound: lostAndFoundImg,
  sweetDreamsBakery: sweetDreamsBakeryImg,
  dj: djImg,
  kumiko: kumikoImg,
};

const projectsData = projectsMeta.map((project) => ({
  ...project,
  mainImage: imageByKey[project.imageKey],
}));

function ProjectCard({ project, index }) {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const hasDemoLogin = project.demoLogin?.length > 0;
  const isReversed = index % 2 === 1;

  useEffect(() => {
    if (!project.videoSrc || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [project.videoSrc]);

  useEffect(() => {
    if (!videoRef.current || !project.videoSrc) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView, project.videoSrc]);

  const trackProjectLink = (label, url) => {
    Analytics.trackAction({
      type: "link",
      element: "text",
      text: `${project.name}: ${label}`,
      url,
    });
  };

  return (
    <article
      className={`project-entry shine-border ${isReversed ? "project-entry--reverse" : ""}`}
    >
      <div className="project-entry__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="project-entry__preview">
        {project.videoSrc ? (
          <video
            ref={videoRef}
            src={project.videoSrc}
            poster={project.mainImage}
            muted
            loop
            playsInline
          />
        ) : (
          <img src={project.mainImage} alt={project.name} />
        )}
        <div className="project-entry__preview-shade" aria-hidden="true" />
        {project.videoSrc && (
          <span className="project-entry__preview-badge">Demo clip</span>
        )}
      </div>

      <div className="project-entry__panel">
        <div className="project-entry__tags">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <h3 className="project-entry__title">{project.name}</h3>
        <p className="project-entry__desc">{project.description}</p>

        <div className="project-entry__actions">
          <a
            className="btn btn--primary btn--sm"
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProjectLink("Live Site", project.liveLink)}
          >
            Live site
          </a>
          {project.codeLink && (
            <a
              className="btn btn--ghost btn--sm"
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProjectLink("View Code", project.codeLink)}
            >
              Code
            </a>
          )}
          {hasDemoLogin && (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              aria-expanded={isDetailsOpen}
              onClick={() => setIsDetailsOpen((open) => !open)}
            >
              {isDetailsOpen ? "Hide login" : "Demo login"}
            </button>
          )}
        </div>

        {hasDemoLogin && (
          <div
            className={`project-entry__demo ${isDetailsOpen ? "is-open" : ""}`}
            aria-hidden={!isDetailsOpen}
          >
            {project.demoLogin.map((item) => (
              <p key={item.role}>
                <strong>{item.role}</strong>: {item.user} / {item.pass}
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mainImage: PropTypes.string.isRequired,
    techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
    codeLink: PropTypes.string,
    liveLink: PropTypes.string.isRequired,
    videoSrc: PropTypes.string,
    description: PropTypes.string,
    demoLogin: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        pass: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="section-shell">
        <header className="section-head">
          <p className="section-kicker">02 · Selected work</p>
          <h2>Selected work</h2>
          <p className="section-lede">
            Freelance builds, personal demos, and experiments I&apos;ve worked on.
          </p>
        </header>

        <div className="projects-stack">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
