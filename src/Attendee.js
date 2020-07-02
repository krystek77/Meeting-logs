import React from "react";
import { AiFillStar, AiFillDelete } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

export default function Attendee(props) {
  const { attendeeName, attendeeEmail, adminUser, userID } = props;
  const admin = adminUser === userID ? true : false;
  return (
    <li className="list-group-item d-flex align-items-center">
      {admin && (
        <div className="btn-group">
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
      )}

      <div className={admin ? "ml-3" : "mx-auto"}>
        <h3 className={admin ? "" : "text-center"}>{attendeeName}</h3>
        <span>{attendeeEmail}</span>
      </div>
    </li>
  );
}
