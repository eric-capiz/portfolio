import Hero from "./components/Hero";
import Nav from "./components/Nav";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Analytics from "./services/analytics";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    Analytics.startSession();

    return () => Analytics.stopSession();
  }, []);

  return (
    <div className="app">
      <div className="grid-overlay"></div>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
