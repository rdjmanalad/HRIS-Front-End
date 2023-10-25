import React, { useEffect, useState, useRef } from "react";
import PopUpMsg from "../ModalAlerts/PopUpMsg";
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
import ModalAddress from "./ModalAddress";
import { Typeahead } from "react-bootstrap-typeahead";
import useLocalState from "../Hooks/useLocalState";
import ImageUpload from "../OtherModal/ImageUpload";
import NoImage from "../../img/NoImage.png";
import UploadImage from "../../img/UploadImage.png";

function EmpMasterFile({ empData, detailsToEmp }) {
  const [masEmployee, setEmp] = useState([]);
  const [empNo, setEmpNo] = useState(false);
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [gender, setGender] = useState("");
  const [civilStat, setCivilStat] = useState("");
  const [workStat, setWorkStat] = useState("");
  const [selectedGen, setSelectedGen] = useState("");
  const [selectedCivil, setSelectedCivil] = useState("");
  const [selectedWS, setSelectedWS] = useState("");
  const [file, setFile] = useState("");
  const [imgTrigger, setImgTrigger] = useState(false);
  var [showImgUpload, setShowImgUpload] = useState(false);

  // var showImgUpload = true;

  const baseURL = localStorage.getItem("baseURL");

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
  const homeProvRef = useRef();

  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
  var [fileURL, setFileURL] = useState();
  var [fileOnly, setFileOnly] = useState();
  const [tag, setTag] = useState("H");

  const [lsGender, setlsGender] = useLocalState("lsGender", []);
  const [lsCivil, setlsCivil] = useLocalState("lsCivil", []);
  const [lsWorkS, setlsWorkS] = useLocalState("lsWorkS", []);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getGender();
    getCivil();
    getWS();
  }, []);

  useEffect(() => {
    setEmp(empData);
  });

  useEffect(() => {
    setImgTrigger(true);
  }, [file]);

  useEffect(() => {
    setValues();
  }, [masEmployee]);

  const handleClose = () => {
    setShow(false);
  };

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  const closeAddress1 = (cl) => {
    setShowAddress(false);
  };

  const closeUpload = (fl, fo) => {
    if (fl) {
      setFile(fl);
      setFileOnly(fo);
    }
    setShowImgUpload(false);
  };

  const setAddr = (adr) => {
    // setAddress(adr);
    if (tag === "H") {
      addressRef.current.value = adr;
    } else if (tag === "P") {
      paddressRef.current.value = adr;
    } else {
      caddressRef.current.value = adr;
    }
    setShowAddress(false);
  };

  const checkFirst = () => {
    var isOk = true;
    if (
      masEmployee.lastName === "" ||
      masEmployee.firstName === "" ||
      masEmployee.middleName === ""
    ) {
      setMessage("Full Name Required");
      setShowMsg(true);
      isOk = false;
    }
    if (masEmployee.birthday === "") {
      masEmployee.birthday = new Date().toLocaleDateString("en-CA");
    }
    if (isOk) {
      saveDetails();
    }
  };

  function saveDetails() {
    // console.log(masEmployee);
    masEmployee.address = addressRef.current.value;
    masEmployee.paddress = paddressRef.current.value;
    masEmployee.caddress = caddressRef.current.value;
    setEmpNo(empData.employeeNo);
    // if (empNo.length > 0) {
    axios
      .post(baseURL + "/api/masemployeeSave", masEmployee, {
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
          empData.employeeNo = response.data;
          detailsToEmp(empData);
          setMessage("Data Saved");
          setShowMsg(true);
          if (imgTrigger) {
            saveImage(response.data);
          }
        }
      })
      .catch((message) => {
        alert(message);
      });
  }

  function saveImage(name) {
    const newName = name + ".png";
    const formData = new FormData();
    formData.append("file", fileOnly[0]);
    formData.append("name", newName);
    axios
      .post(baseURL + "/api/masemployee/image/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          if (!response.data === "success") {
            alert(response.data);
          } else {
            setMessage("Data Saved");
            setShowMsg(true);
          }
          setImgTrigger(false);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const getGender = () => {
    var name = "GENDER";
    var stat = true;
    axios
      .get(baseURL + "/api/reference/name/" + name + "/" + stat, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setlsGender(JSON.stringify(data));
      });
  };

  const getCivil = () => {
    var name = "CIVIL STATUS";
    var stat = true;
    axios
      .get(baseURL + "/api/reference/name/" + name + "/" + stat, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setlsCivil(JSON.stringify(data));
      });
  };

  function getImage(empno) {
    const filename = empno + ".png";
    axios
      .get(baseURL + "/api/masemployee/getImage/" + filename, {
        headers: {
          contentType: "application/json",
          accept: "application/pdf",
        },
        responseType: "blob",
      })
      .then((response) => {
        if (response.status === 200) {
          const empImage = URL.createObjectURL(response.data);
          setFile(empImage);
        }
      })
      .catch((message) => {
        setFile(UploadImage);
        // alert(message);
      });
  }

  function newDetails() {
    window.location.reload(false);
    clearDetails();
    setEmp(empData);
  }

  const getWS = () => {
    var name = "WORK STATUS";
    var stat = true;
    axios
      .get(baseURL + "/api/reference/name/" + name + "/" + stat, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        // setWorkStat(data);
        setlsWorkS(JSON.stringify(data));
      });
  };

  function newDetails() {
    window.location.reload(false);
    clearDetails();
    setEmp(empData);
  }

  function editDetails() {}

  const setValues = () => {
    var lsg = JSON.parse(localStorage.getItem("lsGender"));
    var lsc = JSON.parse(localStorage.getItem("lsCivil"));
    var lsw = JSON.parse(localStorage.getItem("lsWorkS"));
    setGender(lsg);
    setCivilStat(lsc);
    setWorkStat(lsw);
    cphoneRef.current.value = "";
    if (masEmployee.length !== 0) {
      addressRef.current.value = masEmployee.address;
      paddressRef.current.value = masEmployee.paddress;
      phoneRef.current.value = masEmployee.phone;
      cpersonRef.current.value = masEmployee.cperson;
      caddressRef.current.value = masEmployee.caddress;
      cphoneRef.current.value = masEmployee.cphone ? masEmployee.cphone : "";
      // genderRef.current.value = masEmployee.gender;
      if (masEmployee.gender != "") {
        for (var i = 0; i < gender.length; i++) {
          if (gender[i].code === masEmployee.gender) {
            setSelectedGen([gender[i]]);
          }
        }
      } else {
        genderRef.current.clear();
      }
      birthdayRef.current.value = new Date(
        masEmployee.birthday
      ).toLocaleDateString("en-CA");
      ageRef.current.value = masEmployee.age;
      civilRef.current.value = masEmployee.civil;
      if (masEmployee.civil != "") {
        for (var i = 0; i < civilStat.length; i++) {
          if (civilStat[i].code === masEmployee.civil) {
            setSelectedCivil([civilStat[i]]);
          }
        }
      } else {
        civilRef.current.clear();
      }
      spouseRef.current.value = masEmployee.spouse;
      hireDateRef.current.value = new Date(
        masEmployee.dateHire
      ).toLocaleDateString("en-CA");
      workStatusRef.current.value = masEmployee.workStatus;
      if (masEmployee.workStatus != "") {
        for (var i = 0; i < workStat.length; i++) {
          // alert(workStat.length);
          if (workStat[i].code === masEmployee.workStatus) {
            setSelectedWS([workStat[i]]);
          }
        }
      } else {
        workStatusRef.current.clear();
      }
      dateRegularRef.current.value = new Date(
        masEmployee.dateRegular
      ).toLocaleDateString("en-CA");
      leaveRef.current.checked = masEmployee.onLeave === 1 ? true : false;
      atmnoRef.current.value = masEmployee.atmno;
      sssnoRef.current.value = masEmployee.sssno;
      tinnoRef.current.value = masEmployee.tinno;
      pagibigNoRef.current.value = masEmployee.pagibigNo;
      philhealthNoRef.current.value = masEmployee.philhealthNo;
      calcAge(new Date(masEmployee.birthday));
      getImage(masEmployee.employeeNo);
    }

    ageRef.current.value = isNaN(ageRef.current.value)
      ? (ageRef.current.value = "")
      : ageRef.current.value;
  };

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
    empData.onLeave = "";
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
    empData.image_file = "";
  }

  const checkToggle = (e) => {
    e.target.checked ? (empData.onLeave = 1) : (empData.onLeave = 0);
  };

  const checkToggleHomeProv = (e) => {
    e.target.checked ? setSameAddress(true) : setSameAddress(false);
  };

  useEffect(() => {
    if (sameAddress) {
      paddressRef.current.value = addressRef.current.value;
    } else {
      paddressRef.current.value = empData.paddress;
    }
  }, [sameAddress]);

  const setHomeAdd = () => {
    setTag("H");
    setShowAddress(true);
    // handleShow();
  };

  const setProvAdd = () => {
    setTag("P");
    setShowAddress(true);
    // handleShow();
  };

  const setContAdd = () => {
    setTag("C");
    setShowAddress(true);
    // handleShow();
  };

  const handleInputChange = (event, ref) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^0-9-]/g, "");
    setInputValue(sanitizedValue);
    event.target.value = sanitizedValue;
    if (ref === "atm") {
      empData.atmno = event.target.value;
    } else if (ref === "sss") {
      empData.sssno = event.target.value;
    } else if (ref === "tin") {
      empData.tinno = event.target.value;
    } else if (ref === "pag") {
      empData.pagibigNo = event.target.value;
    } else if (ref === "plh") {
      empData.philhealthNo = event.target.value;
    }
    //
  };

  const calculateAge = (e) => {
    empData.birthday = new Date(e.target.value).toLocaleDateString("en-CA");

    calcAge(new Date(e.target.value));
  };

  const calcAge = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    ageRef.current.value = age_now;
    // return age_now;
  };

  const numbersOnly = (value) => {
    return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  };

  const genderChange = (selected) => {
    if (selected.length > 0) {
      empData.gender = selected[0].code;
    }
    setSelectedGen(selected);
  };

  const genderClick = () => {
    genderRef.current?.clear();
    setSelectedGen("");
  };

  const civilChange = (selected) => {
    if (selected.length > 0) {
      empData.civil = selected[0].code;
    }
    setSelectedCivil(selected);
  };

  const civilClick = () => {
    civilRef.current?.clear();
    setSelectedCivil("");
  };

  const wsChange = (selected) => {
    if (selected.length > 0) {
      empData.workStatus = selected[0].code;
    }
    setSelectedWS(selected);
  };

  const wsClick = () => {
    workStatusRef.current?.clear();
    setSelectedWS("");
  };

  const handleSelect = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const callUpload = () => {
    setShowImgUpload(true);
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
                      style={{ textTransform: "uppercase" }}
                      maxLength="250"
                      className="inpHeightXs"
                      onClick={() => setHomeAdd()}
                      onChange={(event) =>
                        (empData.address = event.target.value)
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
                      maxLength="11"
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = numbersOnly(value);
                        empData.phone = event.target.value;
                      }}
                      // onChange={(event) => (empData.phone = event.target.value)}
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="3" className="noWrapText">
                    Home Same with Prov Address
                  </FormLabel>
                  <Col sm="1">
                    <Form.Check
                      ref={homeProvRef}
                      style={{ paddingTop: "5px" }}
                      onChange={(event) => checkToggleHomeProv(event)}
                      // onSelect={(event) => (empData.leave = 1)}
                    ></Form.Check>
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
                      maxLength="250"
                      style={{ textTransform: "uppercase" }}
                      onClick={() => setProvAdd()}
                      onChange={(event) =>
                        (empData.paddress = event.target.value)
                      }
                    ></FormControl>
                  </Col>
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
                      style={{ textTransform: "uppercase" }}
                      maxLength="40"
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
                      maxLength="11"
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = numbersOnly(value);
                        empData.cphone = event.target.value;
                      }}
                      // onChange={(event) =>
                      //   (empData.cphone = event.target.value)
                      // }
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
                      onClick={() => setContAdd()}
                      style={{ textTransform: "uppercase" }}
                      maxLength="250"
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
                  {/* <Col sm="2">
                    <FormControl
                      ref={genderRef}
                      className={"inpHeightXs"}
                      style={{ textTransform: "uppercase" }}
                      onChange={(event) =>
                        (empData.gender = event.target.value)
                      }
                    ></FormControl>
                  </Col> */}
                  <Col sm="3">
                    <Typeahead
                      style={{
                        textTransform: "uppercase",
                      }}
                      className="dropDownList2"
                      labelKey={(option) => `${option.name}`.toUpperCase()}
                      id="genderId"
                      onChange={genderChange}
                      options={!gender ? [] : gender}
                      selected={selectedGen}
                      placeholder={"Choose Gender"}
                      ref={genderRef}
                      onFocus={genderClick}
                    />
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Birthdate
                  </FormLabel>
                  <Col sm="3">
                    <FormControl
                      ref={birthdayRef}
                      className={"inpHeightXs"}
                      type="date"
                      onChange={(event) => calculateAge(event)}
                    ></FormControl>
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Age
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={ageRef}
                      disabled
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
                  {/* <Col sm="2">
                    <FormControl
                      ref={civilRef}
                      className={"inpHeightXs"}
                      style={{ textTransform: "uppercase" }}
                      // defaultValue={empData.civil}
                      onChange={(event) => (empData.civil = event.target.value)}
                    ></FormControl>
                  </Col> */}
                  <Col sm="3">
                    <Typeahead
                      style={{
                        textTransform: "uppercase",
                      }}
                      className="dropDownList2"
                      labelKey={(option) => `${option.name}`.toUpperCase()}
                      id="csId"
                      onChange={civilChange}
                      options={!civilStat ? [] : civilStat}
                      selected={selectedCivil}
                      placeholder={"Choose Civil Stat.."}
                      ref={civilRef}
                      onFocus={civilClick}
                    />
                  </Col>
                  <FormLabel column sm="1" className="noWrapText">
                    Spouse
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={spouseRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.spouse}
                      style={{ textTransform: "uppercase" }}
                      maxLength="50"
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
                  <Col sm="3">
                    <FormControl
                      ref={hireDateRef}
                      className={"inpHeightXs"}
                      type="Date"
                      onChange={(event) =>
                        (empData.dateHire = new Date(
                          event.target.value
                        ).toLocaleDateString("en-CA"))
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
                  <Col sm="3">
                    <FormControl
                      ref={dateRegularRef}
                      className={"inpHeightXs"}
                      type="Date"
                      onChange={(event) =>
                        (empData.dateRegular = new Date(
                          event.target.value
                        ).toLocaleDateString("en-CA"))
                      }
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
                  {/* <Col>
                    <FormControl
                      ref={workStatusRef}
                      className={"inpHeightXs"}
                      // defaultValue={empData.workStatus}
                      onChange={(event) =>
                        (empData.workStatus = event.target.value)
                      }
                    ></FormControl>
                  </Col> */}
                  <Col>
                    <Typeahead
                      style={{
                        textTransform: "uppercase",
                      }}
                      className="dropDownList2"
                      labelKey={(option) => `${option.name}`.toUpperCase()}
                      id="wsId"
                      onChange={wsChange}
                      options={!workStat ? [] : workStat}
                      selected={selectedWS}
                      placeholder={"Choose Work Stat.."}
                      ref={workStatusRef}
                      onFocus={wsClick}
                    />
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
                    <div style={{ marginTop: "6px" }}>
                      <div
                        className={("borderWhite", "imageSize2")}
                        onClick={() => callUpload()}
                        style={{ display: "flex", margin: "auto" }}
                      >
                        <Image
                          fluid
                          src={file}
                          alt="Missing Image"
                          className={"imageSize3"}
                        ></Image>
                      </div>
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
                      maxLength="15"
                      onChange={(event) => handleInputChange(event, "atm")}
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
                      maxLength="15"
                      onChange={(event) => handleInputChange(event, "sss")}
                      // onChange={(event) => (empData.sssno = event.target.value)}
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
                      maxLength="15"
                      onChange={(event) => handleInputChange(event, "tin")}
                      // onChange={(event) => (empData.tinno = event.target.value)}
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
                      maxLength="15"
                      onChange={(event) => handleInputChange(event, "pag")}
                      // onChange={(event) =>
                      //   (empData.pagibigNo = event.target.value)
                      // }
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
                      maxLength="15"
                      onChange={(event) => handleInputChange(event, "plh")}
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
                width: "100px",
                marginTop: "0px",
                marginRight: "5px",
              }}
              onClick={() => newDetails()}
            >
              New/Refresh
            </Button>

            <Button
              // className="setButtonMargin2"
              className="btn btn-success btn-md "
              style={{ width: "80px", marginTop: "0px" }}
              onClick={() => checkFirst()}
            >
              Save
            </Button>
          </div>
        </Card.Footer>
      </Card>

      {showImgUpload && (
        <ImageUpload closeUpload={closeUpload} fileURL={fileURL}></ImageUpload>
      )}
      {showAddress && (
        <ModalAddress
          closeAddress={closeAddress1}
          address={address}
          setAddr={setAddr}
        ></ModalAddress>
      )}
      {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
    </div>
  );
}

export default EmpMasterFile;
