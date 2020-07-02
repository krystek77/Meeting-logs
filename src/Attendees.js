import React, { useState, useEffect } from "react";
import AttendeesList from "./AttendeesList";
import firebase from "./Firebase";
import { AiOutlineReload } from "react-icons/ai";
import { FaRandom } from "react-icons/fa";

export default function Attendees(props) {
  const [attendees, setAttendees] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      const filteredAttendees = attendeesList.filter(({ attendeeName }) => {
        return attendeeName.match(searchQuery) && true;
      });
      setAttendees(filteredAttendees);
    });

    return () => {
      ref.off("value", unsubscribe);
    };
  }, [props.match.params.userID, props.match.params.meetingID, searchQuery]);

  const handleInput = (event) => {
    setSearchQuery(event.target.value);
  };
  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center text-uppercase font-weight-bold">
            Attendees List
          </h1>
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="col-lg-8">
          <div className="card bg-primary">
            <div className="card-body">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={searchQuery}
                  name="searchQuery"
                  onChange={handleInput}
                  placeholder="Search query"
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-lg btn-success"
                    onClick={clearSearchQuery}
                  >
                    <AiOutlineReload />
                  </button>
                  <button type="button" className="btn btn-lg btn-secondary">
                    <FaRandom />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AttendeesList
        attendees={attendees}
        adminUser={props.adminUser}
        userID={props.match.params.userID}
        meetingID={props.match.params.meetingID}
      />
    </div>
  );
}
