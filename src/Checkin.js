import React, { useState } from "react";
import firebase from "./Firebase";
import Error from "./Error";

export default React.memo(function Checkin(props) {
  const [input, setInput] = useState({
    email: "",
    name: "",
  });

  const [error, setError] = useState({
    email: "",
    name: "",
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "name":
        const regExpUserName = /^([A-Z]+[A-Za-z]*)$/;
        if (value.trim() === "") {
          setError({ ...error, [name]: "The field can not be empty" });
        } else if (!regExpUserName.test(value)) {
          setError({
            ...error,
            [name]:
              "User name should start with a uppercase letter and not contain a number",
          });
        } else {
          setError({ ...error, [name]: "" });
        }

        break;
      case "email":
        const regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!regExpEmail.test(value)) {
          setError({ ...error, [name]: "This not valid email" });
        } else {
          setError({ ...error, [name]: "" });
        }
        break;
      default:
        setError({ ...error });
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    console.log("SUBMIT CHECK", props.meetingID);
    event.preventDefault();
    const attendeeData = {
      attendeeEmail: input.email,
      attendeeName: input.name,
    };
    const ref = firebase
      .database()
      .ref(
        `meetings/${props.match.params.userID}/${props.match.params.meetingID}/attendees`
      );
    ref.push(attendeeData);
    props.history.push(
      `/attendees/${props.match.params.userID}/${props.match.params.meetingID}`
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center text-uppercase font-weight-bold">
            Checkin
          </h1>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card bg-success">
            <div className="card-body">
              <form className="p-4" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="text-light">
                    Name:
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    name="name"
                    value={input.name}
                    onChange={handleInput}
                  />
                  {error.name !== "" ? <Error message={error.name} /> : null}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="text-light">
                    Email:
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={input.email}
                    onChange={handleInput}
                  />
                  {error.email !== "" ? <Error message={error.email} /> : null}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg d-block ml-auto"
                >
                  Check in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
