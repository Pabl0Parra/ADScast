import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <VideoPlayer />
    </div>
  );
}

export default App;
