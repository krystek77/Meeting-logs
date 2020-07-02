import React, { useState, useEffect } from "react";
import AttendeesList from "./AttendeesList";
import firebase from "./Firebase";

export default function Attendees(props) {
  console.log(props);
  const [attendees, setAttendees] = useState(null);

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(
        `meetings/${props.match.params.userID}/${props.match.params.meetingID}/attendees`
      );
    const unsubscribe = ref.on("value", (snapshot) => {
      const attendees = snapshot.val();
      const attendeesList = [];
      for (let key in attendees) {
        attendeesList.push({ attendeeID: key, ...attendees[key] });
      }
      setAttendees(attendeesList);
    });
    return () => {
      ref.off("value", unsubscribe);
    };
  }, [props.match.params.userID, props.match.params.meetingID]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center text-uppercase font-weight-bold">
            Attendees List
          </h1>
        </div>
      </div>
      <AttendeesList attendees={attendees} />
    </div>
  );
}
