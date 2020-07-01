import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Meeting(props) {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2 className="card-title mb-0">{props.meeting.name}</h2>
        <span className="card-subtitle mb-2 text-muted">
          added: <strong>{props.meeting.added.slice(0, 10)}</strong>
        </span>
        <p className="card-text text-truncate">{props.meeting.description}</p>
        <div className="card-footer">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={props.deleteMeeting}
          >
            <AiTwotoneDelete />
          </button>
          <Link to="/checkin" className="btn btn-outline-success">
            <FaUserCheck />
          </Link>
        </div>
      </div>
    </div>
  );
}
