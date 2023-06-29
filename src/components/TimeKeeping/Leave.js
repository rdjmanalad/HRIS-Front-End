import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
import ModalConfirm from "../ModalAlerts/ModalConfirm";
import { Card, Container, Button, Modal } from "react-bootstrap";
import { style, width } from "@mui/system";
import ShowMsg from "../ModalAlerts/ShowMsg";

export const Leave = () => {
  var [showMod, setShowMod] = useState(false);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(true);
  var [action, setAction] = useState("");
  const [leave, setData] = useState([]);
  const [selectedId, setId] = useState("");
  const [employee, setRowEmp] = useState([]);
  const [emptyEmp, setEmptyEmp] = useState([]);
  const baseURL = localStorage.getItem("baseURL");
  const [loading, setL] = useState(true);
  const leaveRef = useRef();
  const nameRef = useRef();
  const empNoRef = useRef();
  const [employees, setEmployees] = useState([]);
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
  const [delId, setDelId] = useState("");

  var setLeave = {
    transactNo: "",
    employeeNo: "",
    employeeName: "",
    transactDate: "",
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/leave").then((response) => {
      setL(false);
      setData(response.data);
      console.log(response.data);
    });
  };

  const getEmp = () => {
    setId("");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/masemployees").then((response) => {
      setL(false);
      setEmployees(response.data);
      setShow(true);
      //   console.log(response.data);
    });
  };

  const saveLeave = () => {
    axios
      .post(baseURL + "/api/leave/save", setLeave, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setMessage("Data Saved");
          setShowMsg(true);
          getData();
        }
      });
  };

  const deleteLeave = () => {
    axios
      .delete(baseURL + "/api/leave/delete/" + delId, {
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
          setMessage("Data Deleted");
          setShowMsg(true);
          clearFields();
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const preSave = () => {
    setLeave.employeeNo = empNoRef.current.value;
    setLeave.employeeName = nameRef.current.value;
    setLeave.transactDate = leaveRef.current.value;
    setLeave.transactNo = selectedId;
    saveLeave();
  };

  const clearFields = () => {
    empNoRef.current.value = "";
    nameRef.current.value = "";
    leaveRef.current.value = "";
  };

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  const nameFormatter = (data, row) => {
    return (
      <span>
        {row.lastName}, {row.firstName}{" "}
        <a style={{ color: "blue" }}>{addZero(row.employeeNo)}</a>
      </span>
    );
  };

  function nameFilterFormatter(cell, row) {
    return row.lastName + row.firstName + addZero(row.employeeNo);
  }

  const addZero = (empNo) => {
    var empString = String(empNo);
    var length = empString.length;
    for (let i = length; i < 4; i++) {
      empString = "0" + empString;
    }
    return empString;
  };

  //   const handleClose = () => {
  //     setShowMod(false);
  //   };
  const handleClose = () => {
    setShow(false);
    // showOnDetails();
  };
  const handleShow = () => {
    setShow(true);
    setToggle(true);
  };

  const rowEvents = {
    clickToSelect: true,
    onDoubleClick: (row, isSelect, rowIndex, e) => {
      handleClose();
    },
  };

  const rowEvents2 = {
    clickToSelect: true,
    onDoubleClick: (row, isSelect, rowIndex, e) => {
      handleClose();
    },
  };

  const dateTransact = (data, row) => {
    return new Date(row.transactDate).toLocaleDateString("en-CA").toUpperCase();
  };

  const columns2 = [
    {
      // dataField: "username",
      dataField: "lastName",
      formatter: nameFormatter,
      text: "Filter",
      sort: true,
      filterValue: (cell, row) => nameFilterFormatter(cell, row),
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Name...",
      }),
    },
    {
      // dataField: "currentGroup",
      dataField: "ogroupCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group...",
      }),
      style: { width: "75px", textAlign: "center" },
    },
  ];

  const columns = [
    {
      dataField: "employeeNo",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "EmpNo",
      }),
      style: { width: "70px", textAlign: "center", color: "blue" },
    },
    {
      dataField: "employeeName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Employee Name...",
      }),
      style: { width: "200px" },
    },
    {
      dataField: "transactDate",
      text: "Leave Date",
      formatter: dateTransact,
      sort: true,
      style: { width: "100px", textAlign: "center" },
      headerAlign: "center",
    },
  ];

  const selectRowProp2 = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowEmp(row);
      setId(row.employeeNo);
      empNoRef.current.value = row.employeeNo;
      nameRef.current.value =
        row.lastName + ", " + row.firstName + " " + row.middleName;
      return true;
    },
  };

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowEmp(row);
      setId(row.transactNo);
      setDelId(row.transactNo);
      empNoRef.current.value = row.employeeNo;
      nameRef.current.value = row.employeeName;
      leaveRef.current.value = row.transactDate;
      return true;
    },
  };

  return (
    <div className="centerDiv">
      <Card
        style={{ height: "auto", width: "600px" }}
        className={" border-dark bg-dark text-white"}
      >
        <Container>
          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              // wrapperStyle={{ marginTop: "180px", marginLeft: "120px" }}
              wrapperStyle={{ margin: "auto" }}
              wrapperClass="blocks-wrapper, centerLoading"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            <BootstrapTable
              id="bsTable"
              // keyField="userId"
              keyField="transactNo"
              data={leave}
              columns={columns}
              striped
              hover
              condensed
              pagination={paginationFactory({
                paginationSize: 4,
                hideSizePerPage: true,
                withFirstAndLast: true,
                sizePerPageList: [
                  {
                    text: "12",
                    value: 20,
                  },
                  {
                    text: "15",
                    value: 25,
                  },
                ],
              })}
              filter={filterFactory()}
              rowStyle={{ padding: "1px" }}
              rowClasses="empTableRow"
              headerClasses="empTableHeader"
              selectRow={selectRowProp}
              rowEvents={rowEvents}
            ></BootstrapTable>
          )}
        </Container>
        {showMod ? (
          <ModalConfirm
            handleClose={handleClose}
            action={action}
          ></ModalConfirm>
        ) : (
          <a></a>
        )}
      </Card>
      <div>
        <div style={{ marginTop: "10px" }}>
          <label
            style={{ marginLeft: "10px", marginRight: "10px", width: "60px" }}
          >
            Emp. No.
          </label>
          <input
            type={"textbox"}
            disabled
            style={{
              width: "70px",
              marginBottom: "4px",
              height: "26px",
              fontWeight: "bold",
            }}
            ref={empNoRef}
          ></input>
          {/* <Button
            size="sm"
            style={{ marginLeft: "10px", marginBottom: "3px" }}
            onClick={() => getEmp()}
          >
            Search
          </Button> */}
        </div>
        <div style={{ marginTop: "10px" }}>
          <label
            style={{ marginLeft: "10px", marginRight: "10px", width: "60px" }}
          >
            Name
          </label>
          <input
            type={"textbox"}
            style={{ width: "300px", height: "26px", fontWeight: "bold" }}
            disabled
            ref={nameRef}
          ></input>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label
            style={{ marginLeft: "10px", marginRight: "10px", width: "60px" }}
          >
            Date
          </label>
          <input
            type={"date"}
            ref={leaveRef}
            style={{ marginTop: "5px", height: "26px" }}
          ></input>
          {/* <Button
            variant="success"
            size="sm"
            onClick={() => preSave()}
            style={{ marginLeft: "10px", marginBottom: "2px" }}
          >
            Save
          </Button> */}
        </div>
        <div style={{ marginTop: "50px", display: "flex" }}>
          <button
            type="submit"
            className="btn btn-primary btn-md buttonRight"
            style={{ width: "80px", marginTop: "0px", marginRight: "5px" }}
            onClick={() => getEmp()}
          >
            New
          </button>
          <button
            type="submit"
            className="btn btn-success btn-md "
            style={{ width: "80px", marginTop: "0px", marginRight: "5px" }}
            onClick={() => preSave()}
          >
            Save
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-md "
            style={{ width: "80px", marginTop: "0px" }}
            onClick={() => deleteLeave()}
          >
            Delete
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>Employee List</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-dark bg-dark text-white">
          <Card
            style={{
              maxWidth: "25rem",
              minWidth: "25rem",
              height: "auto",
            }}
            className={" border-dark bg-dark text-white"}
          >
            <Container>
              {loading ? (
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  // wrapperStyle={{ marginTop: "180px", marginLeft: "120px" }}
                  wrapperStyle={{ margin: "auto" }}
                  wrapperClass="blocks-wrapper, centerLoading"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                <BootstrapTable
                  id="bsTable"
                  // keyField="userId"
                  keyField="employeeNo"
                  data={employees}
                  columns={columns2}
                  striped
                  hover
                  condensed
                  pagination={paginationFactory({
                    paginationSize: 3,
                    hideSizePerPage: true,
                    withFirstAndLast: true,
                    sizePerPageList: [
                      {
                        text: "12",
                        value: 10,
                      },
                      {
                        text: "15",
                        value: 20,
                      },
                    ],
                  })}
                  filter={filterFactory()}
                  rowStyle={{ padding: "1px" }}
                  rowClasses="empTableRow"
                  headerClasses="empTableHeader"
                  selectRow={selectRowProp2}
                  rowEvents={rowEvents2}
                  // rowEvents={ rowEvents }
                ></BootstrapTable>
              )}
            </Container>
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {showMsg ? (
        <ShowMsg closeMsg={closeMsg} message={message}></ShowMsg>
      ) : (
        <a></a>
      )}
    </div>
  );
};
