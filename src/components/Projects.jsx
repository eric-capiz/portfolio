import { useState, useEffect, useRef } from "react";
import { projectsData as projectsMeta } from "../data/projects";
import { siteCopy } from "../data/siteCopy";
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
import brumeImg from "../assets/brume.jpg";
import ellisImg from "../assets/ellis.jpg";
import pitImg from "../assets/pit.jpg";
import devdrillImg from "../assets/devdrill.jpg";
import { prefersReducedMotion } from "../utils/motion";

const imageByKey = {
  reziq: reziqImg,
  referra: referraImg,
  devdrill: devdrillImg,
  lead: leadImg,
  chopShop: chopShopImg,
  courseCorrect: courseCorrectImg,
  lostAndFound: lostAndFoundImg,
  sweetDreamsBakery: sweetDreamsBakeryImg,
  dj: djImg,
  kumiko: kumikoImg,
  brume: brumeImg,
  ellis: ellisImg,
  pit: pitImg,
};

const projectsData = projectsMeta.map((project) => ({
  ...project,
  mainImage: project.imageKey ? imageByKey[project.imageKey] : undefined,
  samples: project.samples?.map((sample) => ({
    ...sample,
    image: imageByKey[sample.imageKey],
  })),
}));

function SampleShowcaseCard({ sample, projectName }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const hasDemoLogin = sample.demoLogin?.length > 0;
  const demoId = `demo-${projectName}-${sample.name}`.replace(/\s+/g, "-");

  const trackLink = (label, url) => {
    Analytics.trackAction({
      type: "link",
      element: "text",
      text: `${projectName}: ${label}`,
      url,
    });
  };

  return (
    <li className="project-showcase__item">
      <div className="project-showcase__media">
        <img
          src={sample.image}
          alt={sample.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-showcase__body">
        <div className="project-showcase__copy">
          <h4 className="project-showcase__name">{sample.name}</h4>
          <p className="project-showcase__blurb">{sample.blurb}</p>
        </div>
        <div className="project-showcase__actions">
          <a
            className="btn btn--primary btn--sm"
            href={sample.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLink(`${sample.name} Live Site`, sample.liveLink)}
          >
            Live site
          </a>
          {sample.codeLink && (
            <a
              className="btn btn--ghost btn--sm"
              href={sample.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLink(`${sample.name} Code`, sample.codeLink)}
            >
              Code
            </a>
          )}
          {hasDemoLogin && (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              aria-expanded={isDetailsOpen}
              aria-controls={demoId}
              onClick={() => setIsDetailsOpen((open) => !open)}
            >
              {isDetailsOpen ? "Hide login" : "Demo login"}
            </button>
          )}
        </div>
        {hasDemoLogin && isDetailsOpen && (
          <div id={demoId} className="project-entry__demo">
            {sample.demoLogin.map((item) => (
              <p key={item.role}>
                <strong>{item.role}</strong>: {item.user} / {item.pass}
              </p>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

function ShowcaseProject({ project, index }) {
  return (
    <article className="project-entry project-entry--showcase shine-border">
      <div className="project-entry__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="project-entry__panel project-entry__panel--showcase">
        <div className="project-entry__tags">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <h3 className="project-entry__title">{project.name}</h3>
        <p className="project-entry__desc">{project.description}</p>
      </div>

      <ul className="project-showcase">
        {project.samples.map((sample) => (
          <SampleShowcaseCard
            key={sample.name}
            sample={sample}
            projectName={project.name}
          />
        ))}
      </ul>
    </article>
  );
}

function ProjectCard({ project, index }) {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const hasDemoLogin = project.demoLogin?.length > 0;
  const isReversed = index % 2 === 1;
  const reduceMotion = prefersReducedMotion();
  const showVideo = Boolean(project.videoSrc) && !reduceMotion;

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
        }
      },
      { threshold: 0.15, rootMargin: "240px 0px" },
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [showVideo]);

  useEffect(() => {
    if (!videoRef.current || !showVideo || !shouldLoadVideo) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView, showVideo, shouldLoadVideo]);

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
        {showVideo ? (
          <video
            ref={videoRef}
            src={shouldLoadVideo ? project.videoSrc : undefined}
            poster={project.mainImage}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${project.name} demo`}
          />
        ) : (
          <img
            src={project.mainImage}
            alt={project.name}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="project-entry__preview-shade" aria-hidden="true" />
        {showVideo && (
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
              aria-controls={`demo-${project.id}`}
              onClick={() => setIsDetailsOpen((open) => !open)}
            >
              {isDetailsOpen ? "Hide login" : "Demo login"}
            </button>
          )}
        </div>

        {hasDemoLogin && isDetailsOpen && (
          <div id={`demo-${project.id}`} className="project-entry__demo">
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

function Projects() {
  const { projects } = siteCopy;

  return (
    <section className="projects" id="projects">
      <div className="section-shell">
        <header className="section-head">
          <p className="section-kicker">{projects.kicker}</p>
          <h2>{projects.title}</h2>
          <p className="section-lede">{projects.lede}</p>
        </header>

        <div className="projects-stack">
          {projectsData.map((project, index) =>
            project.samples?.length ? (
              <ShowcaseProject
                key={project.id}
                project={project}
                index={index}
              />
            ) : (
              <ProjectCard key={project.id} project={project} index={index} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
