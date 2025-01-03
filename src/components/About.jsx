import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutRef = useRef(null);
  const paragraphRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".about h2",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top center+=100",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Paragraphs animation
      paragraphRefs.current.forEach((para, index) => {
        gsap.fromTo(
          para,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: index * 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: para,
              start: "top center+=200",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="about-content">
        <h2>About Me</h2>
        <p ref={(el) => (paragraphRefs.current[0] = el)}>
          I am a Full Stack Developer with a passion for creating efficient,
          user-friendly web applications. With expertise in front-end
          development and a growing knowledge of back-end technologies, I focus
          on building solutions that deliver exceptional user experiences.
        </p>
        <p ref={(el) => (paragraphRefs.current[1] = el)}>
          My technical journey has equipped me with expertise in modern web
          technologies and best practices. I am constantly learning and adapting
          to new technologies to deliver cutting-edge solutions.
        </p>
      </div>
    </section>
  );
}

export default About;
