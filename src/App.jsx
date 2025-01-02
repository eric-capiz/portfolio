import Hero from "./components/Hero";
import Nav from "./components/Nav";
import About from "./components/About";
import Skills from "./components/Skills";

function App() {
  return (
    <div className="app">
      <div className="grid-overlay"></div>
      <Nav />
      <Hero />
      <About />
      <Skills />
    </div>
  );
}

export default App;
