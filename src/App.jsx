import Install from "./pages/Install";
import About from "./pages/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  console.log(123);
  return (
    <div id="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/install" element={<Install />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

  // <div id="app">{window.ethereum ? <Home /> : <Install />}</div>;
}

export default App;
