import React, { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import MeetingsList from "./MeetingsList";
import firebase from "./Firebase";

export default function Meetings(props) {
  const [meeting, setMeeting] = useState({ name: "", description: "" });
  const [meetings, setMeetings] = useState([]);

  const handleInput = (event) => {
    setMeeting({ name: event.target.value, description: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addMeeting(meeting);
    setMeeting({ name: "", description: "" });
  };

  useEffect(() => {
    const ref = firebase.database().ref(`meetings/${props.userID}`);

    const listener = ref.on("value", (snapshot) => {
      const formattedMeetings = [];
      const retrivedMeetings = snapshot.val();
      for (let key in retrivedMeetings) {
        formattedMeetings.push({ id: key, ...retrivedMeetings[key] });
      }
      setMeetings(formattedMeetings);
    });

    return () => {
      ref.off("value", listener);
    };
  }, [props.userID]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center text-uppercase font-weight-bold">
            Meetings
          </h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card bg-primary">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Meeting name"
                    value={meeting.name}
                    onChange={handleInput}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-secondary btn-lg" type="submit">
                      <AiFillPlusCircle />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MeetingsList meetings={meetings} />
    </div>
  );
}
