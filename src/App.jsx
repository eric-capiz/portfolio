import Hero from "./components/Hero";
import Nav from "./components/Nav";
import About from "./components/About";

function App() {
  return (
    <div className="app">
      <div className="grid-overlay"></div>
      <Nav />
      <Hero />
      <About />
    </div>
  );
}

export default App;
