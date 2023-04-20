import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
import ModalConfirm from "../ModalAlerts/ModalConfirm";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function EmployeeTopList({ childToParent, refreshPage, childToParent2 }) {
  const [employees, setData] = useState([]);
  const [selectedId, setId] = useState("");
  const [employee, setRowEmp] = useState([]);
  const [emptyEmp, setEmptyEmp] = useState([]);
  const baseURL = localStorage.getItem("baseURL");

  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  var count = 1;

  const [loading, setL] = useState(true);
  var emptyObj = {};
  emptyObj = {
    abranchCode: "",
    acompanyCode: "",
    address: "",
    age: "",
    agroupCode: "",
    alowance1: "",
    allowance2: "",
    atmno: "",
    basicPay: "",
    birthday: "",
    board: "",
    caddress: "",
    civil: "",
    cola: "",
    cperson: "",
    datehire: "",
    employeeNo: "",
    exemption: "",
    firstName: "",
    gender: "",
    lastName: "",
    leave: false,
    middleName: "",
    obranchCode: "",
    ocompanyCode: "",
    ogroupCode: "",
    paddress: "",
    pagibigNo: "",
    philhealthNo: "",
    phone: "",
    presentLeave: "",
    previousLeave: "",
    rank: "",
    remarks: "",
    resigned: "",
    schedIn: "",
    schedOut: "",
    spouse: "",
    sssno: "",
    taxCode: "",
    tinno: "",
    transportation: "",
    unionName: "",
    waverage: "",
    workPosition: "",
    workStatus: "",
  };

  function displayOnTab() {
    // alert(employee.userId);
    childToParent(employee);
    // refreshPage();
  }

  function deleteEmployee() {
    alert(selectedId);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .delete(baseURL + "/api/masemployeeDel/" + selectedId, {
        header: { employeeNo: selectedId },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Delete Success!");
        }
      });
  }

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
  const nameFormatter = (data, row) => {
    return (
      <span>
        {row.lastName}, {row.firstName}{" "}
        <a style={{ color: "blue" }}>{addZero(row.employeeNo)}</a>
      </span>
    );
  };

  useEffect(() => {
    if (count === 1) {
      childToParent2(emptyObj);
    }
    count++;
  }, [employees]);

  useEffect(() => {
    displayOnTab(employee);
  }, [employee]);

  function nameFilterFormatter(cell, row) {
    return row.lastName + row.firstName + addZero(row.employeeNo);
  }

  const deleteData = () => {
    setAction("DELETE");
    setShowMod(true);
  };

  const handleClose = (deleteAtt) => {
    if (deleteAtt) {
      deleteEmployee();
      setShowMod(false);
    } else {
      setShowMod(false);
    }
  };

  const addZero = (empNo) => {
    var empString = String(empNo);
    var length = empString.length;
    for (let i = length; i < 4; i++) {
      empString = "0" + empString;
    }
    return empString;
  };

  // const rowEvents = {
  //   onClick: (e, row, rowIndex) => {
  //     displayOnTab(row);
  //     displayOnTab(row);
  //   }
  // };

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowEmp(row);
      setId(row.employeeNo);
      return true;
    },
  };
  const columns = [
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

  return (
    <Card
      style={{ maxWidth: "25rem", minWidth: "25rem", height: "auto" }}
      className={" border-dark bg-dark text-white"}
    >
      <Card.Header style={{ color: "white" }}>
        <label>Employee List</label>
      </Card.Header>
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
              paginationSize: 3,
              hideSizePerPage: true,
              withFirstAndLast: true,
              sizePerPageList: [
                {
                  text: "12",
                  value: 15,
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
          <Button
            variant="danger"
            size="sm"
            className="buttonMargin"
            onClick={() => deleteData()}
          >
            Remove
          </Button>
          {/* <Button variant="warning" size="sm" onClick={() => displayOnTab()}>
            Edit
          </Button> */}
        </div>
      </Container>
      {showMod ? (
        <ModalConfirm handleClose={handleClose} action={action}></ModalConfirm>
      ) : (
        <a></a>
      )}
    </Card>
  );
}

export default EmployeeTopList;
