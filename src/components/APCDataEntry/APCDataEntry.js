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

export const APCDataEntry = () => {
  const actGroupCodeRef = useRef();
  const bpiBranchCodeRef = useRef();
  const tranDateRef = useRef();
  const compAcctNoRef = useRef();
  const compCodeRef = useRef();
  const batchNoRef = useRef();

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
            APC DATA ENTRY
          </label>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Actual Group Code
            </FormLabel>
            <Col>
              <FormControl
                ref={actGroupCodeRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              BPI Branch Code
            </FormLabel>
            <Col>
              <FormControl
                ref={bpiBranchCodeRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Transaction Date
            </FormLabel>
            <Col>
              <FormControl
                ref={tranDateRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Company Account No.
            </FormLabel>
            <Col>
              <FormControl
                ref={compAcctNoRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Company Code
            </FormLabel>
            <Col>
              <FormControl
                ref={compCodeRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Batch No.
            </FormLabel>
            <Col>
              <FormControl
                ref={batchNoRef}
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
