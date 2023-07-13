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
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import PopUpMsg from "../ModalAlerts/PopUpMsg";
// import { TimeEditor } from "./TimeEditor";

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

  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");

  var gcode = "";
  var [dateIn, setDateIn] = useState(
    // new Date("2019-12-28").toLocaleDateString("en-CA")
    new Date().toLocaleDateString("en-CA")
  );
  var [tempDate, setTempDate] = useState(
    new Date().toLocaleDateString("en-US")
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

  const saveData = (leave) => {
    axios
      .post(baseURL + "/api/timeRecord/save", leave, {
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
          setMessage("Data Saved");
          setShowMsg(true);
          reload();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const closeMsg = (close) => {
    setShowMsg(false);
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
    return new Date(row.schedIn).toLocaleTimeString("en-US").toUpperCase();
  };

  const dateSchedOut = (data, row) => {
    return new Date(row.schedOut).toLocaleTimeString("en-US").toUpperCase();
  };

  const timeOut = (data, row) => {
    return new Date(row.timeOut).toLocaleTimeString("en-US").toUpperCase();
  };

  const timeIn = (data, row) => {
    return new Date(row.timeIn).toLocaleTimeString("en-US").toUpperCase();
  };

  const transactDate = (data, row) => {
    return new Date(row.transactDate).toLocaleDateString("en-US").toUpperCase();
  };

  const timeFormat = (dt) => {
    return new Date(dt).toLocaleTimeString("it-IT").toUpperCase();
  };

  const handleButtonSave = (r) => {
    alert(r.schedIn);
  };

  const redFormat = (cell) => {
    var lt = cell === null ? 0 : cell;
    return <span style={{ color: lt > 0 ? "cyan" : "black" }}>{lt}</span>;
  };

  const blueFormat = (cell) => {
    var lt = cell === null ? 0 : cell;
    return <span style={{ color: lt > 0 ? "#864401" : "black" }}>{lt}</span>;
  };

  const handleTime = (time, edprop) => {
    var hr;
    var mn;
    var nd;
    hr = time.split(":")[0];
    mn = time.split(":")[1];
    nd = new Date();
    nd.setHours(hr);
    nd.setMinutes(mn);
    nd.setSeconds("00");
    setTempDate(nd);
    edprop.onUpdate(nd);
  };

  const handleBlur = (time) => {
    time.onUpdate(tempDate);
  };

  const TimeEditor = ({ value, onChange, row }) => {
    var hr;
    var mn;
    var nd;
    const handleChange = (time) => {
      hr = time.split(":")[0];
      mn = time.split(":")[1];
      nd = new Date();
      nd.setHours(hr);
      nd.setMinutes(mn);
      nd.setSeconds("00");
      onChange(nd);
    };

    return (
      <input
        value={timeFormat(value)}
        // onChange={handleTime(timeFormat(value))}
        // onBlur={handleTime(timeFormat(value))}
        type={"time"}
      />
      // <TimePicker
      //   value={timeFormat(value)}
      //   onChange={handleChange}
      //   onBlur={handleBlur}

      //   disableClock={true}
      // />
    );
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
      style: { width: "70px", textAlign: "center", color: "blue" },
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
      editorRenderer: (
        editorProps,
        value,
        row,
        column,
        rowIndex,
        columnIndex
        // ) => <TimeEditor value={row.schedIn} onUpdate={editorProps.onUpdate} />,
      ) => (
        <input
          type={"time"}
          className="timeInput"
          style={{ filter: "invert(100%)", fontWeight: "bold" }}
          onChange={(e) => {
            handleTime(e.target.value, editorProps);
          }}
        />
      ),

      // editor: { type: Type.DATE },
    },
    {
      dataField: "schedOut",
      text: "Sched Out",
      sort: true,
      style: { width: "100px", textAlign: "center" },
      formatter: dateSchedOut,
      headerAlign: "center",
      editorRenderer: (editorProps) => (
        <input
          type={"time"}
          className="timeInput"
          style={{ filter: "invert(100%)", fontWeight: "bold" }}
          onChange={(e) => {
            handleTime(e.target.value, editorProps);
          }}
        />
      ),
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
      style: {
        width: "100px",
        textAlign: "center",
        backgroundColor: "#d1d1d1",
        borderRadius: "0px 10px 0px 0px",
        filter: "saturate(170%) brightness(78%)",
      },
      headerAlign: "center",
      editorRenderer: (editorProps) => (
        <input
          type={"time"}
          className="timeInput"
          style={{ filter: "invert(100%)", fontWeight: "bold" }}
          onChange={(e) => {
            handleTime(e.target.value, editorProps);
          }}
        />
      ),
    },
    {
      dataField: "timeOut",
      text: "Time Out",
      formatter: timeOut,
      sort: true,
      style: {
        width: "100px",
        textAlign: "center",
        backgroundColor: "#d1d1d1",
        borderRadius: "0px 10px 0px 0px",
        filter: "saturate(170%) brightness(78%)",
      },
      headerAlign: "center",
      editorRenderer: (editorProps) => (
        <input
          type={"time"}
          className="timeInput"
          onChange={(e) => {
            handleTime(e.target.value, editorProps);
          }}
        />
      ),
    },
    {
      dataField: "lateMin",
      text: "Late",
      sort: true,
      formatter: redFormat,
      style: {
        width: "60px",
        textAlign: "center",
        // color: "cyan",
        filter: "saturate(170%) brightness(78%)",
        backgroundColor: "#d1d1d1",
        borderRadius: "0px 10px 0px 0px",
      },
      headerAlign: "center",
      editorStyle: (cell, row, rowIndex, colIndex) => {
        const backgroundColor = "black",
          height = "22px",
          color = "white";
        return { backgroundColor, color, height };
      },
    },
    {
      dataField: "utmin",
      text: "UT",
      sort: true,
      style: {
        width: "60px",
        textAlign: "center",
        backgroundColor: "#d1d1d1",
        borderRadius: "0px 10px 0px 0px",
        filter: "saturate(170%) brightness(78%)",
      },
      headerAlign: "center",
      formatter: redFormat,
      editorStyle: (cell, row, rowIndex, colIndex) => {
        const backgroundColor = "black",
          height = "22px",
          color = "white";
        return { backgroundColor, color, height };
      },
    },
    {
      dataField: "ot125",
      text: "OT125",
      sort: true,
      style: {
        width: "60px",
        textAlign: "center",
        backgroundColor: "#d1d1d1",
        borderRadius: "0px 10px 0px 0px",
        filter: "saturate(170%) brightness(78%)",
      },
      formatter: blueFormat,
      headerAlign: "center",
      editorStyle: (cell, row, rowIndex, colIndex) => {
        const backgroundColor = "black",
          height = "22px",
          color = "white";
        return { backgroundColor, color, height };
      },
    },
    {
      dataField: "ot130",
      text: "OT130",
      sort: true,
      style: {
        width: "60px",
        textAlign: "center",
        backgroundColor: "#d1d1d1",
        borderRadius: "0px 10px 0px 0px",
        filter: "saturate(170%) brightness(78%)",
      },
      formatter: blueFormat,
      headerAlign: "center",
      editorStyle: (cell, row, rowIndex, colIndex) => {
        const backgroundColor = "black",
          height = "22px",
          color = "white";
        return { backgroundColor, color, height };
      },
    },
    {
      dataField: "ot100",
      text: "OT100",
      sort: true,
      style: {
        width: "60px",
        textAlign: "center",
        backgroundColor: "#d1d1d1",
        borderRadius: "0px 10px 0px 0px",
        filter: "saturate(170%) brightness(78%)",
      },
      formatter: blueFormat,
      headerAlign: "center",
      editorStyle: (cell, row, rowIndex, colIndex) => {
        const backgroundColor = "black",
          height = "22px",
          color = "white";
        return { backgroundColor, color, height };
      },
    },
    {
      dataField: "absent",
      text: "ABS",
      sort: true,
      formatter: redFormat,
      style: {
        width: "60px",
        textAlign: "center",
        color: "cyan",
        filter: "saturate(170%) brightness(78%)",
        backgroundColor: "#d1d1d1",
        borderRadius: "0px 10px 0px 0px",
      },
      headerAlign: "center",
      editorStyle: (cell, row, rowIndex, colIndex) => {
        const backgroundColor = "black",
          height = "22px",
          color = "white";
        return { backgroundColor, color, height };
      },
    },
    {
      text: "Action",
      formatter: (cell, row) => (
        // <button onClick={() => handleButtonSave(row.id)}>Save</button>
        <Button
          variant="success"
          size="sm"
          onClick={() => saveData(row)}
          style={{ marginLeft: "5px", filter: "invert(100%)" }}
          // disabled
        >
          Save
        </Button>
      ),
      editable: false,
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
    // bgColor: "#d1d1d1",
    bgColor: "#dedad6",
    style: {
      mixBlendMode: "difference",
      filter: "invert(100%)",
      borderColor: "coral",
      borderTop: "2px solid coral",
    },
  };

  return (
    <div>
      <Card
        style={{ height: "auto" }}
        className={" border-dark bg-dark text-white"}
      >
        <div
          style={{
            height: "26px",
            marginTop: "10px",
            display: "flex",
            marginBottom: "10px",
          }}
        >
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>Group</span>
          <input
            type={"textbox"}
            // type={"time"}
            style={{ width: "70px", textTransform: "uppercase" }}
            ref={gcodeRef}
          ></input>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>Date</span>
          <input
            type={"date"}
            ref={dateInref}
            style={{ height: "26px" }}
          ></input>
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
              id="bsTable2"
              keyField="employeeNo"
              data={attendance}
              columns={columns}
              cellEdit={cellEditFactory({ mode: "click", blurToSave: true })}
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
                    value: 14,
                  },
                  {
                    text: "15",
                    value: 16,
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
        {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
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
