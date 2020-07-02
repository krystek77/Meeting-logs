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

  const toggleStar = (userID, meetingID, attendeeID, attendeeStar) => {
    console.log(userID, meetingID, attendeeID, attendeeStar);
    const ref = firebase
      .database()
      .ref(
        `meetings/${userID}/${meetingID}/attendees/${attendeeID}/attendeeStar`
      );
    if (attendeeStar === undefined) {
      ref.set(true);
    } else {
      ref.set(!attendeeStar);
    }
  };

  let attendeesList = null;

  if (props.attendees && props.attendees.length) {
    attendeesList = (
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <ul className="list-group">
            {props.attendees.map(
              ({ attendeeID, attendeeEmail, attendeeName, attendeeStar }) => {
                return (
                  <Attendee
                    key={attendeeID}
                    attendeeName={attendeeName}
                    attendeeEmail={attendeeEmail}
                    attendeeStar={attendeeStar}
                    adminUser={props.adminUser}
                    userID={props.userID}
                    deleteAttendee={() =>
                      deleteAttendee(props.userID, props.meetingID, attendeeID)
                    }
                    toggleStar={() =>
                      toggleStar(
                        props.userID,
                        props.meetingID,
                        attendeeID,
                        attendeeStar
                      )
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
