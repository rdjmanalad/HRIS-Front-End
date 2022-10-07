import React, { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";
import ModalConfirm from "../ModalAlerts/ModalConfirm";

function EmpCompanyTable({ empNo }) {
  const [empList, setEmpList] = useState([]);
  const [emp, setEmp] = useState([]);
  const startYearRef = useRef();
  const endYearRef = useRef();
  const placeRef = useRef();
  const remarksRef = useRef();
  const [rowId, setRowId] = useState("");
  // var rowId = 0;
  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  var [rem, setRem] = useState("");
  var setArray = {};

  setArray = {
    id: "",
    status: "",
    employeeNo: "",
    startYear: "",
    endYear: "",
    place: "",
    remarks: "",
  };

  const getData = () => {
    axios
      .get("http://localhost:8080/api/att/attainmentEMP/" + empNo, {
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
        setEmpList(data);
      })
      .catch((message) => {
        console.log(message);
      });
  };

  const delAttainment = (id) => {
    axios
      .delete("http://localhost:8080/api/att/deleteAttainment/" + id, {
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
          alert("Delete Success!");
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveAttainment = () => {
    axios
      .post("http://localhost:8080/api/att/saveAttainment", setArray, {
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
          alert("Saved Successfully!");
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveEditAttainment = (edited) => {
    axios
      .post("http://localhost:8080/api/att/saveAttainment", edited, {
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
          alert("Edit Saved!");
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  useEffect(() => {
    getData();
  }, [empNo]);

  function addNew() {
    setArray.employeeNo = empNo;
    setArray.status = "EMP";
    setArray.startYear = startYearRef.current.value;
    setArray.endYear = endYearRef.current.value;
    setArray.place = placeRef.current.value;
    setArray.remarks = remarksRef.current.value;
    saveAttainment();
    // alert(setArray.remarks);
  }

  function handleClick(hey) {
    alert(hey);
  }

  function deleteEmp(roww) {
    setAction("DELETE");
    setShowMod(true);
    setRowId(roww);
    //delAttainment(roww);
  }

  const saveEditEmp = (rowData) => {
    // alert(rowData.remarks);
    saveEditAttainment(rowData);
  };

  const handleClose = (deleteAtt) => {
    if (deleteAtt) {
      delAttainment(rowId);
      setShowMod(false);
    } else {
      setShowMod(false);
    }
  };

  return (
    <div className="table-responsive" style={{ maxHeight: "175px" }}>
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
            <th>Company</th>
            <th>Position</th>
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
          {empList.length === 0 ? (
            <tr align="center">
              <td colSpan={"5"}>No Employment Found</td>
            </tr>
          ) : (
            empList.map((school) => (
              <tr key={school.id}>
                <td
                  contentEditable="true"
                  onBlur={(e) => (school.startYear = e.target.textContent)}
                >
                  {school.startYear}
                </td>
                <td
                  contentEditable="true"
                  onBlur={(e) => (school.endYear = e.target.textContent)}
                >
                  {school.endYear}
                </td>
                <td
                  contentEditable="true"
                  onBlur={(e) => (school.place = e.target.textContent)}
                >
                  {school.place}
                </td>
                <td
                  contentEditable="true"
                  onBlur={(event) =>
                    (school.remarks = event.target.textContent)
                  }
                >
                  {school.remarks}
                </td>
                <td>
                  <div className="centerDiv">
                    <ButtonGroup>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => saveEditEmp(school)}
                      >
                        Save
                      </Button>
                      {"  "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteEmp(school.id)}
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
        <ModalConfirm handleClose={handleClose} action={action}></ModalConfirm>
      ) : (
        <a></a>
      )}
    </div>
  );
}

export default EmpCompanyTable;
