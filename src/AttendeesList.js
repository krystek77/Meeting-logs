import React from "react";
import Attendee from "./Attendee";
import firebase from "./Firebase";

export default function AttendeesList(props) {
  const deleteAttendee = (userID, meetingID, attendeeID) => {
    console.log(userID, meetingID, attendeeID);
    const ref = firebase
      .database()
      .ref(`meetings/${userID}/${meetingID}/attendees/${attendeeID}`);
    ref.remove().then(() => console.log("Attendee removed successfully"));
  };

  let attendeesList = null;

  if (props.attendees && props.attendees.length) {
    attendeesList = (
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <ul className="list-group">
            {props.attendees.map(
              ({ attendeeID, attendeeEmail, attendeeName }) => {
                return (
                  <Attendee
                    key={attendeeID}
                    attendeeName={attendeeName}
                    attendeeEmail={attendeeEmail}
                    adminUser={props.adminUser}
                    userID={props.userID}
                    deleteAttendee={() =>
                      deleteAttendee(props.userID, props.meetingID, attendeeID)
                    }
                  />
                );
              }
            )}
          </ul>
        </div>
      </div>
    );
  }
  return attendeesList;
}
