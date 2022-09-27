import React, { useRef } from "react";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Button,
} from "react-bootstrap";

export const UserManagement = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const userTypeRef = useRef();
  const newPassRef = useRef();
  const confirmPassdRef = useRef();

  function newUser() {}

  function deleteUser() {}

  return (
    <div
      style={{
        marginTop: "15px",
        marginBottom: "10px",
        paddingBottom: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            USER ACCOUNTS
          </label>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Username
            </FormLabel>
            <Col>
              <FormControl
                ref={usernameRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Password
            </FormLabel>
            <Col>
              <FormControl
                ref={passwordRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <label className="separator"> </label>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              User Type
            </FormLabel>
            <Col>
              <FormControl
                ref={userTypeRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              New Password
            </FormLabel>
            <Col>
              <FormControl
                ref={newPassRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Confirm Password
            </FormLabel>
            <Col>
              <FormControl
                ref={confirmPassdRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>

          <label className="separator"> </label>

          <FormGroup as={Row}>
            <Col sm="6"></Col>
            <Col sm="3">
              <Button
                className="setButtonMargin"
                variant="success"
                onClick={() => newUser()}
              >
                New
              </Button>
            </Col>
            <Col sm="2">
              <Button
                className="setButtonMargin"
                variant="danger"
                onClick={() => deleteUser()}
              >
                Remove
              </Button>
            </Col>
          </FormGroup>
        </Card.Body>
      </Card>
    </div>
  );
};
