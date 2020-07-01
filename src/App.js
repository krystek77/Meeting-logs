import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Register from "./Register";
import Login from "./Login";
import Meetings from "./Meetings";
import Home from "./Home";
import "./App.css";
import firebase from "./Firebase";

function App(props) {
  const [user, setUser] = useState({
    userID: null,
    displayName: null,
    email: null,
  });

  useEffect(() => {
    console.log("[App.js]-mounted");
    const unsubscribeUser = firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        setUser({
          userID: FBUser.uid,
          displayName: FBUser.displayName,
          email: FBUser.email,
        });
      } else {
        console.log("User is logged out");
      }
    });
    return () => {
      console.log("[App.js]-unmounted");
      unsubscribeUser();
    };
  }, []);

  const registrationInfo = (userName) => {
    console.log("registrationInfo");
    firebase.auth().onAuthStateChanged((FBUser) => {
      FBUser.updateProfile({ displayName: userName })
        .then(() => {
          setUser({
            userID: FBUser.uid,
            displayName: FBUser.displayName,
            email: FBUser.email,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const logoutUser = (event) => {
    event.preventDefault();
    console.log("Logout user");
    setUser({
      userID: null,
      displayName: null,
      email: null,
    });
    firebase
      .auth()
      .signOut()
      .then(() => props.history.push("/login"));
  };
  let routes = (
    <Switch>
      <Route
        path="/register"
        render={(props) => (
          <Register {...props} registrationInfo={registrationInfo} />
        )}
      />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/meetings" render={(props) => <Meetings {...props} />} />
      <Route
        path="/"
        exact
        render={(props) => <Home {...props} userID={user.userID} />}
      />
    </Switch>
  );
  console.log("BEFORE RENDER APP.js");
  return (
    <div className="App">
      <Navigation userID={user.userID} logoutUser={logoutUser} />
      {user.userID && (
        <Welcome userName={user.displayName} logoutUser={logoutUser} />
      )}
      {routes}
    </div>
  );
}

export default withRouter(App);
