import React, { useState } from "react";
import {
  Card,
  FormControl,
  FormLabel,
  Form,
  FormGroup,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import DatePicker from "react-datepicker";

// class EmpMasterFile extends React.Component {
//   render() {
function EmpMasterFile({ empData }) {
  function dd() {
    setDate(new Date(empData.dateHire).toLocaleDateString("en-CA"));
  }

  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);
  const [date, setDate] = useState(defaultDate);

  const onSetDate = (event) => {
    setDate(new Date(event.target.value));
  };
  return (
    <div>
      {/* {this.props.parentToChild} */}
      <Card className={" border-dark bg-dark text-white"}>
        <Card.Body>
          <label className="asHeader" style={{ "padding-left": "5px" }}>
            Contact Information
          </label>
          <Form as={Row}>
            <FormGroup as={Row} style={{ "padding-right": "0px" }}>
              <FormGroup as={Col} xs="9">
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Home Address
                  </FormLabel>
                  <Col>
                    <FormControl
                      value={empData.address}
                      className="inpHeightXs"
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Prov Address
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      value={empData.paddress}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Contact Number
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.phone}
                    ></FormControl>
                  </Col>
                  <Col></Col>
                </FormGroup>
                {/* Contact in Case of Emergency ######################*/}
                <label className="asHeader" style={{ "padding-left": "10px" }}>
                  Contact in Case of Emergency
                </label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Contact Person
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.cperson}
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Phone
                  </FormLabel>
                  <Col>
                    <FormControl className={"inpHeightXs"}></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Contact Address
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.caddress}
                    ></FormControl>
                  </Col>
                </FormGroup>
                {/* Employee Iformation ##############################*/}
                <label className="asHeader" style={{ "padding-left": "10px" }}>
                  Employee Information
                </label>
                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Gender
                  </FormLabel>
                  <Col column sm="2">
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.gender}
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Birthdate
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      // value={empData.birthday}
                      value={new Date(empData.birthday).toLocaleDateString()}
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Age
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.age}
                    ></FormControl>
                  </Col>
                </FormGroup>

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Civil Status
                  </FormLabel>
                  <Col column sm="2">
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.civil}
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Spouse
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      // value={empData.spouse}

                      value={new Date(empData.dateHire).toLocaleDateString()}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Hire Date
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      type="Date"
                      //value={new Date(empData.birthday).toLocaleDateString()}
                      // value={new Date("03/03/2007")}
                      defaultValue={new Date(
                        empData.dateHire
                      ).toLocaleDateString("en-CA")}
                      //value={formatToSimpleDate(empData.dateHire)}
                      //onChange={onSetDate}
                    ></FormControl>
                  </Col>
                  <FormLabel
                    column
                    sm="1"
                    className="noWrapText"
                    style={{ "padding-left": "0px" }}
                  >
                    Work Status
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.workStatus}
                    ></FormControl>
                  </Col>
                  <FormLabel
                    column
                    sm="1"
                    className="noWrapText"
                    style={{ "padding-left": "0px" }}
                  >
                    Date Regular
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      type="Date"
                    ></FormControl>
                  </Col>
                </FormGroup>

                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Maternity / Paternity leave
                  </FormLabel>
                  <Col>
                    <Form.Check
                      style={{ "padding-top": "5px" }}
                      value={empData.leave}
                    ></Form.Check>
                  </Col>
                </FormGroup>
              </FormGroup>
              <FormGroup as={Col}>
                <FormGroup as={Row} className="mb-1">
                  <FormLabel as={Col} className="mb-1">
                    <div className={("borderWhite", "imageSize2")}>
                      <Image
                        fluid
                        src={""}
                        alt="Missing Image"
                        className={("borderWhite", "imageSize2")}
                      ></Image>
                    </div>
                  </FormLabel>
                </FormGroup>
                <label className="asHeader" style={{ "padding-left": "10px" }}>
                  Payroll Summary
                </label>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    ATM No.
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.atmno}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    SSS No.
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.sssno}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    TIN
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.tinno}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Pagibig
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.pagibigNo}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    PhilHealth
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      value={empData.philhealthNo}
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
            </FormGroup>
            <Card>
              <Card.Body style={{ height: "30px" }}>END</Card.Body>
            </Card>
            <FormGroup as={Row} className="mb-1"></FormGroup>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmpMasterFile;
