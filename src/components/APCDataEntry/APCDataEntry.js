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
  FormSelect,
} from "react-bootstrap";

export const APCDataEntry = () => {
  const [gcode, setGcode] = useState([]);

  const actGroupCodeRef = useRef();
  const bpiBranchCodeRef = useRef();
  const tranDateRef = useRef();
  const compAcctNoRef = useRef();
  const compCodeRef = useRef();
  const batchNoRef = useRef();
  var [showSPA, setShowSPA] = useState(false);
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
  var warn = new Map();
  const [apc, setA] = useState({});

  const setAPC = {
    aGroupCode: "",
    bpiBCode: "",
    transDate: "",
    compAcctNo: "",
    compCode: "",
    batchNo: "",
  };

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  useEffect(() => {
    getDropDown();
  }, []);

  const validate = () => {
    setAPC.aGroupCode = actGroupCodeRef.current.value;
    setAPC.bpiBCode = bpiBranchCodeRef.current.value;
    setAPC.transDate = tranDateRef.current.value;
    setAPC.compAcctNo = compAcctNoRef.current.value;
    setAPC.compCode = compCodeRef.current.value;
    setAPC.batchNo = batchNoRef.current.value;
    var isOk = true;
    if (setAPC.aGroupCode === "") {
      isOk = false;
      warn.set(1, "Please Choose a Group Code");
    }
    if (setAPC.bpiBCode === "") {
      isOk = false;
      warn.set(2, "Please Fill BPI Branch Code");
    }
    if (setAPC.transDate === "") {
      isOk = false;
      warn.set(3, "Please Choose/Fill Transaction Date");
    }
    if (setAPC.compAcctNo === "") {
      isOk = false;
      warn.set(4, "Please Fill Company Account No.");
    }
    if (setAPC.compCode === "") {
      isOk = false;
      warn.set(5, "Please Fill Company Code");
    }
    if (setAPC.batchNo === "") {
      isOk = false;
      warn.set(6, "Please Fill Batch No.");
    }
    if (isOk) {
      print();
    } else {
      setMessage(
        warn.get(1)
          ? warn.get(1)
          : warn.get(2)
          ? warn.get(2)
          : warn.get(3)
          ? warn.get(3)
          : warn.get(4)
          ? warn.get(4)
          : warn.get(5)
          ? warn.get(5)
          : warn.get(6)
      );
      setShowMsg(true);
    }
  };

  const proceed = () => {
    validate();
  };

  const print = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get(
        "http://localhost:8080/api/reports/apc/" +
          setAPC.aGroupCode +
          "/" +
          setAPC.bpiBCode +
          "/" +
          setAPC.transDate +
          "/" +
          setAPC.compAcctNo +
          "/" +
          setAPC.compCode +
          "/" +
          setAPC.batchNo,
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
      .get("http://localhost:8080/api/group1/gcode")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setGcode(data);
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
            APC DATA ENTRY
          </label>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Actual Group Code
            </FormLabel>
            <Col>
              <FormSelect
                className="dropDownList"
                style={{ padding: "0px 0px 0px 5px" }}
                autoFocus
                ref={actGroupCodeRef}
                onChange={(event) => (setAPC.aGroupCode = event.target.value)}
              >
                <option></option>
                {gcode.map((code) => (
                  <option value={code.groupCode} key={code.groupCode}>
                    {code.groupCode} - {code.groupName}
                  </option>
                ))}
              </FormSelect>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              BPI Branch Code
            </FormLabel>
            <Col>
              <FormControl
                ref={bpiBranchCodeRef}
                className="inpHeightXs"
                onChange={(event) => (setAPC.bpiBCode = event.target.value)}
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Transaction Date
            </FormLabel>
            <Col>
              <FormControl
                ref={tranDateRef}
                className="inpHeightXs"
                type="Date"
                onChange={(event) => (setAPC.transDate = event.target.value)}
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Company Account No.
            </FormLabel>
            <Col>
              <FormControl
                ref={compAcctNoRef}
                className="inpHeightXs"
                onChange={(event) => (setAPC.compAcctNo = event.target.value)}
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Company Code
            </FormLabel>
            <Col>
              <FormControl
                ref={compCodeRef}
                className="inpHeightXs"
                onChange={(event) => (setAPC.compCode = event.target.value)}
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Batch No.
            </FormLabel>
            <Col>
              <FormControl
                ref={batchNoRef}
                className="inpHeightXs"
                onChange={(event) => (setAPC.batchNo = event.target.value)}
              ></FormControl>
            </Col>
          </FormGroup>
        </Card.Body>
        <Card.Footer>
          <FormGroup as={Row}>
            <Col sm="8"></Col>
            <Col sm="4">
              <Button
                className="setButtonMargin"
                variant="success"
                onClick={() => proceed()}
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
