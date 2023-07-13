import React from "react";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";

export const AttendanceReport = () => {
  return (
    <div style={{ margin: "auto", width: "35%" }}>
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ width: "30rem", display: "grid" }}
      >
        <Card.Body style={{ paddingBottom: "0px", border: "solid 1px gray" }}>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            PRINT ATTENDANCE
          </label>
          <FormGroup as={Row}>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <Col sm="1"></Col>
                <FormLabel column sm="3" className="noWrapText">
                  Group
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs"
                    style={{ width: "100px" }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Col sm="1"></Col>
                <FormLabel column sm="3" className="noWrapText">
                  Month
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs"
                    style={{ width: "100px" }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Col sm="1"></Col>
                <FormLabel column sm="3" className="noWrapText">
                  Year
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs"
                    style={{ width: "100px" }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Col sm="1"></Col>
                <FormLabel column sm="3" className="noWrapText">
                  Period
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs"
                    style={{ width: "200px" }}
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
              className="btn btn-primary btn-md buttonRight"
              style={{ width: "80px", marginTop: "0px", marginRight: "5px" }}
              //   onClick={() => deleteData()}
            >
              Export
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-md "
              style={{ width: "80px", marginTop: "0px" }}
              //   onClick={() => saveData()}
            >
              Print
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
