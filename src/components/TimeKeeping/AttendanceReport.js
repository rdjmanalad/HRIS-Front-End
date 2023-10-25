import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DropSelect } from "../SelectionDropdown/DropSelect";
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
  const [branch, setBranch] = useState([]);
  const [branches, setBranches] = useState([]);
  const baseURL = localStorage.getItem("baseURL");
  const [reLoad, setReLoad] = useState(false);
  const dateInref = useRef();
  const dateInref2 = useRef();
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const period = ["1st Half of Month", "2nd Half of Month"];
  useEffect(() => {
    getData();
    populate();
  }, [reLoad]);

  useEffect(() => {
    reloading();
  }, []);

  const reloading = () => {
    setTimeout(() => {
      setReLoad(true);
    }, 2000);
  };

  const populate = () => {
    // var br = [];
    // for (var i = 0; i < branch.length; i++) {
    //   br.push(branch[i].branchCode);
    //   branches.push(branch[i].branchCode);
    //   setBranches(br);
    // }
    var grp = [];
    for (var i = 0; i < branch.length; i++) {
      grp.push(branch[i].groupCode);
      branches.push(branch[i].groupCode);
      setBranches(grp);
    }
  };

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/group1/gcode").then((response) => {
      console.log(response.data);
      setBranch(response.data);
      populate();
    });
  };

  const numbersOnly = (value) => {
    return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  };

  const handleMonth = (selected) => {
    // alert("ss" + selected);
    console.log(selected);
  };

  const handlePeriod = (selected) => {
    // alert("ss" + selected);
  };

  const printReport = () => {
    alert("print");
  };

  const computeDates = (e) => {
    var date = e.target.value;
    var month = 0;
    var year = 0;
    var sDay = 0;
    var eDay = 0;
    var periodTo = "";
    sDay = date.substr(8);
    month = date.substring(5, 7);
    year = date.substring(0, 4);
    eDay = String(computeEndDay(year, month)).substring(8, 10);
    if (sDay === "01") {
      periodTo = year + "-" + month + "-" + "15";
      dateInref2.current.value = periodTo;
    } else if (sDay === "16") {
      periodTo = year + "-" + month + "-" + eDay;
      dateInref2.current.value = periodTo;
    } else {
      dateInref.current.value = date;
      dateInref2.current.value = date;
    }
  };

  var computeEndDay = (y, m) => {
    return new Date(y, m, 0);
  };

  return (
    <div style={{ margin: "auto", width: "35%" }}>
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{
          width: "30rem",
          display: "grid",
          marginTop: "75px",
          marginBottom: "75px",
        }}
      >
        <Card.Body style={{ paddingBottom: "0px", border: "solid 1px gray" }}>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            PRINT ATTENDANCE
          </label>
          <FormGroup as={Row} style={{ marginBottom: "15px" }}>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <Col sm="2"></Col>
                <FormLabel column sm="2" className="noWrapText">
                  Group
                </FormLabel>
                <Col sm="5">
                  <DropSelect
                    options={branches}
                    placeholder="Choose a Group..."
                    onChange={handleMonth}
                  />
                </Col>
              </FormGroup>
              {/* <FormGroup as={Row}>
                <Col sm="2"></Col>
                <FormLabel column sm="2" className="noWrapText">
                  Month
                </FormLabel>
                <Col sm="5">
                  <DropSelect
                    options={months}
                    placeholder="Choose a Month..."
                    onChange={handleMonth}
                  />
                </Col>
              </FormGroup> */}
              {/* <FormGroup as={Row}>
                <Col sm="2"></Col>
                <FormLabel column sm="2" className="noWrapText">
                  Year
                </FormLabel>
                <Col sm="5">
                  <FormControl
                    className="inpHeightXs"
                    inputMode="numeric"
                    maxLength="4"
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = numbersOnly(value);
                    }}
                    // style={{ width: "100px" }}
                  ></FormControl>
                </Col>
              </FormGroup> */}
              {/* <FormGroup as={Row}>
                <Col sm="2"></Col>
                <FormLabel column sm="2" className="noWrapText">
                  Period
                </FormLabel>
                <Col sm="5">
                  <DropSelect
                    options={period}
                    placeholder="Choose a Period..."
                    onChange={handlePeriod}
                  />
                </Col>
              </FormGroup> */}
              <FormGroup as={Row}>
                <Col sm="2"></Col>
                <FormLabel column sm="2" className="noWrapText">
                  Period From
                </FormLabel>
                <Col sm="5">
                  <FormControl
                    className="inpHeightXs"
                    type={"date"}
                    ref={dateInref}
                    // style={{ height: "26px" }}
                    onChange={(e) => computeDates(e)}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Col sm="2"></Col>
                <FormLabel column sm="2" className="noWrapText">
                  Period To
                </FormLabel>
                <Col sm="5">
                  <FormControl
                    className="inpHeightXs"
                    type={"date"}
                    disabled
                    ref={dateInref2}
                    // style={{ height: "26px" }}
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
              onClick={() => printReport()}
            >
              Print
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
