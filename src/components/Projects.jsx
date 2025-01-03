import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Image } from "@react-three/drei";
import PropTypes from "prop-types";
import lostAndFoundImg from "../assets/lost-and-found.jpg";
import cardVaultImg from "../assets/card-vault.jpg";
import zetaMoviesImg from "../assets/zeta-movies.jpg";
import nandosCakesImg from "../assets/nandos-cakes.jpg";

const projectsData = [
  {
    id: 1,
    name: "Lost and Found",
    mainImage: lostAndFoundImg,
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    codeLink: "https://github.com/ericcapiz/lost-and-found",
    liveLink: "https://lost-and-found-rosy.vercel.app/",
  },
  {
    id: 2,
    name: "Card Vault",
    mainImage: cardVaultImg,
    techStack: ["TypeScript", "MERN Stack", "Google Vision API", "OCR"],
    codeLink: "https://github.com/ericcapiz/card-vault",
    liveLink: "https://card-vault-app.vercel.app/",
  },
  {
    id: 3,
    name: "Zeta Movies",
    mainImage: zetaMoviesImg,
    techStack: ["React", "TypeScript", "TMDB API"],
    codeLink: "https://github.com/ericcapiz/zeta-movies",
    liveLink: "https://zeta-movies.vercel.app/",
  },
  {
    id: 4,
    name: "Nando's Cakes",
    mainImage: nandosCakesImg,
    techStack: ["React", "TypeScript", "Framer Motion", "SCSS"],
    codeLink: "https://github.com/ericcapiz/nandos_cakes",
    liveLink: "https://nandos-cakes.vercel.app/",
  },
];

function ProjectCard({ project, position, isMobile }) {
  const meshRef = useRef();
  const [hoverLive, setHoverLive] = useState(false);
  const [hoverCode, setHoverCode] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.9;
    meshRef.current.rotation.y = Math.sin(time * 0.9) * 0.2;
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
    <section className="projects" id="projects">
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
