import React from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";

function EmployeeTopList() {
  const baseURL = localStorage.getItem("baseURL");
  const [employees, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/employees").then((response) => {
      setData(response.data);
    });
  };
  const columns = [
    {
      dataField: "username",
      // text: "Name",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Name...",
      }),
    },
    {
      dataField: "userPassWord",
      text: "Password",
    },
    {
      dataField: "userType",
      text: "User Role",
      sort: true,
    },
    {
      dataField: "currentGroup",
      text: "Group",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group...",
      }),
    },
  ];

  return (
    <Card bg="dark" style={{ marginTop: "15px", marginBottom: "15px" }}>
      <Card.Header style={{ color: "white" }}>
        <label>Employee List</label>
      </Card.Header>
      <Container>
        <BootstrapTable
          id="bsTable"
          keyField="userId"
          data={employees}
          columns={columns}
          striped
          hover
          condensed
          pagination={paginationFactory()}
          filter={filterFactory()}
        ></BootstrapTable>
      </Container>
    </Card>
  );
}

export default EmployeeTopList;
