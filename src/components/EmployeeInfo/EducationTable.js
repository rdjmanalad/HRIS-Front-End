import React, { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";
import ModalConfirm from "../ModalAlerts/ModalConfirm";

function EducationTable(empNo) {
  const [eduList, setEduList] = useState([]);
  const [edu, setEdu] = useState([]);
  const startYearRef = useRef();
  const endYearRef = useRef();
  const placeRef = useRef();
  const remarksRef = useRef();
  var action = "";
  var [showMod, setShowMod] = useState(false);
  var setArray = {};

  setArray = {
    id: "",
    employeeNo: "",
    startYear: "",
    endYear: "",
    place: "",
    remarks: "",
  };

  function getData() {
    axios
      .get("http://localhost:8080/api/att/attainmentEDU/" + empNo.empNo, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setEduList(data);
      })
      .catch((message) => {
        alert(message);
      });
  }

  function delAttainment(id) {
    axios
      .get("http://localhost:8080/api/att/deleteAttainment/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setEduList(data);
      })
      .catch((message) => {
        alert(message);
      });
  }

  useEffect(() => {
    getData();
  }, [empNo]);

  function addNew() {
    setArray.employeeNo = empNo.empNo;
    setArray.startYear = startYearRef.current.value;
    setArray.endYear = endYearRef.current.value;
    setArray.place = placeRef.current.value;
    setArray.remarks = remarksRef.current.value;
    alert(setArray.remarks);
  }

  function handleClick(hey) {
    alert(hey);
  }

  function deleteEdu(roww) {
    setShowMod(true);
    //delAttainment(roww);
  }

  const handleClose = (x) => {
    setShowMod(false);
    alert(x);
    x ? alert("delete") : alert("cancel");
  };

  return (
    <div className="table-responsive" style={{ maxHeight: "150px" }}>
      <Table
        striped
        bordered
        hover
        variant="dark"
        Table-sm
        style={{ height: "10rem" }}
      >
        <thead>
          <tr>
            <th style={{ width: "8rem" }}>From Date</th>
            <th style={{ width: "8rem" }}>To Date</th>
            <th>School</th>
            <th>Course</th>
            <th style={{ width: "10rem", textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input ref={startYearRef} style={{ width: "7rem" }}></input>
            </td>
            <td>
              <input ref={endYearRef} style={{ width: "7rem" }}></input>
            </td>
            <td>
              <input ref={placeRef} style={{ width: "100%" }}></input>
            </td>
            <td>
              <input ref={remarksRef} style={{ width: "100%" }}></input>
            </td>
            <td>
              <div className="centerDiv">
                <ButtonGroup>
                  <Button size="sm" variant="success" onClick={() => addNew()}>
                    Add
                  </Button>
                </ButtonGroup>
              </div>
            </td>
          </tr>
          {eduList.length === 0 ? (
            <tr align="center">
              <td colSpan={"5"}>No School Found</td>
            </tr>
          ) : (
            eduList.map((school) => (
              <tr key={school.id}>
                <td contenteditable="true">{school.startYear}</td>
                <td contenteditable="true">{school.endYear}</td>
                <td contenteditable="true">{school.place}</td>
                <td contenteditable="true">{school.remarks}</td>
                <td>
                  <div className="centerDiv">
                    <ButtonGroup>
                      <Button size="sm" variant="warning">
                        Save
                      </Button>
                      {"  "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteEdu(school.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {showMod ? (
        <ModalConfirm handleClose={handleClose}></ModalConfirm>
      ) : (
        <a></a>
      )}
    </div>
  );
}

export default EducationTable;
