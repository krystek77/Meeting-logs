import React from "react";

export default function Error(props) {
  return (
    <div className="bg-danger text-light px-2 py-1 mt-1 text-lowercase rounded text-center">
      {props.code && (
        <h2 className="text-center">
          Error: <span className="text-uppercase text-warning">{props.code}</span>
        </h2>
      )}
      {props.message}
    </div>
  );
}
