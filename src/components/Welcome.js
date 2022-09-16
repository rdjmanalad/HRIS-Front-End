import React from "react";
import { Card } from "react-bootstrap";
import "../css/welcome.css";
import homeImage from "../img/AGT.png";

function Welcome() {
  const user = localStorage.getItem("user");
  return (
    <div className="clsCenter">
      {/* <Card>
        <img src={homeImage} alt="agt building"></img>
      </Card> */}
      <div className="welcomeBorder">
        <h1>Hello, {user}!</h1>
      </div>
    </div>
  );
}

export default Welcome;
