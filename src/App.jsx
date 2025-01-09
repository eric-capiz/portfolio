import Hero from "./components/Hero";
import Nav from "./components/Nav";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Analytics from "./services/analytics";
import { useEffect, useRef } from "react";

function App() {
  const sessionStarted = useRef(false);

  useEffect(() => {
    if (!sessionStarted.current) {
      Analytics.startSession();
      sessionStarted.current = true;
    }
  }, []);

  return (
    <div className="app">
      <div className="grid-overlay"></div>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
