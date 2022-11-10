import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./molecules/Header";
import VideoPlayer from "./molecules/VideoPlayer";
import App2 from "./molecules/AddCastFilePlayer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <VideoPlayer />

      <App2 />
    </div>
  );
}

export default App;
