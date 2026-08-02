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

    return () => Analytics.flushAndEndSession();
  }, []);

  return (
    <div className="app">
      <div className="aurora aurora--one" aria-hidden="true" />
      <div className="aurora aurora--two" aria-hidden="true" />
      <div className="aurora aurora--three" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <Nav />

      <main id="main" className="app-main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
