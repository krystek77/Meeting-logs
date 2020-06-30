import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Register from "./Register";
import Login from "./Login";
import Meetings from "./Meetings";
import Home from "./Home";
import "./App.css";

function App() {
  const [user, setUser] = useState("Bob");

  return (
    <Router>
      <div className="App">
        <Navigation user={user} />
        <Welcome user={user} />
        <Switch>
          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/meetings" render={(props) => <Meetings {...props} />} />
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} user={user} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
