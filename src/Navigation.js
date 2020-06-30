import React from "react";
import { NavLink as Link } from "react-router-dom";
import { GiExplosiveMeeting } from "react-icons/gi";

export default function Navigation(props) {
  return (
    <nav className="navbar bg-success navbar-dark mb-5">
      <Link to="/" className="navbar-brand">
        <GiExplosiveMeeting className="mr-2" />
        Meeting Log
      </Link>
      <ul className="nav">
        {!props.user && (
          <li className="nav-item">
            <Link
              to="/register"
              className="nav-link text-light font-weight-bold text-center"
            >
              register
            </Link>
          </li>
        )}
        {!props.user && (
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link text-light font-weight-bold text-center"
            >
              log in
            </Link>
          </li>
        )}
        {props.user && (
          <li className="nav-item">
            <Link
              to="/meetings"
              className="nav-link text-light font-weight-bold text-center"
            >
              meetings
            </Link>
          </li>
        )}
        {props.user && (
          <li className="nav-item">
            <Link
              to="/logout"
              className="nav-link text-light font-weight-bold text-center"
            >
              log out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
