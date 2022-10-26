import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  FormControl,
  FormLabel,
  Form,
  FormGroup,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import axios from "axios";

function EmpMasterFile({ empData, refreshPage }) {
  const [masEmployee, setEmp] = useState([]);
  const [empNo, setEmpNo] = useState(false);
  const [address, setAddress] = useState("");

  const addressRef = useRef();
  const paddressRef = useRef();
  const phoneRef = useRef();
  const cphoneRef = useRef();
  const cpersonRef = useRef();
  const caddressRef = useRef();
  const genderRef = useRef();
  const birthdayRef = useRef();
  const ageRef = useRef();
  const civilRef = useRef();
  const spouseRef = useRef();
  const hireDateRef = useRef();
  const workStatusRef = useRef();
  const dateRegularRef = useRef();
  const leaveRef = useRef();
  const atmnoRef = useRef();
  const sssnoRef = useRef();
  const tinnoRef = useRef();
  const pagibigNoRef = useRef();
  const philhealthNoRef = useRef();

  useEffect(() => {
    // setAddress(empData.address);
    setEmp(empData);
  });

  function saveDetails() {
    console.log(masEmployee);
    setEmpNo(empData.employeeNo);
    // if (empNo.length > 0) {
    axios
      .post("http://localhost:8080/api/masemployeeSave", masEmployee, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Successfully Saved!");
        }
      })
      .catch((message) => {
        alert(message);
      });
    // } else {
    //   alert("empno :" + empNo);
    //   axios
    //     .put(
    //       "http://localhost:8080/api/masemployeeSave/" + empNo,
    //       masEmployee,
    //       {
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //           Authorization:
    //             "Bearer " +
    //             localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       if (response.status === 200) {
    //         alert("Successfully Saved!");
    //       }
    //     })
    //     .catch((message) => {
    //       alert(message);
    //     });
    // }
  }

  function newDetails() {
    window.location.reload(false);
    clearDetails();
    setEmp(empData);
  }

  function editDetails() {}

  useEffect(() => {
    // alert(masEmployee.length);
    if (masEmployee.length !== 0) {
      console.log(masEmployee.cphone);
      addressRef.current.value = masEmployee.address;
      paddressRef.current.value = masEmployee.paddress;
      phoneRef.current.value = masEmployee.phone;
      cpersonRef.current.value = masEmployee.cperson;
      caddressRef.current.value = masEmployee.caddress;
      cphoneRef.current.value = masEmployee.cphone;
      genderRef.current.value = masEmployee.gender;
      birthdayRef.current.value = new Date(
        masEmployee.birthday
      ).toLocaleDateString("en-CA");
      ageRef.current.value = masEmployee.age;
      civilRef.current.value = masEmployee.civil;
      spouseRef.current.value = masEmployee.spouse;
      hireDateRef.current.value = new Date(
        masEmployee.dateHire
      ).toLocaleDateString("en-CA");
      workStatusRef.current.value = masEmployee.workStatus;
      dateRegularRef.current.value = new Date(
        masEmployee.dateRegular
      ).toLocaleDateString("en-CA");
      leaveRef.current.checked = masEmployee.leave === "1" ? true : false;
      atmnoRef.current.value = masEmployee.atmno;
      sssnoRef.current.value = masEmployee.sssno;
      tinnoRef.current.value = masEmployee.tinno;
      pagibigNoRef.current.value = masEmployee.pagibigNo;
      philhealthNoRef.current.value = masEmployee.philhealthNo;
    }
    // addressRef.current.dafaultValue=masEmployee.address;
  }, [masEmployee]);

  // function newDetails() {
  //   window.location.reload(false);
  // }

  function clearDetails() {
    addressRef.current.value = "";

    empData.abranchCode = "";
    empData.acompanyCode = "";
    empData.address = "";
    empData.age = "";
    empData.agroupCode = "";
    empData.alowance1 = "";
    empData.allowance2 = "";
    empData.atmno = "";
    empData.basicPay = "";
    empData.birthday = "";
    empData.board = "";
    empData.caddress = "";
    empData.civil = "";
    empData.cola = "";
    empData.cperson = "";
    empData.cphone = "";
    empData.datehire = "";
    empData.employeeNo = "";
    empData.exemption = "";
    empData.firstName = "";
    empData.gender = "";
    empData.lastName = "";
    empData.leave = "";
    empData.middleName = "";
    empData.obranchCode = "";
    empData.ocompanyCode = "";
    empData.ogroupCode = "";
    empData.paddress = "";
    empData.pagibigNo = "";
    empData.philhealthNo = "";
    empData.phone = "";
    empData.presentLeave = "";
    empData.previousLeave = "";
    empData.rank = "";
    empData.remarks = "";
    empData.resigned = "";
    empData.schedIn = "";
    empData.schedOut = "";
    empData.spouse = "";
    empData.sssno = "";
    empData.taxCode = "";
    empData.tinno = "";
    empData.transportation = "";
    empData.unionName = "";
    empData.waverage = "";
    empData.workPosition = "";
    empData.workStatus = "";
  }

  const checkToggle = (e) => {
    e.target.checked ? (empData.leave = 1) : (empData.leave = 0);
  };

  return (
    <div>
      {/* {this.props.parentToChild} */}
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            Contact Information
          </label>
          <Form as={Row}>
            <FormGroup as={Row} style={{ paddingRight: "0px" }}>
              <FormGroup as={Col} xs="9">
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Home Address
                  </FormLabel>
                  <Col>
                    <FormControl
                      // defaultValue={empData.address}
                      ref={addressRef}
                      // defaultValue={address}
                      className="inpHeightXs"
                      onChange={(event) =>
                        (empData.address = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Prov Address
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={paddressRef}
                      className="inpHeightXs"
                      // defaultValue={masEmployee.paddress}
                      onChange={(event) =>
                        (empData.paddress = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Contact Number
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={phoneRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.phone}
                      onChange={(event) => (empData.phone = event.target.value)}
                    ></FormControl>
                  </Col>
                  <Col></Col>
                </FormGroup>
                {/* Contact in Case of Emergency ######################*/}
                <label className="asHeader" style={{ paddingLeft: "10px" }}>
                  Contact in Case of Emergency
                </label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Contact Person
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={cpersonRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.cperson}
                      onChange={(event) =>
                        (empData.cperson = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Phone
                  </FormLabel>
                  <Col>
                    <FormControl
                      className={"inpHeightXs"}
                      ref={cphoneRef}
                      onChange={(event) =>
                        (empData.cphone = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Contact Address
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={caddressRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.caddress}
                      onChange={(event) =>
                        (empData.caddress = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
                {/* Employee Iformation ##############################*/}
                <label className="asHeader" style={{ paddingLeft: "10px" }}>
                  Employee Information
                </label>
                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Gender
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={genderRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.gender}
                      onChange={(event) =>
                        (empData.gender = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Birthdate
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={birthdayRef}
                      className={"inpHeightXs"}
                      type="date"
                      // value={new Date(empData.birthday).toLocaleDateString(
                      //   "en-CA"
                      // )}
                      onChange={(event) =>
                        (empData.birthday = new Date(
                          event.target.value
                        ).toLocaleDateString("en-CA"))
                      }
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Age
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={ageRef}
                      className={"inpHeightXs"}
                      // deFaultValue={empData.age}
                      onChange={(event) => (empData.age = event.target.value)}
                    ></FormControl>
                  </Col>
                </FormGroup>

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Civil Status
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={civilRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.civil}
                      onChange={(event) => (empData.civil = event.target.value)}
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Spouse
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={spouseRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.spouse}
                      onChange={(event) =>
                        (empData.spouse = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Hire Date
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={hireDateRef}
                      className={"inpHeightXs"}
                      type="Date"
                      // defaultValue={new Date(
                      //   empData.dateHire
                      // ).toLocaleDateString("en-CA")}
                      // value={new Date(empData.dateHire).toLocaleDateString(
                      //   "en-CA"
                      // )}
                      // onClick={() => clearDate()}
                    ></FormControl>
                  </Col>
                  <FormLabel
                    column
                    sm="1"
                    className="noWrapText"
                    style={{ paddingLeft: "0px" }}
                  >
                    Work Status
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={workStatusRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.workStatus}
                      onChange={(event) =>
                        (empData.workStatus = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                  <FormLabel
                    column
                    sm="1"
                    className="noWrapText"
                    style={{ paddingLeft: "0px" }}
                  >
                    Date Regular
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={dateRegularRef}
                      className={"inpHeightXs"}
                      type="Date"
                      // defaultValue={new Date(empData.dateRegular).toLocaleDateString(
                      //   "en-CA"
                      // )}
                      onChange={(event) =>
                        (empData.dateRegular = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>

                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Maternity / Paternity leave
                  </FormLabel>
                  <Col>
                    <Form.Check
                      ref={leaveRef}
                      style={{ paddingTop: "5px" }}
                      onChange={(event) => checkToggle(event)}
                      // onSelect={(event) => (empData.leave = 1)}
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
                <label className="asHeader" style={{ paddingLeft: "10px" }}>
                  Payroll Summary
                </label>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    ATM No.
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={atmnoRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.atmno}
                      onChange={(event) => (empData.atmno = event.target.value)}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    SSS No.
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={sssnoRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.sssno}
                      onChange={(event) => (empData.sssno = event.target.value)}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    TIN
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={tinnoRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.tinno}
                      onChange={(event) => (empData.tinno = event.target.value)}
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Pagibig
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={pagibigNoRef}
                      className={"inpHeightXs"}
                      // dafaultValue={empData.pagibigNo}
                      onChange={(event) =>
                        (empData.pagibigNo = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    PhilHealth
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={philhealthNoRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.philhealthNo}
                      onChange={(event) =>
                        (empData.philhealthNo = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
            </FormGroup>
          </Form>
        </Card.Body>
        <Card.Footer>
          <div style={{ display: "flex" }}>
            <Button
              className="btn btn-primary btn-md buttonRight"
              style={{
                width: "80px",
                marginTop: "0px",
                marginRight: "5px",
              }}
              onClick={() => newDetails()}
            >
              New
            </Button>

            <Button
              // className="setButtonMargin2"
              className="btn btn-success btn-md "
              style={{ width: "80px", marginTop: "0px" }}
              onClick={() => saveDetails()}
            >
              Save
            </Button>
            {/* <Button
                  className="setButtonMargin"
                  variant="warning"
                  onClick={() => editDetails()}
                >
                  Edit
                </Button> */}
            {/* <Button
                  className="setButtonMargin"
                  variant="danger"
                  onClick={() => deleteEmployee()}
                >
                  Remove
                </Button> */}
            {/* <Col sm="2"></Col> */}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default EmpMasterFile;
