import Install from "./components/Install";
import Home from "./components/Home";
import "./App.css";

function App() {
  return <div id="app">{window.ethereum ? <Home /> : <Install />}</div>;
}

export default App;
