import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import lostAndFoundImg from "../assets/lost-and-found.jpg";
import sweetDreamsBakeryImg from "../assets/sweet-dreams-bakery.jpg";
import courseCorrectImg from "../assets/course-correct.jpg";
import Analytics from "../services/analytics";
import chopShopImg from "../assets/chop-shop.jpg";
import kumikoImg from "../assets/kumiko.jpg";
import djImg from "../assets/dj.jpg";

const projectsData = [
  {
    id: 1,
    name: "Chop Shop",
    mainImage: chopShopImg,
    techStack: ["MERN", "TypeScript", "React Query", "TanStack"],
    codeLink: "https://github.com/eric-capiz/chop_shop",
    liveLink: "https://chop-shop-ec.vercel.app/",
    videoSrc: "/demo_clips/barber.mp4",
  },
  {
    id: 2,
    name: "Sweet Dreams Bakery",
    mainImage: sweetDreamsBakeryImg,
    techStack: ["React", "TypeScript", "Framer Motion", "SCSS"],
    codeLink: "https://github.com/eric-capiz/bakery",
    liveLink: "https://bakery-ec.vercel.app/",
    videoSrc: "/demo_clips/bakery.mp4",
  },
  {
    id: 3,
    name: "DJ Cosmic Drift",
    mainImage: djImg,
    techStack: ["Next.js", "React", "TypeScript", "Tailwind", "React Bits"],
    codeLink: "https://github.com/eric-capiz/dj",
    liveLink: "https://dj-cosmic-drift.vercel.app/",
    videoSrc: "/demo_clips/dj-demo.mp4",
  },
  {
    id: 4,
    name: "Course Correct",
    mainImage: courseCorrectImg,
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    codeLink: "https://github.com/eric-capiz/course-correct",
    liveLink: "https://course-correct-red.vercel.app/",
    videoSrc: "/demo_clips/course.mp4",
  },
  {
    id: 5,
    name: "Lost and Found",
    mainImage: lostAndFoundImg,
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    codeLink: "https://github.com/eric-capiz/lost-and-found",
    liveLink: "https://lost-and-found-rosy.vercel.app/",
    videoSrc: "/demo_clips/lost.mp4",
  },
  {
    id: 6,
    name: "Kumiko Component Library",
    mainImage: kumikoImg,
    techStack: ["React", "TypeScript", "Storybook", "SCSS"],
    liveLink:
      "https://kumiko-dev.icrossing.com/?path=/docs/components-link-all-stories--docs",
  },
];

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!project.videoSrc || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 }
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
      text: `${project.name} - Live Site`,
      url: project.liveLink,
    });
    window.open(project.liveLink, "_blank");
  };

  const handleCodeClick = () => {
    Analytics.trackAction({
      type: "link",
      element: "text",
      text: `${project.name} - View Code`,
      url: project?.codeLink,
    });
    window.open(project?.codeLink, "_blank");
  };

  return (
    <div className="project-card">
      {project.videoSrc ? (
        <video
          ref={videoRef}
          src={project.videoSrc}
          poster={project.mainImage}
          muted
          loop
          playsInline
          className="project-card-media"
        />
      ) : (
        <img src={project.mainImage} alt={project.name} />
      )}
      <h3>{project.name}</h3>
      <p>{project.techStack.join(" • ")}</p>
      <button onClick={handleLiveSiteClick}>Live Site</button>
      {project.codeLink && <button onClick={handleCodeClick}>View Code</button>}
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mainImage: PropTypes.string.isRequired,
    techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
    codeLink: PropTypes.string,
    liveLink: PropTypes.string.isRequired,
    videoSrc: PropTypes.string,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
};

function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects-content">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
