import React, { useState } from "react";
import Error from "./Error";
import firebase from "./Firebase";

export default function Register() {
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [error, setError] = useState({
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [authError, setAuthError] = useState({
    code: "",
    errorMessage: "",
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "userName":
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
      case "password":
        const regExpPassword = /((?=.*\d)(?=.*[a-zA-Z])(?=.*[@!-'()+--/:?[-`{}~]).{8,10})/;
        if (value.length < 8) {
          console.log("LESS THEN 8");
          setError({
            ...error,
            [name]: "The password must have more then 8 and less characters",
          });
        } else if (!regExpPassword.test(value)) {
          setError({
            ...error,
            [name]:
              "The password must have at least one uppercase, number and special char",
          });
        } else {
          setError({ ...error, [name]: "" });
        }
        break;
      case "confirmedPassword":
        if (input.password !== value) {
          setError({ ...error, [name]: "The passwords can be the same" });
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
    event.preventDefault();
    const registeredData = {
      userName: input.userName,
      email: input.email,
      password: input.password,
    };
    console.log(registeredData);
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registeredData.email,
        registeredData.password
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        if (error.message !== null) {
          const code = error.code;
          const message = error.message;
          setAuthError({ code: code, errorMessage: message });
        } else {
          setAuthError({ code: "", errorMessage: "" });
        }
      });
  };

  return (
    <div className="container">
      <div className="row pb-4">
        <div className="col">
          <h1 className="text-center">Register</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card bg-success">
            <div className="card-body">
              <form className="p-4" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="userName" className="text-light">
                    Name:
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="userName"
                    placeholder="Enter your name"
                    name="userName"
                    value={input.userName}
                    onChange={handleInput}
                  />
                  {error.userName !== "" ? (
                    <Error message={error.userName} />
                  ) : null}
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
                <div className="form-group">
                  <label htmlFor="password" className="text-light">
                    Password:
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={input.password}
                    onChange={handleInput}
                  />
                  {error.password !== "" ? (
                    <Error message={error.password} />
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmedPassword" className="text-light">
                    Confirm password:
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    id="confirmedPassword"
                    placeholder="Confirm password"
                    name="confirmedPassword"
                    value={input.confirmedPassword}
                    onChange={handleInput}
                  />
                  {error.confirmedPassword !== "" ? (
                    <Error message={error.confirmedPassword} />
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg d-block ml-auto"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {authError.errorMessage && (
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Error code={authError.code} message={authError.errorMessage} />
          </div>
        </div>
      )}
    </div>
  );
}
