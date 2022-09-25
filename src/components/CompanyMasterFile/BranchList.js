import React from "react";
import { Card } from "react-bootstrap";

export const BranchList = () => {
  return (
    <div>
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body>
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
