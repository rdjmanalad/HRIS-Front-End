import React, { useState, useEffect } from "react";
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
    var br = [];
    for (var i = 0; i < branch.length; i++) {
      br.push(branch[i].branchCode);
      branches.push(branch[i].branchCode);
      setBranches(br);
    }
  };

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/branches").then((response) => {
      setBranch(response.data);
      populate();
      // console.log(response.data);
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
                    placeholder="Choose a Branch..."
                    onChange={handleMonth}
                  />
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
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
              </FormGroup>
              <FormGroup as={Row}>
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
              </FormGroup>
              <FormGroup as={Row}>
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
