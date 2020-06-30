import React from "react";
import { NavLink as Link } from "react-router-dom";

export default function Home(props) {
  return (
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
      {!props.user && (
        <div className="row">
          <div className="col text-center">
            <Link to="/register" className="btn btn-success mr-2 btn-lg">
              register
            </Link>
            <Link to="/login" className="btn btn-success mr-2 btn-lg">
              log in
            </Link>
          </div>
        </div>
      )}
      {props.user && (
        <div className="row">
          <div className="col text-center">
            <Link className="btn btn-success btn-lg" to="/meetings">
              meetings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
