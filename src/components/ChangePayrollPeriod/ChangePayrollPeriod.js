import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useEffect } from "react";
import useLocalState from "../Hooks/useLocalState";

export const ChangePayrollPeriod = () => {
  const [datep, setDatep] = useState(new Date());
  const [latestPeriod, setLatestPeriod] = useState("");
  const [payPeriodFrom, setPayPeriodFrom] = useLocalState("PPFrom", "");
  const [payPeriodTo, setPayPeriodTo] = useLocalState("PPTo", "");
  const [filerValue, setFilterValue] = useLocalState("FilterValue", "");

  const payPeriodFromRef = useRef();
  const payPeriodToRef = useRef();
  const cutPeriodFromRef = useRef();
  const cutPeriodToRef = useRef();
  const actualNumDaysCodeRef = useRef();
  const transpoRateRef = useRef();
  const unionDueRateRef = useRef();
  const yearEndTaxAdjRef = useRef();
  const collectPeriodRef = useRef();
  const bonus13thRef = useRef();
  const sample = useRef();
  const filterValueRef = useRef();

  var setArray = {
    id: "",
    userID: "",
    period1: "",
    period2: "",
    cutPeriod1: "",
    cutPeriod2: "",
    actualNOD: "",
    transportationRate: "",
    unionDues: "",
    yearEndTaxAdj: "",
    ctp: "",
    bonus13: "",
  };

  const saveData = () => {
    setPayPeriodFrom(payPeriodFromRef.current.value);
    setFilterValue(filterValueRef.current.value);
    setPayPeriodTo(payPeriodToRef.current.value);
    alert("SAVED");
    //putData();
    // console.log(setArray);
    //savePeriod();
  };

  var month = 0;
  var year = 0;
  var sDay = 0;
  var eDay = 0;
  var periodTo = "";
  var cpYear = "";
  var cpMonth = "";
  // var cptYear = "";
  // var cptMonth = "";
  // var d = new Date(2009, month + 1, 0);
  var toggle = true;

  useEffect(() => {
    if (toggle) {
      getLatestperiod();
      if (latestPeriod) {
        computeDates2(new Date(latestPeriod).toLocaleDateString("en-CA"));
      }
    }
    toggle = false;
  }, [latestPeriod]);

  useEffect(() => {}, []);

  function savePeriod() {
    axios
      .post("http://localhost:8080/api/period/save", setArray, {
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Save Success!");
        }
      });
  }

  const getLatestperiod = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get("http://localhost:8080/api/period/latest")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setLatestPeriod(data);
        payPeriodFromRef.current.value = new Date(
          latestPeriod
        )?.toLocaleDateString("en-CA");
      })
      .catch((message) => {
        alert(message);
      });
  };

  var computeEndDay = (y, m) => {
    return new Date(y, m, 0);
  };

  var addPadZero = (m) => {
    return m.length > 1 ? m : "0" + m;
  };

  var computeStartCutPeriod = () => {
    if (sDay === "01") {
      if (month === "01") {
        cpMonth = "12";
        cpYear = year - 1;
        return cpYear + "-" + addPadZero(cpMonth) + "-" + "16";
      } else {
        cpMonth = month - 1;
        cpYear = year;
        return cpYear + "-" + addPadZero(cpMonth) + "-" + "16";
      }
    } else {
      cpMonth = month;
      cpYear = year;
      return cpYear + "-" + addPadZero(cpMonth) + "-" + "01";
    }
  };

  var computeEndCutPeriod = () => {
    if (sDay === "01") {
      return (
        cpYear +
        "-" +
        addPadZero(cpMonth) +
        "-" +
        String(computeEndDay(cpYear, cpMonth)).substring(8, 10)
      );
    } else {
      return cpYear + "-" + addPadZero(cpMonth) + "-" + "15";
    }
  };

  const computeDates = (e) => {
    var date = e.target.value;
    sDay = date.substr(8);
    month = date.substring(5, 7);
    year = date.substring(0, 4);
    actualNumDaysCodeRef.current.value = 13;
    collectPeriodRef.current.value = "Y";
    eDay = String(computeEndDay(year, month)).substring(8, 10);
    if (sDay === "01") {
      periodTo = year + "-" + month + "-" + "15";
      payPeriodToRef.current.value = periodTo;
      cutPeriodFromRef.current.value = computeStartCutPeriod();
      cutPeriodToRef.current.value = computeEndCutPeriod();
      // actualNumDaysCodeRef.current.value = "15";
    } else if (sDay === "16") {
      periodTo = year + "-" + month + "-" + eDay;
      payPeriodToRef.current.value = periodTo;
      cutPeriodFromRef.current.value = computeStartCutPeriod();
      cutPeriodToRef.current.value = computeEndCutPeriod();
      // actualNumDaysCodeRef.current.value = eDay - 15;
    } else {
      alert("invalid period");
      payPeriodFromRef.current.value = "";
      payPeriodToRef.current.value = "";
      cutPeriodFromRef.current.value = "";
      cutPeriodToRef.current.value = "";
      // actualNumDaysCodeRef.current.value = "";
    }
  };

  const computeDates2 = (date) => {
    // alert(date);
    if (date) {
      sDay = date.substr(8);
      month = date.substring(5, 7);
      year = date.substring(0, 4);
      eDay = String(computeEndDay(year, month)).substring(8, 10);
      actualNumDaysCodeRef.current.value = 13;
      collectPeriodRef.current.value = "Y";
      if (sDay === "01") {
        periodTo = year + "-" + month + "-" + "15";
        payPeriodToRef.current.value = periodTo;
        cutPeriodFromRef.current.value = computeStartCutPeriod();
        cutPeriodToRef.current.value = computeEndCutPeriod();
        // actualNumDaysCodeRef.current.value = "15";
      } else if (sDay === "16") {
        periodTo = year + "-" + month + "-" + eDay;
        payPeriodToRef.current.value = periodTo;
        cutPeriodFromRef.current.value = computeStartCutPeriod();
        cutPeriodToRef.current.value = computeEndCutPeriod();
        // actualNumDaysCodeRef.current.value = eDay - 15;
      } else {
        alert("invalid period!");
        payPeriodFromRef.current.value = "";
        payPeriodToRef.current.value = "";
        cutPeriodFromRef.current.value = "";
        cutPeriodToRef.current.value = "";
      }
      // setDate(new Date(date));
    }
  };

  const putData = (date) => {
    // alert(localStorage.getItem("userId"));
    // alert(latestPeriod.id);
    setArray.id = 0;
    setArray.userID = localStorage.getItem("userId");
    setArray.period1 = payPeriodFromRef.current.value;
    setArray.period2 = payPeriodToRef.current.value;
    setArray.cutPeriod1 = cutPeriodFromRef.current.value;
    setArray.cutPeriod2 = cutPeriodToRef.current.value;
    setArray.actualNOD = actualNumDaysCodeRef.current.value;
    setArray.transportationRate = 0;
    setArray.unionDues = 0;
    setArray.yearEndTaxAdj = 0;
    setArray.ctp = collectPeriodRef.current.value;
    setArray.bonus13 = bonus13thRef.current.checked ? 1 : 0;
  };

  const checkToggle = (e) => {
    e.target.checked
      ? (setArray.bonus13thRef = 1)
      : (setArray.bonus13thRef = 0);
  };

  // const setDate = (e) => {
  //   setDatep(e);
  //   computeDates3(e);
  // };

  // const computeDates3 = (date) => {
  //   alert(date);
  // };

  return (
    <div
      style={{
        marginTop: "15px",
        marginBottom: "10px",
        paddingBottom: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ width: "55rem" }}
      >
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            PRESENT PAYROLL PERIOD
          </label>
          <label className="separator"></label>
          <FormGroup as={Row}>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Payroll Period From
                </FormLabel>
                <Col>
                  <FormControl
                    ref={payPeriodFromRef}
                    className="inpHeightXs"
                    type="date"
                    format="MM/dd/yyyy"
                    onChange={(e) => computeDates(e)}
                  ></FormControl>
                  {/* <input
                    ref={payPeriodFromRef}
                    className="inpHeightXs"
                    type="date"
                    onChange={(e) => computeDates(e)}
                  ></input> */}
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Cut-off Period From
                </FormLabel>
                <Col>
                  <FormControl
                    ref={cutPeriodFromRef}
                    className="inpHeightXs"
                    type="Date"
                    disabled
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
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
                <FormLabel column sm="4" className="noWrapText">
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
                <FormLabel column sm="4" className="noWrapText">
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
                <FormLabel column sm="4" className="noWrapText">
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
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Bonus / 13th Month Rate
                </FormLabel>
                <Col>
                  <Form.Check
                    ref={bonus13thRef}
                    style={{ paddingTop: "5px" }}
                    onChange={(event) => checkToggle(event)}
                  ></Form.Check>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* <FormGroup as={Col} xs="1"></FormGroup> */}
            <FormGroup as={Col} sm="5">
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="1">
                  To
                </FormLabel>
                <Col sm="">
                  <FormControl
                    ref={payPeriodToRef}
                    className="inpHeightXs"
                    type="Date"
                    disabled
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="1">
                  To
                </FormLabel>
                <Col>
                  <FormControl
                    ref={cutPeriodToRef}
                    className="inpHeightXs"
                    type="Date"
                    disabled
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row} style={{ height: "95px" }}>
                <FormLabel sm="1"> </FormLabel>
              </FormGroup>
              <FormGroup as={Row} style={{ height: "25px" }}>
                <FormLabel column className="noWrapText" sm="5">
                  Collect this Period
                </FormLabel>
                <Col>
                  <FormControl
                    ref={collectPeriodRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              {/* <ReactDatePicker
                selected={datep}
                dateFormat="MM/dd/yyyy"
                ref={sample}
                // placeholderText="mm/dd/yyyy"
                onChange={(e) => setDate(e)}
              ></ReactDatePicker> */}
            </FormGroup>
          </FormGroup>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            FILTER RECORDS
          </label>
          <FormGroup as={Row}>
            <Col sm="4"></Col>
            <FormLabel column className="noWrapText" sm="2">
              Filter Actual Group
            </FormLabel>
            <Col sm="2">
              <FormControl
                ref={filterValueRef}
                defaultValue={""}
                placeholder="Group..."
                className="inpHeightXs"
              ></FormControl>
            </Col>
            <Col sm="3"></Col>
          </FormGroup>
          <label className="separator"></label>
        </Card.Body>
        <Card.Footer>
          <div style={{ display: "flex" }}>
            <button
              type="submit"
              className="btn btn-success btn-md buttonRight"
              style={{ width: "80px", marginTop: "0px" }}
              onClick={() => saveData()}
            >
              Save
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
