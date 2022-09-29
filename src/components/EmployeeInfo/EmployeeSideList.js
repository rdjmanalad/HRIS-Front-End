import React from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function EmployeeTopList({ childToParent, refreshPage }) {
  const [employees, setData] = useState([]);
  const [selectedId, setId] = useState("");
  const [employee, setRowEmp] = useState([]);

  const [loading, setL] = useState(true);

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
      .delete("http://localhost:8080/api/masemployeeDel/" + selectedId, {
        header: { employeeNo: selectedId },
      })
      .then((response) => {
        alert(response.status);
        // setData(response.data);
        // console.log(response.data);
      });
  }

  function newEmp() {
    //window.location.reload(false);
    // setRowEmp([]);

    employee.abranchCode = null;
    employee.acompanyCode = null;
    employee.address = null;
    employee.age = null;
    employee.agroupCode = null;
    employee.alowance1 = null;
    employee.allowance2 = null;
    employee.atmno = null;
    employee.basicPay = null;
    employee.birthday = null;
    employee.board = null;
    employee.caddress = null;
    employee.civil = null;
    employee.cola = null;
    employee.cperson = null;
    employee.datehire = null;
    employee.employeeNo = "";
    employee.exemption = null;
    employee.firstName = null;
    employee.gender = null;
    employee.lastName = null;
    employee.leave = false;
    employee.middleName = null;
    employee.obranchCode = null;
    employee.ocompanyCode = null;
    employee.ogroupCode = null;
    employee.paddress = null;
    employee.pagibigNo = null;
    employee.philhealthNo = null;
    employee.phone = null;
    employee.presentLeave = null;
    employee.previousLeave = null;
    employee.rank = null;
    employee.remarks = null;
    employee.resigned = null;
    employee.schedIn = null;
    employee.schedOut = null;
    employee.spouse = null;
    employee.sssno = null;
    employee.taxCode = null;
    employee.tinno = null;
    employee.transportation = null;
    employee.unionName = null;
    employee.waverage = null;
    employee.workPosition = null;
    employee.workStatus = null;

    childToParent(employee);
    refreshPage();
    getData();
    // employee = [];

    // childToParent(employee);
  }
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/masemployees").then((response) => {
      setL(false);
      setData(response.data);
      console.log(response.data);
    });
  };
  const nameFormatter = (data, row) => {
    return (
      <span>
        {row.firstName} {row.lastName}
      </span>
    );
  };

  useEffect(() => {
    // loading = false;
  }, [employees]);

  useEffect(() => {
    displayOnTab(employee);
  }, [employee]);

  function nameFilterFormatter(cell, row) {
    return row.firstName + row.lastName;
  }

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
            wrapperStyle={{ marginTop: "180px", marginLeft: "120px" }}
            wrapperClass="blocks-wrapper"
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
        {/* <div className={"allCenter"}>
          <Button variant="success" size="sm" onClick={() => newEmp()}>
            New
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="buttonMargin"
            onClick={() => deleteEmployee()}
          >
            Remove
          </Button>
          <Button variant="warning" size="sm" onClick={() => displayOnTab()}>
            Edit
          </Button>
        </div> */}
      </Container>
    </Card>
  );
}

export default EmployeeTopList;
