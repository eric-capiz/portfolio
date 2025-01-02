import Hero from "./components/Hero";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="app">
      <div className="grid-overlay"></div>
      <Nav />
      <Hero />
    </div>
  );
}

export default App;
