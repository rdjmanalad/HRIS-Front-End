import React from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { Button } from "react-bootstrap";

function EmployeeTopList({ childToParent }) {
  const [employees, setData] = useState([]);
  const [selectedId, setId] = useState("");
  const [employee, setRowEmp] = useState([]);

  function displayOnTab() {
    // alert(employee.userId);
    childToParent(employee);
  }

  function deleteEmployee() {
    alert(selectedId);
  }

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/masemployees").then((response) => {
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

  function nameFilterFormatter(cell, row) {
    return row.firstName + row.lastName;
  }

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowEmp(row);
      return true;
    },
    style: { width: "50px" },
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
      dataField: "acompanyCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group...",
      }),
      style: { width: "75px" },
    },
  ];

  return (
    <Card
      style={{ "max-width": "25rem", "min-width": "25rem", height: "auto" }}
      className={" border-dark bg-dark text-white"}
    >
      <Card.Header style={{ color: "white" }}>
        <label>Employee List</label>
      </Card.Header>
      <Container>
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
                value: 12,
              },
              {
                text: "15",
                value: 15,
              },
            ],
          })}
          filter={filterFactory()}
          rowStyle={{ padding: "1px" }}
          rowClasses="empTableRow"
          headerClasses="empTableHeader"
          selectRow={selectRowProp}
        ></BootstrapTable>
        <div className={"allCenter"}>
          <Button variant="success" size="sm">
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
        </div>
      </Container>
    </Card>
  );
}

export default EmployeeTopList;
