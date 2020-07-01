import React from "react";
import Meeting from "./Meeting";

export default function MeetingsList() {
  const meeting = {
    meetingName: "Learn React.js",
    description:
      "Credibly morph effective total linkage without B2C convergence. Rapidiously disseminate interoperable e-business for resource-leveling initiatives. Objectively optimize cross-unit niches with transparent ROI. Uniquely.",
    added: new Date().toISOString(),
  };
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <Meeting meeting={meeting} />
        <Meeting meeting={meeting} />
        <Meeting meeting={meeting} />
      </div>
    </div>
  );
}
