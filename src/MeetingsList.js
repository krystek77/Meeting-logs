import React from "react";
import Meeting from "./Meeting";

export default function MeetingsList(props) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        {props.meetings.map((meeting) => {
          return <Meeting key={meeting.id} meeting={meeting} />;
        })}
      </div>
    </div>
  );
}
