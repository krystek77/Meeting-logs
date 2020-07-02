import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import MeetingsList from "./MeetingsList";


export default function Meetings(props) {
  const [meeting, setMeeting] = useState({ name: "", description: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addMeeting(meeting);
    setMeeting({ name: "", description: "" });
  };

  const handleInput = (event) => {
    const meetingName = event.target.value;
    setMeeting({ name: meetingName, description: "" });
  };

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
        <div className="col-lg-8">
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
      <MeetingsList meetings={props.meetings} userID={props.userID} />
    </div>
  );
}
