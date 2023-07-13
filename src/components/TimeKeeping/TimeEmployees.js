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
import PopUpMsg from "../ModalAlerts/PopUpMsg";
import { width } from "@mui/system";

export const TimeEmployees = () => {
  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  const [employees, setData] = useState([]);
  const [selectedId, setId] = useState("");
  const [employee, setRowEmp] = useState([]);
  const [emptyEmp, setEmptyEmp] = useState([]);
  const baseURL = localStorage.getItem("baseURL");
  const [loading, setL] = useState(true);

  //   var [showMod, setShowMod] = useState(false);
  //   var [action, setAction] = useState("");
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
  const [editedRows, setEditedRows] = useState([]);

  var [tempDate, setTempDate] = useState(
    new Date().toLocaleDateString("en-US")
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/masemployees").then((response) => {
      setL(false);
      setData(response.data);
      console.log(response.data);
    });
  };

  const saveEmployee = (emp) => {
    axios
      .post(baseURL + "/api/masemployeeSave", emp, {
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
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const closeMsg = (close) => {
    setShowMsg(false);
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

  const dateSchedIn = (data, row) => {
    return new Date(row.schedIn).toLocaleTimeString("en-US").toUpperCase();
  };

  const dateSchedOut = (data, row) => {
    return new Date(row.schedOut).toLocaleTimeString("en-US").toUpperCase();
  };

  const handleRowChange = (row, column, oldValue, newValue) => {
    var edtRow = [];
    if (oldValue !== newValue) {
      edtRow.push(row.employeeNo);
    }
    setEditedRows(edtRow);
  };

  const handleTime = (time, edprop, row) => {
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
      //   editable: false,
    },
    {
      dataField: "lastName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Lastname...",
      }),
      style: { width: "175px" },
      editable: false,
    },
    {
      dataField: "firstName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Firstname...",
      }),
      style: { width: "175px" },
      editable: false,
    },
    {
      dataField: "middleName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Middlename...",
      }),
      style: { width: "175px" },
      editable: false,
    },
    {
      dataField: "ogroupCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group...",
      }),
      style: { width: "75px", textAlign: "center" },
      editable: false,
    },
    {
      dataField: "abranchCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Branch...",
      }),
      style: { width: "100px", textAlign: "center" },
      editable: false,
    },
    {
      dataField: "schedIn",
      text: "Sched In",
      formatter: dateSchedIn,
      sort: true,
      style: {
        width: "100px",
        textAlign: "center",
        backgroundColor: "#aaaaaa",
        borderRadius: "0px 10px 0px 0px",
      },
      editorRenderer: (editorProps, cell, row) => (
        <input
          type={"time"}
          className="timeInput"
          onChange={(e) => {
            handleTime(e.target.value, editorProps, row);
          }}
          autoFocus="true"
        />
      ),
    },
    {
      dataField: "schedOut",
      text: "Sched Out",
      formatter: dateSchedOut,
      sort: true,
      style: {
        width: "100px",
        textAlign: "center",
        backgroundColor: "#aaaaaa",
        borderRadius: "0px 10px 0px 0px",
      },
      editorRenderer: (editorProps, row) => (
        <input
          type={"time"}
          className="timeInput"
          onChange={(e) => {
            handleTime(e.target.value, editorProps, row);
          }}
          autoFocus="true"
        />
      ),
    },
    {
      dataField: "workStatus",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Status...",
      }),
      style: { width: "70px", textAlign: "center" },
      editable: false,
    },
    {
      dataField: "actions",
      text: "Action",
      style: { width: "50px" },
      editable: false,
      formatter: (cell, row) => (
        <Button
          variant="success"
          size="sm"
          onClick={() => saveEmployee(row)}
          style={{
            marginLeft: "5px",
            filter: "invert(100%)",
          }}
        >
          Save
        </Button>
      ),
      //   formatter: (cell, row) => {
      //     // const isDisabled = enabler(row, 0);
      //     const isDisabled = !editedRows.includes(row.employeeNo);
      //     const visi = !editedRows.includes(row.employeeNo) ? "block" : "none";
      //     return (
      //       <Button
      //         variant="success"
      //         size="sm"
      //         // display={visi}
      //         disabled={isDisabled}
      //         onClick={() => saveEmployee(row)}
      //         style={{
      //           marginLeft: "5px",
      //           filter: "invert(100%)",
      //           display: visi,
      //         }}
      //       >
      //         Save
      //       </Button>
      //     );
      //   },
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
              // keyField="userId"
              keyField="employeeNo"
              data={employees}
              columns={columns}
              striped
              hover
              condensed
              cellEdit={cellEditFactory({
                mode: "click",
                blurToSave: true,
                beforeSaveCell: (oldValue, newValue, row, column) => {
                  handleRowChange(row, column, oldValue, newValue);
                  return true;
                },
              })}
              pagination={paginationFactory({
                paginationSize: 4,
                hideSizePerPage: true,
                withFirstAndLast: true,
                sizePerPageList: [
                  {
                    text: "12",
                    value: 16,
                  },
                  {
                    text: "15",
                    value: 18,
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
