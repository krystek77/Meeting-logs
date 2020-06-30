import React, { useState } from "react";
import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Home from "./Home";
import "./App.css";

function App() {
  const [user, setUser] = useState("Bob");

  return (
    <div className="App">
      {/** Navigation */}
      <Navigation user={user} />
      {/** Welcome */}
      <Welcome user={user} />
      {/** Home */}
      <Home user={user} />
    </div>
  );
}

export default App;
