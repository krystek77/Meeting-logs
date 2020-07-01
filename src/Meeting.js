import React from "react";

export default function Meeting(props) {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2 className="card-title mb-0">{props.meeting.meetingName}</h2>
        <span class="card-subtitle mb-2 text-muted">
          added: <strong>{props.meeting.added.slice(0, 10)}</strong>
        </span>
        <p class="card-text text-truncate">{props.meeting.description}</p>
      </div>
    </div>
  );
}
