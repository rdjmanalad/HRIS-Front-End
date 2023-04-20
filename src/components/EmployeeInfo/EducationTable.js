import React, { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";
import ModalConfirm from "../ModalAlerts/ModalConfirm";
import PopUpMsg from "../ModalAlerts/PopUpMsg";

function EducationTable({ empNo }) {
  const [eduList, setEduList] = useState([]);
  const [edu, setEdu] = useState([]);
  const startYearRef = useRef();
  const endYearRef = useRef();
  const placeRef = useRef();
  const remarksRef = useRef();
  const [rowId, setRowId] = useState("");
  const baseURL = localStorage.getItem("baseURL");
  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  var [rem, setRem] = useState("");
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
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
      .get(baseURL + "/api/att/attainmentEDU/" + empNo, {
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
          setMessage("Delete Success");
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
    setArray.status = "EDU";
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

  function deleteEdu(roww) {
    setAction("DELETE");
    setShowMod(true);
    setRowId(roww);
    //delAttainment(roww);
  }

  const saveEditEdu = (rowData) => {
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
                        onClick={() => saveEditEdu(school)}
                      >
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
      {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
      {showMod ? (
        <ModalConfirm handleClose={handleClose} action={action}></ModalConfirm>
      ) : (
        <a></a>
      )}
    </div>
  );
}

export default EducationTable;
