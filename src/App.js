import React, { useState } from "react";
import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Home from "./Home";
import "./App.css";

function App() {
  const [user, setUser] = useState("Bob");

  return (
    <div className="App">
      <Navigation user={user} />
      <Welcome user={user} />
      <Home user={user} />
    </div>
  );
}

export default App;
