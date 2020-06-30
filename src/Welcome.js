import React from "react";

export default function Welcome(props) {
  let welcome = (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <p className="mb-0 mr-2">
              Welcome,
              <span className="text-success font-weight-bold ml-2">
                {props.user}
              </span>
            </p>
            <a href="/logout" className="font-weight-bold">
              log out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  if (!props.user) welcome = null;
  return welcome;
}