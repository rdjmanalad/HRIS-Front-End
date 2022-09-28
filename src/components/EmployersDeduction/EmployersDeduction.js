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

export const EmployersDeduction = () => {
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
        paddingBottom: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ width: "30rem" }}
      >
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            EMPLOYERS DEDUCTIONS
          </label>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Employee Number
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
              Period From
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
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Period To
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
              SSS Deduction
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
              Pagibig Deduction
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
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Philhealth Deduction
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
        </Card.Body>
        <Card.Footer>
          <FormGroup as={Row}>
            <Col sm="3"></Col>
            <Col sm="3">
              <Button
                className="setButtonMargin"
                variant="success"
                onClick={() => newUser()}
              >
                New
              </Button>
            </Col>
            <Col sm="3">
              <Button
                className="setButtonMargin"
                variant="danger"
                onClick={() => deleteUser()}
              >
                Remove
              </Button>
            </Col>
            <Col sm="3"></Col>
          </FormGroup>
        </Card.Footer>
      </Card>
    </div>
  );
};
