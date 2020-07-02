import React from "react";

export default function Attendee(props) {
  const { attendeeName, attendeeEmail } = props;
  return (
    <li className="list-group-item">
      <h3>{attendeeName}</h3>
      <span>{attendeeEmail}</span>
    </li>
  );
}
