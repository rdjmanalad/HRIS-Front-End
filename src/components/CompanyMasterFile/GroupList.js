import React from "react";
import { Card } from "react-bootstrap";

export const GroupList = () => {
  return (
    <div>
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body style={{ paddingTop: "0px" }}>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            Group Information
          </label>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            Group List
          </label>
        </Card.Body>
      </Card>
    </div>
  );
};
