import React, { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";
import ModalConfirm from "../ModalAlerts/ModalConfirm";
import PopUpMsg from "../ModalAlerts/PopUpMsg";

function EmpCompanyTable({ empNo }) {
  const [empList, setEmpList] = useState([]);
  const [emp, setEmp] = useState([]);
  const startYearRef = useRef();
  const endYearRef = useRef();
  const placeRef = useRef();
  const remarksRef = useRef();
  const [rowId, setRowId] = useState("");
  const baseURL = localStorage.getItem("baseURL");
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
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

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  const getData = () => {
    axios
      .get(baseURL + "/api/att/attainmentEMP/" + empNo, {
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
      .delete(baseURL + "/api/att/deleteAttainment/" + id, {
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
          // alert("Delete Success!");
          setMessage("Data Deleted");
          setShowMsg(true);
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveAttainment = () => {
    axios
      .post(baseURL + "/api/att/saveAttainment", setArray, {
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
          // alert("Saved Successfully!");
          setMessage("Data Saved");
          setShowMsg(true);
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveEditAttainment = (edited) => {
    axios
      .post(baseURL + "/api/att/saveAttainment", edited, {
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
          // alert("Edit Saved!");
          setMessage("Data Saved");
          setShowMsg(true);
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
  const numbersOnly = (value) => {
    return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
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
              {/* <input ref={startYearRef} style={{ width: "7rem" }}></input> */}
              <input
                maxLength="4"
                ref={startYearRef}
                style={{ width: "7rem" }}
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = numbersOnly(value);
                }}
              ></input>
            </td>
            <td>
              {/* <input ref={endYearRef} style={{ width: "7rem" }}></input> */}
              <input
                maxLength="4"
                ref={endYearRef}
                style={{ width: "7rem" }}
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = numbersOnly(value);
                }}
              ></input>
            </td>
            <td>
              {/* <input ref={placeRef} style={{ width: "100%" }}></input> */}
              <input
                ref={placeRef}
                maxLength="50"
                style={{ width: "100%", textTransform: "uppercase" }}
              ></input>
            </td>
            <td>
              {/* <input ref={remarksRef} style={{ width: "100%" }}></input> */}
              <input
                ref={remarksRef}
                maxLength="50"
                style={{ width: "100%", textTransform: "uppercase" }}
              ></input>
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
      {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
      {showMod ? (
        <ModalConfirm handleClose={handleClose} action={action}></ModalConfirm>
      ) : (
        <a></a>
      )}
    </div>
  );
}

export default EmpCompanyTable;
