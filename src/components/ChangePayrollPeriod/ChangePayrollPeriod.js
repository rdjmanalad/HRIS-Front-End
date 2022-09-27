import { render } from "@testing-library/react";
import React, { useRef } from "react";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";

export const BranchList = () => {
  const payPeriodFromRef = useRef();
  const payPeriodToRef = useRef();
  const cutPeriodFromRef = useRef();
  const cutPeriodToRef = useRef();
  const actualNumDaysCodeRef = useRef();
  const transpoRateRef = useRef();
  const unionDueRateRef = useRef();
  const yearEndTaxAdjRef = useRef();

  render(
    <div>
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            PRESENT PAYROLL PERIOD
          </label>
          <FormGroup as={Row}>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Payroll Period From
                </FormLabel>
                <Col>
                  <FormControl
                    ref={payPeriodFromRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Cut-off Period From
                </FormLabel>
                <Col>
                  <FormControl
                    ref={cutPeriodFromRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
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
                <FormLabel column sm="3" className="noWrapText">
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
                <FormLabel column sm="3" className="noWrapText">
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
                <FormLabel column sm="3" className="noWrapText">
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
            </FormGroup>
            {/* <FormGroup as={Col} xs="1"></FormGroup> */}
            <FormGroup as={Col} sm="8">
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="2">
                  To
                </FormLabel>
                <Col sm="">
                  <FormControl
                    ref={payPeriodToRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="2">
                  To
                </FormLabel>
                <Col>
                  <FormControl
                    ref={cutPeriodToRef}
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
      </Card>
    </div>
  );
};
