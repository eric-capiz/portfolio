import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
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

const projectsData = [
  {
    id: 9,
    name: "RezIQ",
    description:
      "RezIQ is an AI career assistant that compares your resume to a real job description and explains the fit with evidence, not guesswork. Upload a DOCX, paste the posting, and get a Strong, Possible, or Poor fit read plus honest improvement suggestions you can accept before exporting. It never invents skills or experience you cannot claim.",
    demoLogin: [{ role: "Demo", user: "demo", pass: "demo11" }],
    mainImage: reziqImg,
    techStack: ["React", "Next.js", "MongoDB", "Gemini", "Groq"],
    codeLink: "https://github.com/eric-capiz/reziq",
    liveLink: "https://reziq-phi.vercel.app/",
    videoSrc: "/demo_clips/reziq.mp4",
  },
  {
    id: 8,
    name: "Referra",
    description:
      "Privacy first referral networking app. Post anonymous referral leads, request a handshake, and unlock identity and chat only after both sides accept. Also includes a private job search on your profile: Standard or AI powered searches across US job boards, resume matching, application tracking, and export for weekly follow up.",
    demoLogin: [{ role: "Demo", user: "henry@demo.referra", pass: "demo" }],
    mainImage: referraImg,
    techStack: ["MERN", "Socket.IO"],
    codeLink: "https://github.com/eric-capiz/refera",
    liveLink: "https://referra-iota.vercel.app/",
    videoSrc: "/demo_clips/referra.mp4",
  },
  {
    id: 7,
    name: "LeadReach",
    description:
      "Next.js app for solo outreach: search Google Places by category or business name, pull leads into MongoDB, enrich with optional social hints, and draft outreach using reusable merge field templates.",
    demoLogin: [{ role: "Demo", user: "demo", pass: "demo" }],
    mainImage: leadImg,
    techStack: ["React", "Next.js", "MongoDB"],
    liveLink: "https://lead-reach.vercel.app/",
  },
  {
    id: 1,
    name: "Chop Shop",
    description:
      "Multi barber booking app. Users book appointments and leave reviews; admins manage barbers, services, gallery, and availability.",
    demoLogin: [
      { role: "Admin", user: "admin0", pass: "admin0" },
      { role: "User", user: "breezy", pass: "breezy" },
    ],
    mainImage: chopShopImg,
    techStack: ["MERN", "TypeScript", "React Query", "TanStack"],
    codeLink: "https://github.com/eric-capiz/chop_shop",
    liveLink: "https://chop-shop-ec.vercel.app/",
    videoSrc: "/demo_clips/barber.mp4",
  },
  {
    id: 4,
    name: "Course Correct",
    description:
      "Connects students with tutors and study groups. Calendar based booking and subject filtering.",
    demoLogin: [
      { role: "Tutor", user: "mariagarcia@example.com", pass: "demo" },
      { role: "Student", user: "sofiarodriguez@example.com", pass: "demo" },
    ],
    mainImage: courseCorrectImg,
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    codeLink: "https://github.com/eric-capiz/course-correct",
    liveLink: "https://course-correct-red.vercel.app/",
    videoSrc: "/demo_clips/course.mp4",
  },
  {
    id: 5,
    name: "Lost and Found",
    description:
      "Report and find lost items. Create posts with images, comment, and receive notifications.",
    demoLogin: [{ role: "User", user: "breezy", pass: "breezy" }],
    mainImage: lostAndFoundImg,
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    codeLink: "https://github.com/eric-capiz/lost-and-found",
    liveLink: "https://lost-and-found-rosy.vercel.app/",
    videoSrc: "/demo_clips/lost.mp4",
  },
  {
    id: 2,
    name: "Sweet Dreams Bakery",
    description:
      "Bakery showcase site with samples, contact form, and reviews. Admin dashboard for content management.",
    demoLogin: [{ role: "Admin", user: "demo", pass: "demo" }],
    mainImage: sweetDreamsBakeryImg,
    techStack: ["React", "TypeScript", "Framer Motion", "SCSS"],
    codeLink: "https://github.com/eric-capiz/bakery",
    liveLink: "https://bakery-ec.vercel.app/",
    videoSrc: "/demo_clips/bakery.mp4",
  },
  {
    id: 3,
    name: "DJ Cosmic Drift",
    description:
      "Cosmic DJ experience with immersive hero, animated turntable, and sections for about, samples, contact, and tour dates.",
    mainImage: djImg,
    techStack: ["Next.js", "React", "TypeScript", "Tailwind", "React Bits"],
    codeLink: "https://github.com/eric-capiz/dj",
    liveLink: "https://dj-cosmic-drift.vercel.app/",
    videoSrc: "/demo_clips/dj-demo.mp4",
  },
  {
    id: 6,
    name: "Kumiko Component Library",
    description:
      "Reusable React components with TypeScript, Storybook documentation, and SCSS styling.",
    mainImage: kumikoImg,
    techStack: ["React", "TypeScript", "Storybook", "SCSS"],
    liveLink:
      "https://kumiko-dev.icrossing.com/?path=/docs/components-link-all-stories--docs",
  },
];

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

  const handleLiveSiteClick = () => {
    Analytics.trackAction({
      type: "link",
      element: "text",
      text: `${project.name}: Live Site`,
      url: project.liveLink,
    });
    window.open(project.liveLink, "_blank");
  };

  const handleCodeClick = () => {
    Analytics.trackAction({
      type: "link",
      element: "text",
      text: `${project.name}: View Code`,
      url: project?.codeLink,
    });
    window.open(project?.codeLink, "_blank");
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
          <button type="button" className="btn btn--primary btn--sm" onClick={handleLiveSiteClick}>
            Live site
          </button>
          {project.codeLink && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={handleCodeClick}>
              Code
            </button>
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
