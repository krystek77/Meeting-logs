import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Home from "./Home";
import "./App.css";

function App() {
  const [user, setUser] = useState("Bob");

  return (
    <Router>
      <div className="App">
        <Navigation user={user} />
        <Welcome user={user} />
        <Route path="/" render={(props) => <Home {...props} user={user} />} />
      </div>
    </Router>
  );
}

export default App;
