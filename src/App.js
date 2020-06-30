import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Register from "./Register";
import Login from "./Login";
import Meetings from "./Meetings";
import Home from "./Home";
import "./App.css";
import firebase from "./Firebase";

function App() {
  const [user, setUser] = useState(null);

  let routes = (
    <Switch>
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route
        path="/"
        exact
        render={(props) => <Home {...props} user={user} />}
      />
      <Redirect to="/" />
    </Switch>
  );
  if (user)
    routes = (
      <Switch>
        <Route path="/meetings" render={(props) => <Meetings {...props} />} />
        <Route
          path="/"
          exact
          render={(props) => <Home {...props} user={user} />}
        />
        <Redirect to="/" />
      </Switch>
    );

  useEffect(() => {
    console.log("[App.js]-mounted", user);
    const refDB = firebase.database().ref("/user");

    refDB.on("value", (snapshot) => {
      const FBUser = snapshot.val();
      setUser(FBUser);
    });

    return () => {
      console.log("[App.js]-unmounted");
    };
  }, [user]);

  return (
    <Router>
      <div className="App">
        <Navigation user={user} />
        {user && <Welcome user={user} />}
        {routes}
      </div>
    </Router>
  );
}

export default App;
