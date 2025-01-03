import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Image } from "@react-three/drei";
import * as THREE from "three";

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

function ProjectCard({ project, position }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.3;
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
  });

  const handleClick = () => {
    window.open(project.liveLink, "_blank");
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={handleClick}
      cursor="pointer"
    >
      <Image url={project.mainImage} scale={[10, 6]} position={[0, 0, 0]} />

      <Text position={[0, -4, 0]} fontSize={0.7} color="white">
        {project.name}
      </Text>

      <Text position={[0, -5, 0]} fontSize={0.4} color="#9d55ff">
        {project.techStack.join(" • ")}
      </Text>
    </group>
  );
}

function Projects() {
  return (
    <section className="projects">
      <div className="projects-content">
        <h2>Projects</h2>
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 10], fov: 100 }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                position={[
                  (index % 2) * 15 - 8,
                  Math.floor(index / 2) * -11 + 7,
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
