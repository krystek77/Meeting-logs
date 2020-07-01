import React from "react";
import Meeting from "./Meeting";
import firebase from "./Firebase";

export default React.memo(function MeetingsList(props) {
  const deleteMeeting = (meetingID) => {
    console.log("Delete meeting", meetingID);
    const ref = firebase
      .database()
      .ref(`meetings/${props.userID}/${meetingID}`);
    ref.remove().then(() => console.log("Removed succesfully"));
  };

  return (
    <React.Fragment>
      {props.meetings && props.meetings.length ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {props.meetings.map((meeting) => {
              return (
                <Meeting
                  key={meeting.meetingID}
                  meeting={meeting}
                  userID={props.userID}
                  deleteMeeting={() => deleteMeeting(meeting.meetingID)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
});
