import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
import ModalConfirm from "../ModalAlerts/ModalConfirm";
import { Card, Container, Button } from "react-bootstrap";

export const TimeEmployees = () => {
  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  const [employees, setData] = useState([]);
  const [selectedId, setId] = useState("");
  const [employee, setRowEmp] = useState([]);
  const [emptyEmp, setEmptyEmp] = useState([]);
  const baseURL = localStorage.getItem("baseURL");
  const [loading, setL] = useState(true);

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
      dataField: "lastName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Lastname...",
      }),
      style: { width: "175px" },
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
    },
    {
      dataField: "schedIn",
      text: "Sched In",
      formatter: dateSchedIn,
      sort: true,
      style: { width: "100px", textAlign: "center" },
    },
    {
      dataField: "schedOut",
      text: "Sched Out",
      formatter: dateSchedOut,
      sort: true,
      style: { width: "100px", textAlign: "center" },
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
    },
  ];

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowEmp(row);
      setId(row.employeeNo);
      return true;
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
              id="bsTable"
              // keyField="userId"
              keyField="employeeNo"
              data={employees}
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
