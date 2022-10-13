import { render } from "@testing-library/react";
import React, { useRef } from "react";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";

export const ChangePayrollPeriod = () => {
  const payPeriodFromRef = useRef();
  const payPeriodToRef = useRef();
  const cutPeriodFromRef = useRef();
  const cutPeriodToRef = useRef();
  const actualNumDaysCodeRef = useRef();
  const transpoRateRef = useRef();
  const unionDueRateRef = useRef();
  const yearEndTaxAdjRef = useRef();
  const collectPeriodRef = useRef();
  const bonus13thRef = useRef();

  const saveData = () => {};

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
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ width: "55rem" }}
      >
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            PRESENT PAYROLL PERIOD
          </label>
          <FormGroup as={Row}>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Payroll Period From
                </FormLabel>
                <Col>
                  <FormControl
                    ref={payPeriodFromRef}
                    className="inpHeightXs"
                    type="Date"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Cut-off Period From
                </FormLabel>
                <Col>
                  <FormControl
                    ref={cutPeriodFromRef}
                    className="inpHeightXs"
                    type="Date"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Actual no of Days
                </FormLabel>
                <Col>
                  <FormControl
                    ref={actualNumDaysCodeRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Transportation Rate
                </FormLabel>
                <Col>
                  <FormControl
                    ref={transpoRateRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Union Dues (Rate)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={unionDueRateRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Year-End Tax Adj
                </FormLabel>
                <Col>
                  <FormControl
                    ref={yearEndTaxAdjRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Bonus / 13th Month Rate
                </FormLabel>
                <Col>
                  <Form.Check
                    ref={bonus13thRef}
                    style={{ "padding-top": "5px" }}
                  ></Form.Check>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* <FormGroup as={Col} xs="1"></FormGroup> */}
            <FormGroup as={Col} sm="5">
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="1">
                  To
                </FormLabel>
                <Col sm="">
                  <FormControl
                    ref={payPeriodToRef}
                    className="inpHeightXs"
                    type="Date"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="1">
                  To
                </FormLabel>
                <Col>
                  <FormControl
                    ref={cutPeriodToRef}
                    className="inpHeightXs"
                    type="Date"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row} style={{ height: "95px" }}>
                <FormLabel sm="1"> </FormLabel>
              </FormGroup>
              <FormGroup as={Row} style={{ height: "25px" }}>
                <FormLabel column className="noWrapText" sm="5">
                  Collect this Period
                </FormLabel>
                <Col>
                  <FormControl
                    ref={collectPeriodRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
          </FormGroup>
        </Card.Body>
        <Card.Footer>
          <div style={{ display: "flex" }}>
            <button
              type="submit"
              className="btn btn-success btn-md buttonRight"
              style={{ width: "80px", marginTop: "0px" }}
              onClick={() => saveData()}
            >
              Save
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
