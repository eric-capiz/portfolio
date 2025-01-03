import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Image } from "@react-three/drei";
import PropTypes from "prop-types";

const projectsData = [
  {
    id: 1,
    name: "E-Commerce Platform",
    mainImage: "https://picsum.photos/800/500?random=1",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    codeLink: "https://github.com/...",
    liveLink: "https://project1.com",
  },
  {
    id: 2,
    name: "Task Management App",
    mainImage: "https://picsum.photos/800/500?random=2",
    techStack: ["React", "Firebase", "Material-UI", "SCSS"],
    codeLink: "https://github.com/...",
    liveLink: "https://project2.com",
  },
  {
    id: 3,
    name: "Weather Dashboard",
    mainImage: "https://picsum.photos/800/500?random=3",
    techStack: ["React", "Redux", "OpenWeather API", "ChartJS"],
    codeLink: "https://github.com/...",
    liveLink: "https://project3.com",
  },
  {
    id: 4,
    name: "Social Media Dashboard",
    mainImage: "https://picsum.photos/800/500?random=4",
    techStack: ["React", "TypeScript", "GraphQL", "TailwindCSS"],
    codeLink: "https://github.com/...",
    liveLink: "https://project4.com",
  },
];

function ProjectCard({ project, position, isMobile }) {
  const meshRef = useRef();
  const [hoverLive, setHoverLive] = useState(false);
  const [hoverCode, setHoverCode] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.3;
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <group ref={meshRef} position={position}>
      <Image
        url={project.mainImage}
        scale={isMobile ? [6, 4] : [10, 6]}
        position={[0, 0, 0]}
      />

      <Text
        position={[0, isMobile ? -2.8 : -4, 0]}
        fontSize={isMobile ? 0.6 : 0.7}
        color="white"
      >
        {project.name}
      </Text>

      <Text
        position={[0, isMobile ? -3.8 : -5, 0]}
        fontSize={isMobile ? 0.6 : 0.4}
        color="#9d55ff"
      >
        {project.techStack.join(" • ")}
      </Text>

      <Text
        position={[isMobile ? -1.8 : -2, isMobile ? -5 : -6, 0]}
        fontSize={isMobile ? 0.6 : 0.4}
        color={hoverLive ? "#9d55ff" : "white"}
        onClick={() => window.open(project.liveLink, "_blank")}
        onPointerOver={() => {
          setHoverLive(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoverLive(false);
          document.body.style.cursor = "auto";
        }}
      >
        Live Site
      </Text>

      <Text
        position={[isMobile ? 1.8 : 2, isMobile ? -5 : -6, 0]}
        fontSize={isMobile ? 0.6 : 0.4}
        color={hoverCode ? "#9d55ff" : "white"}
        onClick={() => window.open(project.codeLink, "_blank")}
        onPointerOver={() => {
          setHoverCode(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoverCode(false);
          document.body.style.cursor = "auto";
        }}
      >
        View Code
      </Text>
    </group>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mainImage: PropTypes.string.isRequired,
    techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
    codeLink: PropTypes.string.isRequired,
    liveLink: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
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
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="projects">
      <div className="projects-content">
        <h2>Projects</h2>
        <div className="canvas-container">
          <Canvas
            camera={{
              position: [0, 0, isMobile ? 50 : 10],
              fov: isMobile ? 40 : 100,
            }}
          >
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isMobile={isMobile}
                position={[
                  isMobile ? 0 : (index % 2) * 15 - 8,
                  isMobile ? -index * 9 + 15 : Math.floor(index / 2) * -11 + 7,
                  0,
                ]}
              />
            ))}
          </Canvas>
        </div>
      </div>
    </section>
  );
}

export default Projects;
