import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Image } from "@react-three/drei";
import PropTypes from "prop-types";
import lostAndFoundImg from "../assets/lost-and-found.jpg";
import cardVaultImg from "../assets/card-vault.jpg";
import nandosCakesImg from "../assets/nandos-cakes.jpg";
import Analytics from "../services/analytics";
import BarberShopImg from "../assets/barbershop.jpg";
import * as THREE from "three";

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
    techStack: ["TypeScript", "MERN", "GCP Vision", "OCR"],
    codeLink: "https://github.com/ericcapiz/card-vault",
    liveLink: "https://card-vault-app.vercel.app/",
  },
  {
    id: 3,
    name: "Sanchez Barbershop",
    mainImage: BarberShopImg,
    techStack: ["MERN", "TypeScript", "React Query", "TanStack"],
    codeLink: "https://github.com/ericcapiz/barbershop",
    liveLink: "https://barbershop-pi-three.vercel.app/",
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

function ProjectCard({ project, position, isMobile, index, inView }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const startTimeRef = useRef(null);
  const initialDelay = 0.25;

  useFrame((state) => {
    if (!meshRef.current) return;

    // Start timer when coming into view
    if (inView && startTimeRef.current === null) {
      startTimeRef.current = state.clock.getElapsedTime() + initialDelay; // Add delay here
    }
    // Reset timer when out of view
    if (!inView) {
      startTimeRef.current = null;
    }

    // Calculate animation time from when section came into view (plus delay)
    const time = inView
      ? Math.max(0, state.clock.getElapsedTime() - startTimeRef.current)
      : 0;
    const delay = index * 0.2;
    const animationProgress = Math.min(Math.max(time - delay, 0), 1);

    const startX = 0;
    const startY = 0;
    const startRotation = -Math.PI / 2;

    const endX = position[0];
    const endY = position[1];
    const endRotation = 0;

    const ease = Math.sin((animationProgress * Math.PI) / 2);

    meshRef.current.position.x = THREE.MathUtils.lerp(startX, endX, ease);
    meshRef.current.position.y = THREE.MathUtils.lerp(startY, endY, ease);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      startRotation,
      endRotation,
      ease
    );

    if (hovered) {
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        1,
        0.1
      );
    } else {
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        0,
        0.1
      );
    }
  });

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
      url: project.codeLink,
    });
    window.open(project.codeLink, "_blank");
  };

  return (
    <group
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
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
        color={hovered ? "#9d55ff" : "white"}
        onClick={handleLiveSiteClick}
      >
        Live Site
      </Text>

      <Text
        position={[isMobile ? 1.8 : 2, isMobile ? -5 : -6, 0]}
        fontSize={isMobile ? 0.6 : 0.4}
        color={hovered ? "#9d55ff" : "white"}
        onClick={handleCodeClick}
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
  index: PropTypes.number.isRequired,
  inView: PropTypes.bool.isRequired,
};

function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
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
                index={index}
                inView={inView}
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
