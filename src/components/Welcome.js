import React from "react";
import { Card, FormGroup, Row, Col, Container } from "react-bootstrap";
import "../css/welcome.css";
import homeImage from "../img/AGT.png";
import { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";

import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  formatWithOptions,
} from "date-fns";
import { enCA } from "date-fns/locale";

function Welcome() {
  const user = localStorage.getItem("user");
  const locale = enCA;
  const [employees, setData] = useState([]);
  var dayName = format(new Date(), "eeee");
  var date = format(new Date(), "MMMM dd, yyyy");
  var date2 = format(new Date(), "MMMM 'Birthday Celebrants");
  const [loading, setL] = useState(true);
  var bmonth = "03";

  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    var today = new Date().toLocaleDateString("en-CA");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      // .get("http://localhost:8080/api/masemployeesBday/" + today)
      .get("http://localhost:8080/api/masemployeesBday")
      .then((response) => {
        setL(false);
        setData(response.data);
        console.log(response.data);
      });
  };

  const getBdayMonth = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .get("http://localhost:8080/api/masemployees/" + bmonth)
      .then((response) => {
        setL(false);
        setData(response.data);
        console.log(response.data);
      });
  };

  const getFormat = (d) => {
    var dd = new Date(d).toLocaleDateString("en-CA");
    return format(new Date(d), "MM/dd/yyyy");
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

  const nameFormatter = (data, row) => {
    return (
      <span>
        {row.lastName}, {row.firstName}{" "}
        <a style={{ color: "blue" }}>{addZero(row.employeeNo)}</a>
      </span>
    );
  };

  const bdayFormatter = (data, row) => {
    return format(new Date(row.birthday), "dd");
  };

  function nameFilterFormatter(cell, row) {
    return row.lastName + row.firstName + addZero(row.employeeNo);
  }

  function bdayFilterFormatter(cell, row) {
    return format(new Date(row.birthday), "dd");
  }

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      // setRowEmp(row);
      // setId(row.employeeNo);
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
      dataField: "birthday",
      formatter: bdayFormatter,
      text: "Filter",
      // sort: true,
      filterValue: (cell, row) => bdayFilterFormatter(cell, row),
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Birthday...",
      }),
      style: { width: "120px", textAlign: "center" },
    },
  ];

  return (
    <div>
      <div className="clsCenter">
        {/* <Card>
        <img src={homeImage} alt="agt building"></img>
      </Card> */}
        <div className="welcomeBorder">
          <h1>Hello, {user}!</h1>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          className={" border-dark bg-dark text-white floatTop"}
          style={{ width: "80%", height: "100%" }}
        >
          <Card.Body>
            <FormGroup as={Row}>
              <FormGroup as={Col}>
                <h1>{dayName}</h1>
                <h1>{date}</h1>
                <label style={{ fontSize: "88px", width: "100%" }}>{dt}</label>
              </FormGroup>
              <FormGroup as={Col}>
                <label
                  style={{
                    fontSize: "30px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {date2}
                </label>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
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
                    <div
                      style={{
                        width: "80%",
                      }}
                    >
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
                    </div>
                  )}
                </Container>
              </FormGroup>
            </FormGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Welcome;
