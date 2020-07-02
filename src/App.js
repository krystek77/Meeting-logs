import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Register from "./Register";
import Login from "./Login";
import Meetings from "./Meetings";
import Home from "./Home";
import Checkin from "./Checkin";
import Attendees from "./Attendees";
import "./App.css";
import firebase from "./Firebase";

function App(props) {
  const [user, setUser] = useState({
    userID: null,
    displayName: null,
    email: null,
  });
  const [meetings, setMeetings] = useState({
    meetingsList: null,
    countMeetings: 0,
  });

  useEffect(() => {
    console.log("[App.js]-mounted");
    let meetingsRef = null;
    let unsubscribMeetings = null;
    const unsubscribeUser = firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        setUser({
          userID: FBUser.uid,
          displayName: FBUser.displayName,
          email: FBUser.email,
        });
        meetingsRef = firebase.database().ref(`meetings/${FBUser.uid}`);
        unsubscribMeetings = meetingsRef.on("value", (snapshot) => {
          const meetings = snapshot.val();
          const meetingsList = [];
          for (let key in meetings) {
            meetingsList.push({
              meetingID: key,
              ...meetings[key],
              added: new Date().toISOString(),
            });
          }
          setMeetings({
            meetingsList: meetingsList,
            countMeetings: meetingsList.length,
          });
        });
      } else {
        setUser({
          userID: null,
          displayName: null,
          email: null,
        });
      }
    });

    return () => {
      console.log("[App.js]-unmounted");
      unsubscribeUser();
      meetingsRef.off("value", unsubscribMeetings);
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
    setMeetings([]);
    firebase
      .auth()
      .signOut()
      .then(() => props.history.push("/login"));
  };

  const addMeeting = (meeting) => {
    console.log("ADD meeting", meeting);
    const ref = firebase.database().ref(`meetings/${user.userID}`);
    ref.push({ ...meeting, added: new Date().toISOString() });
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
      <Route
        path="/meetings"
        render={(props) => (
          <Meetings
            {...props}
            meetings={meetings.meetingsList}
            addMeeting={addMeeting}
            userID={user.userID}
          />
        )}
      />
      <Route
        path="/checkin/:userID/:meetingID"
        render={(props) => <Checkin {...props} userID={user.userID} />}
      />
      <Route
        path="/"
        exact
        render={(props) => <Home {...props} userID={user.userID} />}
      />
      <Route
        path="/attendees/:userID/:meetingID"
        render={(props) => <Attendees {...props} adminUser={user.userID} />}
      />
    </Switch>
  );

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
