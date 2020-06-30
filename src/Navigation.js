import React from "react";
import { GiExplosiveMeeting } from "react-icons/gi";

export default function Navigation(props) {
  
  return (
    <nav className="navbar bg-success navbar-dark mb-5">
      <a href="/" className="navbar-brand">
        <GiExplosiveMeeting className="mr-2" />
        Meeting Log
      </a>
      <ul className="nav">
        {!props.user && (
          <li className="nav-item">
            <a
              href="/register"
              className="nav-link text-light font-weight-bold text-center"
            >
              register
            </a>
          </li>
        )}
        {!props.user && (
          <li className="nav-item">
            <a
              href="/login"
              className="nav-link text-light font-weight-bold text-center"
            >
              log in
            </a>
          </li>
        )}
        {props.user && (
          <li className="nav-item">
            <a
              href="/meetings"
              className="nav-link text-light font-weight-bold text-center"
            >
              meetings
            </a>
          </li>
        )}
        {props.user && (
          <li className="nav-item">
            <a
              href="/logout"
              className="nav-link text-light font-weight-bold text-center"
            >
              log out
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
