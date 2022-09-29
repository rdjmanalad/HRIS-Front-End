import React, { useRef } from "react";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";

export const BankUploadReport = () => {
  const compCodeRef = useRef();
  const sdRef = useRef();
  const edRef = useRef();
  const sssRef = useRef();
  const pagibigRef = useRef();
  const philhealthRef = useRef();

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
            BANK UPLOAD REPORT
          </label>
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
              Starting Date
            </FormLabel>
            <Col>
              <FormControl
                ref={sdRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Ending Date
            </FormLabel>
            <Col>
              <FormControl
                ref={edRef}
                className="inpHeightXs"
                // onChange={(event) =>
                //   (empData.paddress = event.target.value)
                // }
              ></FormControl>
            </Col>
          </FormGroup>

          <label className="separator"> </label>

          <FormGroup as={Row}>
            <Col sm="4"></Col>
            <FormLabel column sm="2" className="noWrapText">
              SSS
            </FormLabel>
            <Col sm="1">
              <Form.Check
                ref={sssRef}
                style={{ "padding-top": "5px" }}
                //   onChange={(event) =>
                //     (empData.leave = event.target.value)
                //   }
              ></Form.Check>
            </Col>
            <Col sm="4"></Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Col sm="4"></Col>
            <FormLabel column sm="2" className="noWrapText">
              Pagibig
            </FormLabel>
            <Col sm="1">
              <Form.Check
                ref={pagibigRef}
                style={{ "padding-top": "5px" }}
                //   onChange={(event) =>
                //     (empData.leave = event.target.value)
                //   }
              ></Form.Check>
            </Col>
            <Col sm="4"></Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Col sm="4"></Col>
            <FormLabel column sm="2" className="noWrapText">
              Philhealth
            </FormLabel>
            <Col sm="1">
              <Form.Check
                ref={philhealthRef}
                style={{ "padding-top": "5px" }}
                //   onChange={(event) =>
                //     (empData.leave = event.target.value)
                //   }
              ></Form.Check>
            </Col>
            <Col sm="4"></Col>
          </FormGroup>
          <label className="separator"> </label>
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
