import React, { Component } from "react";
import {
  Card,
  Form,
  FormGroup,
  Row,
  Col,
  FormLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";

class InfractionInfo extends Component {
  render() {
    return (
      <div>
        <Card className={" border-dark bg-dark text-white"}>
          <Card.Body>
            <Form as={Row}>
              <FormGroup as={Row}>
                <label
                  className="asHeader"
                  style={{
                    "margin-top": "5px",
                    "margin-left": "6px",
                    "padding-right": "0px",
                  }}
                >
                  Present Payroll Information
                </label>

                {/* new column   ################################## */}
                <FormGroup as={Col} style={{ "padding-right": "0px" }}>
                  <FormGroup as={Row}>
                    <FormLabel column sm="3" className="noWrapText">
                      Prepare Date
                    </FormLabel>
                    <Col>
                      <FormControl className="inpHeightXs"></FormControl>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel column sm="3" className="noWrapText">
                      Infraction
                    </FormLabel>
                    <Col>
                      <FormControl
                        as="textarea"
                        rows={2}
                        className="inpHeightXs"
                        style={{ height: "60px" }}
                      ></FormControl>
                    </Col>
                  </FormGroup>
                </FormGroup>
                {/* new column   ################################## */}
                <FormGroup as={Col} style={{ "padding-right": "0px" }}>
                  <FormGroup as={Row}>
                    <FormLabel column sm="3" className="noWrapText">
                      Suspension (Days)
                    </FormLabel>
                    <Col>
                      <FormControl className="inpHeightXs"></FormControl>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel column sm="3" className="noWrapText">
                      Sanction Details
                    </FormLabel>
                    <Col>
                      <FormControl
                        as="textarea"
                        rows={2}
                        className="inpHeightXs"
                        style={{ height: "60px" }}
                      ></FormControl>
                    </Col>
                  </FormGroup>
                </FormGroup>
              </FormGroup>
              <FormGroup as={Row}>
                <label
                  className="asHeader"
                  style={{
                    "margin-top": "5px",
                    "margin-left": "6px",
                    "padding-right": "0px",
                  }}
                >
                  Present Payroll Information
                </label>
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default InfractionInfo;
