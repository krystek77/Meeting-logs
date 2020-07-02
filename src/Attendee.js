import React from "react";
import { AiFillStar, AiFillDelete } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

export default function Attendee(props) {
  const { attendeeName, attendeeEmail } = props;
  return (
    <li className="list-group-item d-flex align-items-center">
      <div
        className="btn-group"
        role="control-buttons"
        aria-label="control-buttons"
      >
        <button
          type="button"
          className="btn btn-outline-secondary"
          title="Add to favorite"
          onClick={() => console.log("Set star")}
        >
          <AiFillStar />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          title="Delete attendee"
          onClick={() => console.log("Delete attendee")}
        >
          <AiFillDelete />
        </button>
        <button
          type="button"
          className="btn btn-outline-info"
          title="Delete attendee"
          onClick={() => console.log("Delete attendee")}
        >
          <MdEmail />
        </button>
      </div>
      <div className="ml-3">
        <h3>{attendeeName}</h3>
        <span>{attendeeEmail}</span>
      </div>
    </li>
  );
}
