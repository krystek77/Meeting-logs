import React from "react";
import Attendee from "./Attendee";

export default function AttendeesList(props) {
  let attendeesList = null;

  if (props.attendees && props.attendees.length) {
    attendeesList = (
      <div className="row">
        <div className="col-lg-8">
          <ul className="list-group">
            {props.attendees.map(({ attendeeID, attendeeEmail, attendeeName }) => {
              return (
                <Attendee
                  key={attendeeID}
                  attendeeName={attendeeName}
                  attendeeEmail={attendeeEmail}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  return attendeesList;
}
