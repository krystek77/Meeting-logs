import React from "react";
import Meeting from "./Meeting";

export default React.memo(function MeetingsList(props) {
  console.log("MeetingsList", props.meetings);
  return (
    <React.Fragment>
      {props.meetings && props.meetings.length ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {props.meetings.map((meeting) => {
              return (
                <Meeting
                  key={meeting.id}
                  meeting={meeting}
                  deleteMeeting={() => props.deleteMeeting(meeting.id)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
});
