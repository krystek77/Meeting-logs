import React from "react";
import { AiFillStar, AiFillDelete } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

export default function Attendee(props) {
  const {
    attendeeName,
    attendeeEmail,
    attendeeStar,
    adminUser,
    userID,
    deleteAttendee,
    toggleStar,
  } = props;

  const admin = adminUser === userID ? true : false;
  return (
    <li className="list-group-item d-flex align-items-center">
      {admin && (
        <div className="btn-group">
          <button
            type="button"
            className={
              "btn btn-outline-dark " +
              (attendeeStar ? "btn-warning" : "btn-light")
            }
            title="Give user the star"
            onClick={toggleStar}
          >
            <AiFillStar />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            title="Delete attendee"
            onClick={deleteAttendee}
          >
            <AiFillDelete />
          </button>
          <a
            href={`mailto:${attendeeEmail}`}
            className="btn btn-outline-info"
            title="Send mail to atendee of meeting"
          >
            <MdEmail />
          </a>
        </div>
      )}

      <div className={admin ? "ml-3" : "mx-auto"}>
        <h3 className={admin ? "" : "text-center"}>{attendeeName}</h3>
        <span>{attendeeEmail}</span>
      </div>
    </li>
  );
}
