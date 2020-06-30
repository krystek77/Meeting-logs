import React, { useState } from "react";
import Navigation from "./Navigation";
import "./App.css";

function App() {
  const [user, setUser] = useState("Bob");

  return (
    <div className="App">
      {/** Navigation */}
      <Navigation user={user} />
      {/** Welcome */}
      {user && (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <p className="mb-0 mr-2">
                  Welcome,
                  <span className="text-success font-weight-bold ml-2">
                    {user}
                  </span>
                </p>
                <a href="/logout" className="font-weight-bold">
                  log out
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/** Home */}
      <div className="container">
        <div className="row">
          <h1 className="col text-center">Meeting log</h1>
        </div>
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto">
            <p className="text-center font-weight-light">
              The simple application creates meetings, allows people to check in
              and pick random users to award giveaways. It is Single Page
              Application which includes connection to a database and routing.
            </p>
          </div>
        </div>
        {!user && (
          <div className="row">
            <div className="col text-center">
              <button type="button" className="btn btn-success mr-2 btn-lg">
                register
              </button>
              <button type="button" className="btn btn-success mr-2 btn-lg">
                log in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
