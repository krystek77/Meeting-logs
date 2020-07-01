import React, { useState, useEffect } from "react";
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
      {attendees && attendees.length ? (
        <div className="row">
          <div className="col-lg-8">
            <ul className="list-group">
              {attendees.map(({ attendeeID, attendeeEmail, attendeeName }) => {
                return (
                  <li className="list-group-item" key={attendeeID}>
                    <h3>{attendeeName}</h3>
                    <span>{attendeeEmail}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
