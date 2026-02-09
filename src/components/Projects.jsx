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
    description:
      "Multi-barber booking app. Users book appointments and leave reviews; admins manage barbers, services, gallery, and availability.",
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

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

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
      <div className="project-card-media-wrap">
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
      </div>
      <h3>{project.name}</h3>
      <p>{project.techStack.join(" • ")}</p>
      <button onClick={handleLiveSiteClick}>Live Site</button>
      {project.codeLink && <button onClick={handleCodeClick}>View Code</button>}
      {(project.description || project.demoLogin) && (
        <div className="project-card-overlay">
          {project.description && <p>{project.description}</p>}
            {project.demoLogin && project.demoLogin.length > 0 && (
              <div className="project-card-demo-login">
                <span>Demo login:</span>
                {project.demoLogin.map((item) => (
                  <span key={item.role}>
                    {item.role}: {item.user} / {item.pass}
                  </span>
                ))}
              </div>
            )}
        </div>
      )}
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
    description: PropTypes.string,
    demoLogin: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        pass: PropTypes.string.isRequired,
      })
    ),
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
