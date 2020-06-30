import React from "react";

export default function Error(props) {
  return (
    <div className="bg-danger text-light px-2 py-1 mt-1 text-lowercase rounded">
      {props.message}
    </div>
  );
}
