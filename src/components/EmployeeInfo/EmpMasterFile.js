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
  Button,
} from "react-bootstrap";
import axios from "axios";

// class EmpMasterFile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { empData: this.props.empData, address: "" };
//   }

//   alertUser() {
//     alert("You clicked!");
//   }
//   render() {
function EmpMasterFile({ empData, refreshPage }) {
  // const { empData, address } = this.state;
  const [MasEmployee, setEmp] = useState([]);
  const [empNo, setEmpNo] = useState(false);

  function saveDetails() {
    setEmp(empData);
    // setEmpNo(empData.employeeNo);
    alert(empData.firstName);

    // if (!empNo) {
    axios
      .post("http://localhost:8080/api/masemployeeSave", MasEmployee, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => {
        alert(response.status);
        // setData(response.data);
        // console.log(response.data);
      });
    // } else {
    //   axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    //   axios
    //     .put("http://localhost:8080/api/masemployeeSave/" + empNo, {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application-json",
    //       },
    //       // body: JSON.stringify(empData),
    //       body: { MasEmployee },
    //     })
    //     .then((response) => {
    //       alert(response.status);
    //       // setData(response.data);
    //       // console.log(response.data);
    //     });
    // }
  }

  return (
    <div>
      {/* {this.props.parentToChild} */}
      <Card className={" border-dark bg-dark text-white floatTop"}>
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
                      defaultValue={empData.address}
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
                      className="inpHeightXs"
                      defaultValue={empData.paddress}
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
                      className={"inpHeightXs"}
                      defaultValue={empData.phone}
                      onChange={(event) => (empData.phone = event.target.value)}
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
                      defaultValue={empData.cperson}
                      onChange={(event) =>
                        (empData.cperson = event.target.value)
                      }
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
                      defaultValue={empData.caddress}
                      onChange={(event) =>
                        (empData.caddress = event.target.value)
                      }
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
                      defaultValue={empData.gender}
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
                      className={"inpHeightXs"}
                      type="date"
                      value={new Date(empData.birthday).toLocaleDateString(
                        "en-CA"
                      )}
                      // value={new Date(empData.birthday).toLocaleDateString(
                      //   "en-CA"
                      // )}
                      // onChange={onSetDate}
                      onChange={(event) =>
                        (empData.gender = event.target.value)
                      }
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
                      value={empData.spouse}
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
                      defaultValue={new Date(
                        empData.dateHire
                      ).toLocaleDateString("en-CA")}
                      value={new Date(empData.dateHire).toLocaleDateString(
                        "en-CA"
                      )}
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
                      value={new Date(empData.dateHire).toLocaleDateString(
                        "en-CA"
                      )}
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
            {/* <Card>
              <Card.Body style={{ height: "10px", marginTop: "2px" }}>
                END
              </Card.Body>
            </Card> */}
            <FormGroup as={Row} className="mb-1"></FormGroup>
            <Button onClick={() => saveDetails()}>Save</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmpMasterFile;
