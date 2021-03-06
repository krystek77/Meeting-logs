import React, { useEffect } from "react";
import { NavLink as Link } from "react-router-dom";

export default React.memo(function Welcome(props) {
  useEffect(() => {
    return () => {};
  });

  let welcome = (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <p className="mb-0 mr-2">
              Welcome,
              <span className="text-success font-weight-bold ml-2">
                {props.userName}
              </span>
            </p>
            <Link
              to="/logout"
              className="font-weight-bold"
              onClick={props.logoutUser}
            >
              log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  if (!props.userName) welcome = null;
  return welcome;
});
