import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
import ModalConfirm from "../ModalAlerts/ModalConfirm";
import { Card, Container, Button } from "react-bootstrap";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Type } from "react-bootstrap-table2-editor";

export const Attendance = () => {
  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  const dateInref = useRef();
  const gcodeRef = useRef();
  const [selectedId, setId] = useState("");
  const [employee, setRowEmp] = useState([]);
  const [attendance, setData] = useState([]);
  const baseURL = localStorage.getItem("baseURL");
  const [loading, setL] = useState(true);
  var gcode = "";
  var [dateIn, setDateIn] = useState(
    // new Date("2019-12-28").toLocaleDateString("en-CA")
    new Date().toLocaleDateString("en-CA")
  );

  useEffect(() => {
    getData();
  }, [dateIn]);

  const getData = () => {
    // setDateIn("2019-12-28");

    if (dateInref.current.value === "") {
      dateInref.current.value = dateIn;
    } else {
      setDateIn(dateInref.current.value);
    }
    // alert(dateIn);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/timeRecord/" + dateIn).then((response) => {
      setL(false);
      setData(response.data);
      console.log(response.data);
    });
  };

  const getData2 = () => {
    gcode = gcodeRef.current.value.toUpperCase();

    if (dateInref.current.value === "") {
      dateInref.current.value = dateIn;
    } else {
      setDateIn(dateInref.current.value);
    }
    // alert(dateIn);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .get(baseURL + "/api/timeRecord/" + dateIn + "/" + gcode)
      .then((response) => {
        setL(false);
        setData(response.data);
        console.log(response.data);
      });
  };

  const reload = () => {
    // setDateIn("2019-12-28");

    if (dateInref.current.value === "") {
      dateInref.current.value = dateIn;
    } else {
      setDateIn(dateInref.current.value);
    }
    // alert(dateIn);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/timeRecord/" + dateIn).then((response) => {
      setL(false);
      setData(response.data);
      console.log(response.data);
    });
  };

  const addZero = (empNo) => {
    var empString = String(empNo);
    var length = empString.length;
    for (let i = length; i < 4; i++) {
      empString = "0" + empString;
    }
    return empString;
  };

  const handleClose = () => {
    setShowMod(false);
  };

  function nameFilterFormatter(cell, row) {
    return row.lastName + row.firstName + addZero(row.employeeNo);
  }

  const dateSchedIn = (data, row) => {
    return new Date(row.schedIn).toLocaleTimeString("en-CA").toUpperCase();
  };

  const dateSchedOut = (data, row) => {
    return new Date(row.schedOut).toLocaleTimeString("en-CA").toUpperCase();
  };

  const timeOut = (data, row) => {
    return new Date(row.timeOut).toLocaleTimeString("en-CA").toUpperCase();
  };

  const timeIn = (data, row) => {
    return new Date(row.timeIn).toLocaleTimeString("en-CA").toUpperCase();
  };

  const transactDate = (data, row) => {
    return new Date(row.transactDate).toLocaleDateString("en-CA").toUpperCase();
  };

  const columns = [
    {
      dataField: "employeeNo",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "EmpNo",
      }),
      style: { width: "70px", textAlign: "center", color: "red" },
    },
    {
      dataField: "employeeName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Name...",
      }),
      style: { width: "275px", paddingLeft: "5px" },
      editable: false,
    },
    {
      dataField: "schedIn",
      text: "Sched In",
      sort: true,
      style: { width: "100px", textAlign: "center" },
      formatter: dateSchedIn,
      headerAlign: "center",
      editor: { type: Type.DATE },
      // editable: false,
    },
    {
      dataField: "schedOut",
      text: "Sched Out",
      sort: true,
      style: { width: "100px", textAlign: "center" },
      formatter: dateSchedOut,
      headerAlign: "center",
      editable: false,
    },
    {
      dataField: "transactDate",
      text: "Date",
      sort: true,
      formatter: transactDate,
      style: { width: "100px", textAlign: "center" },
      headerAlign: "center",
      editable: false,
    },
    {
      dataField: "timeIn",
      text: "Time In",
      sort: true,
      formatter: timeIn,
      style: { width: "100px", textAlign: "center" },
      headerAlign: "center",
    },
    {
      dataField: "timeOut",
      text: "Time Out",
      formatter: timeOut,
      sort: true,
      style: { width: "100px", textAlign: "center" },
      headerAlign: "center",
    },
    {
      dataField: "lateMin",
      text: "Late",
      sort: true,
      style: {
        width: "60px",
        textAlign: "center",
        color: "cyan",
        filter: "saturate(170%) brightness(78%)",
      },
      headerAlign: "center",
    },
    {
      dataField: "utmin",
      text: "UT",
      sort: true,
      style: { width: "60px", textAlign: "center" },
      headerAlign: "center",
    },
    {
      dataField: "ot125",
      text: "OT125",
      sort: true,
      style: { width: "60px", textAlign: "center" },
      headerAlign: "center",
    },
    {
      dataField: "ot130",
      text: "OT130",
      sort: true,
      style: { width: "60px", textAlign: "center" },
      headerAlign: "center",
    },
    {
      dataField: "ot100",
      text: "OT100",
      sort: true,
      style: { width: "60px", textAlign: "center" },
      headerAlign: "center",
    },
    {
      dataField: "abs",
      text: "ABS",
      sort: true,
      style: {
        width: "60px",
        textAlign: "center",
        color: "cyan",
        filter: "saturate(170%) brightness(78%)",
      },
      headerAlign: "center",
    },
  ];

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    clickToEdit: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowEmp(row);
      setId(row.employeeNo);
      return true;
    },
    bgColor: "#d1d1d1",
    style: { filter: "invert(100%)" },
  };

  return (
    <div>
      <Card
        style={{ height: "auto" }}
        className={" border-dark bg-dark text-white"}
      >
        <div>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>Group</span>
          <input
            type={"textbox"}
            // type={"time"}
            style={{ width: "70px", textTransform: "uppercase" }}
            ref={gcodeRef}
          ></input>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>Date</span>
          <input type={"date"} ref={dateInref}></input>
          <Button
            variant="success"
            size="sm"
            onClick={() => getData2()}
            style={{ marginLeft: "10px" }}
          >
            Submit/Reload
          </Button>
        </div>
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
              keyField="employeeNo"
              data={attendance}
              columns={columns}
              cellEdit={cellEditFactory({ mode: "click" })}
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
                    value: 18,
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
              selectRow={selectRowProp}
              // rowEvents={ rowEvents }
            ></BootstrapTable>
          )}
          <div className={"allCenter"}>
            {/* <Button variant="success" size="sm" onClick={() => newEmp()}>
            New
          </Button> */}
            {/* <Button
            variant="danger"
            size="sm"
            className="buttonMargin"
            onClick={() => deleteData()}
          >
            Remove
          </Button> */}
            {/* <Button variant="warning" size="sm" onClick={() => displayOnTab()}>
            Edit
          </Button> */}
          </div>
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
    </div>
  );
};
