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
  const [masEmployee, setEmp] = useState([]);
  const [empNo, setEmpNo] = useState(false);
  const [address, setAddress] = useState("");

  const addressRef = useRef();
  const paddressRef = useRef();
  const phoneRef = useRef();
  const cpersonRef = useRef();
  const caddressRef = useRef();
  const genderRef = useRef();
  const birthdayRef =  useRef();
  const ageRef = useRef();
  const civilRef = useRef();
  const spouseRef = useRef();
  const hireDateRef = useRef();
  const workStatusRef = useRef();
  const dateRegularRef = useRef();
  const leaveRef =useRef();
  const atmnoRef = useRef();
  const sssnoRef = useRef();
  const tinnoRef = useRef();
  const pagibigNoRef = useRef();
  const philhealthNoRef = useRef();



  useEffect(() => {
    // alert("useEffect here");
    setAddress(empData.address);
  
    setEmp(empData);
  });

  function refreshPage(){
    alert("refresh");
  }

  function saveDetails() {
    setEmpNo(empData.employeeNo);
    alert(empData.firstName);
    

    // if (!empNo) {
      alert("empnoxxx :"+empNo)
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
        alert(response.status);
        // setData(response.data);
        // console.log(response.data);
      });
  //   } else {
  //     alert("empno :"+empNo)
  //     axios
  //     .put("http://localhost:8080/api/masemployeeSave"+ empNo, MasEmployee, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer " +
  //           localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
  //       },
  //     })
  //     .then((response) => {
  //       alert(response.status);
  //       // setData(response.data);
  //       // console.log(response.data);
  //     });
  // }
  }
  function newDetails(){
    // window.location.reload(false);
    clearDetails();
    setEmp(empData);

  }

  function editDetails(){

  }

  function deleteDetails(){

  }
  useEffect(() => {
    // alert(masEmployee.length);
    if(masEmployee.length!==0){
      addressRef.current.value=masEmployee.address;
      paddressRef.current.value=masEmployee.paddress;
      phoneRef.current.value=masEmployee.phone;
      cpersonRef.current.value=masEmployee.cperson;
      caddressRef.current.value=masEmployee.caddress;
      genderRef.current.value=masEmployee.gender;
      birthdayRef.current.value=new Date(masEmployee.birthday).toLocaleDateString("en-CA");
      ageRef.current.value=masEmployee.age;
      civilRef.current.value=masEmployee.civil;
      spouseRef.current.value=masEmployee.spouse;
      hireDateRef.current.value=new Date(masEmployee.dateHire).toLocaleDateString("en-CA");
      workStatusRef.current.value=masEmployee.workStatus
      dateRegularRef.current.value=new Date(masEmployee.dateRegular).toLocaleDateString("en-CA");
      leaveRef.current.value=masEmployee.leave;
      atmnoRef.current.value=masEmployee.atmno;
      sssnoRef.current.value=masEmployee.sssno;
      tinnoRef.current.value=masEmployee.tinno;
      pagibigNoRef.current.value=masEmployee.pagibigNo;
      philhealthNoRef.current.value=masEmployee.philhealthNo;
    }
    // addressRef.current.dafaultValue=masEmployee.address;
  }, [masEmployee]);

  function clearDetails(){
    addressRef.current.value = "";

    empData.abranchCode= null; 
    empData.acompanyCode= null; 
    empData.address= null; 
    empData.age= null;
    empData.agroupCode = null; 
    empData.alowance1= null;
    empData.allowance2= null;
    empData.atmno= null;
    empData.basicPay=null;
    empData.birthday=null;
    empData.board=null; 
    empData.caddress= null; 
    empData.civil= null; 
    empData.cola= null;
    empData.cperson= null;
    empData.datehire= null;
    empData.employeeNo= "";
    empData.exemption= null;
    empData.firstName=null;
    empData.gender= null;
    empData.lastName= null;
    empData.leave= false;
    empData.middleName = null;
    empData.obranchCode= null;
    empData.ocompanyCode= null;
    empData.ogroupCode=null;
    empData.paddress=null;
		empData.pagibigNo= null;
    empData.philhealthNo= null;
    empData.phone= null;
    empData.presentLeave= null;
    empData.previousLeave= null;
    empData.rank= null;
    empData.remarks= null;
    empData.resigned= null;
    empData.schedIn= null;
    empData.schedOut= null;
    empData.spouse= null;
		empData.sssno= null;
    empData.taxCode= null;
    empData.tinno= null;
    empData.transportation= null;
    empData.unionName= null;
    empData.waverage=null;
    empData.workPosition= null;
    empData.workStatus= null;
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
                  <FormLabel column sm="2" className="noWrapText" >
                    Home Address
                  </FormLabel>
                  <Col>
                    <FormControl
                      // defaultValue={empData.address}
                      ref={addressRef}
                      // defaultValue={address}
                      className="inpHeightXs"
                      onChange={(event) =>
                        (address = event.target.value)
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
                <label className="asHeader" style={{ "padding-left": "10px" }}>
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
                    <FormControl className={"inpHeightXs"}></FormControl>
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
                <label className="asHeader" style={{ "padding-left": "10px" }}>
                  Employee Information
                </label>
                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Gender
                  </FormLabel>
                  <Col column sm="2">
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
                        (empData.birthday = new Date(event.target.value).toLocaleDateString("en-CA"))
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
                      onChange={(event) =>
                        (empData.age = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Civil Status
                  </FormLabel>
                  <Col column sm="2">
                    <FormControl
                      ref={civilRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.civil}
                      onChange={(event) =>
                        (empData.civil = event.target.value)
                      }
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
                    style={{ "padding-left": "0px" }}
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
                    style={{ "padding-left": "0px" }}
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
                      style={{ "padding-top": "5px" }}
                      // defaultValue={empData.leave}
                      onChange={(event) =>
                        (empData.leave = event.target.value)
                      }
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
                      ref={atmnoRef}
                      className={"inpHeightXs"}
                      defaultValue={empData.atmno}
                      onChange={(event) =>
                        (empData.atmno = event.target.value)
                      }
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
                      defaultValue={empData.sssno}
                      onChange={(event) =>
                        (empData.sssno = event.target.value)
                      }
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
                      defaultValue={empData.tinno}
                      onChange={(event) =>
                        (empData.tinno = event.target.value)
                      }
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
                      dafaultValue={empData.pagibigNo}
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
                      defaultValue={empData.philhealthNo}
                      onChange={(event) =>
                        (empData.philhealthNo = event.target.value)
                      }
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
            <FormGroup as={Row} className="mb-1" style={{marginTop:"8px"}}>
              <Col sm="6">
            <Button className="setButtonMargin" variant="success" onClick={() => newDetails()}>New</Button>
            <Button className="setButtonMargin" variant="warning" onClick={() => editDetails()}>Edit</Button>
            <Button className="setButtonMargin" variant="danger" onClick={() => deleteDetails()}>Remove</Button>
            </Col>
            <Col sm="2"></Col>
            <Col>
            <Button className="setButtonMargin2" onClick={() => saveDetails()}>Save</Button>
            </Col>
            </FormGroup>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmpMasterFile;
