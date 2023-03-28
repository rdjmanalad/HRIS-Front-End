import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import PopUpMsg from "../ModalAlerts/PopUpMsg";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  FormSelect,
} from "react-bootstrap";

export const BankUploadReport = () => {
  const compCodeRef = useRef();
  const sdRef = useRef();
  const edRef = useRef();
  const sssRef = useRef();
  const pagibigRef = useRef();
  const philhealthRef = useRef();
  const spaRef = useRef();
  const [ccode, setCcode] = useState([]);
  var rptName = "";
  var rptType = "";
  var [showSPA, setShowSPA] = useState(false);
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
  const warn = new Map();

  useEffect(() => {
    getDropDown();
  }, []);

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  function validate() {
    var isOk = true;
    var msg = "";
    if (compCodeRef.current.value === "") {
      // alert("invalid company code");
      warn.set(1, "Invalid company code");
      msg = msg + "Invalid company code \n";
      isOk = false;
    }
    if (
      !(
        sssRef.current.checked ||
        pagibigRef.current.checked ||
        philhealthRef.current.checked
      )
    ) {
      isOk = false;
      // alert("Please Choose/Check Option box");
      warn.set(2, "Please choose a report type");
      msg = msg + "Please choose a report type";
    }
    if (sdRef.current.value === "") {
      // alert("Please choose a date");
      warn.set(3, "Please choose a date");
      msg = msg + "Please choose a date";
      isOk = false;
    }
    if (philhealthRef.current.checked) {
      if (spaRef.current.value.length < 15) {
        setMessage("SPA No. is less than 15 Characters");
        setShowMsg(true);
        isOk = false;
      }
    }
    if (isOk) {
      if (sssRef.current.checked) {
        rptName = "SSSBankUpload.jrxml";
        rptType = "SSS";
        proceed();
      }
      if (pagibigRef.current.checked) {
        rptName = "PagibigBankUpload.jrxml";
        rptType = "PAGIBIG";
        proceed();
      }
      if (philhealthRef.current.checked) {
        rptName = "PhilHealthBankUpload.jrxml";
        rptType = "PHILHEALTH";
        proceed();
      }
    } else {
      setMessage(
        warn.get(1) ? warn.get(1) : warn.get(2) ? warn.get(2) : warn.get(3)
      );
      setShowMsg(true);
    }
  }

  const showField = (e) => {
    setShowSPA(!showSPA);
  };

  const computeDates = (e) => {
    var date = e.target.value;
    var yr = new Date(date).getFullYear();
    var mn = new Date(date).getMonth();
    var lday = new Date(yr, mn + 1, 0);
    var fday = new Date(yr, mn, 1);
    sdRef.current.value = new Date(fday).toLocaleDateString("en-CA");
    edRef.current.value = new Date(lday).toLocaleDateString("en-CA");
  };

  const proceed = () => {
    var ccode = compCodeRef.current.value;
    var sDate = sdRef.current.value;
    var eDate = edRef.current.value;
    var spa = "SPA";
    if (showSPA) {
      spa = spaRef.current.value;
    }
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get(
        "http://localhost:8080/api/reports/bankUpload/" +
          ccode +
          "/" +
          sDate +
          "/" +
          eDate +
          "/" +
          rptName +
          "/" +
          rptType +
          "/" +
          spa,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        var w = window.open(window.URL.createObjectURL(file));
      })
      .catch((message) => {
        alert(message);
      });
  };

  const getDropDown = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get("http://localhost:8080/api/company/ccode")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setCcode(data);
      })
      .catch((message) => {
        alert(message);
      });
  };

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
              {/* <FormControl
                ref={compCodeRef}
                className="inpHeightXs"

              ></FormControl> */}
              <FormSelect
                className="dropDownList"
                style={{ padding: "0px 0px 0px 5px" }}
                ref={compCodeRef}
                autoFocus
              >
                <option></option>
                {ccode.map((o, i) => (
                  <option
                    value={ccode[i].substring(0, ccode[i].indexOf(","))}
                    key={ccode[i].substring(0, ccode[i].indexOf(","))}
                  >
                    {ccode[i].substring(0, ccode[i].indexOf(",")) +
                      " - " +
                      ccode[i].substring(ccode[i].indexOf(",") + 1)}
                  </option>
                ))}
              </FormSelect>
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
                type="Date"
                onBlur={(e) => computeDates(e)}
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
                type="Date"
                disabled
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
                style={{ paddingTop: "5px" }}
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
                style={{ paddingTop: "5px" }}
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
                style={{ paddingTop: "5px" }}
                onChange={(e) => showField(e)}
              ></Form.Check>
            </Col>
            <Col sm="4"></Col>
          </FormGroup>
          {showSPA && (
            <FormGroup as={Row}>
              <FormLabel column sm="4" className="noWrapText">
                SPA No.(15 Characters)
              </FormLabel>
              <Col>
                <FormControl
                  ref={spaRef}
                  className={"inpHeightXs"}
                ></FormControl>
              </Col>
            </FormGroup>
          )}
          <label className="separator"> </label>
        </Card.Body>
        <Card.Footer>
          <FormGroup as={Row}>
            <Col sm="8"></Col>
            <Col sm="3">
              <Button
                className="setButtonMargin"
                variant="success"
                onClick={() => validate()}
              >
                Proceed
              </Button>
            </Col>
          </FormGroup>
        </Card.Footer>
      </Card>
      {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
    </div>
  );
};
