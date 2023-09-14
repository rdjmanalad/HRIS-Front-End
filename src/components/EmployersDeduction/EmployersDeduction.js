import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Button,
  Container,
} from "react-bootstrap";

export const EmployersDeduction = () => {
  const sssDeducRef = useRef();
  const pagDeducRef = useRef();
  const phDeducRef = useRef();
  const [employee, setEmployee] = useState("");
  const [deduc, setDeduc] = useState("");
  const [loading, setL] = useState(true);
  const [show, setShow] = useState(true);
  var per1 = localStorage.getItem("PPFrom");
  var per2 = localStorage.getItem("PPTo");
  var gcode = localStorage.getItem("FilterValue");
  const [index, setIndex] = useState(0);
  const baseURL = localStorage.getItem("baseURL");

  var setArray = {
    employeeNo: "",
    abranch: "",
    obranch: "",
    period1: "",
    period2: "",
    sssdeduction: "",
    pagibigDeduction: "",
    philhealthDeduction: "",
  };

  function newUser() {}

  function deleteUser() {}

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .get(baseURL + "/api/employersDeduc/" + gcode + "/" + per1 + "/" + per2)
      .then((response) => {
        setL(false);
        setDeduc(response.data);
        console.log(response.data);
      });
  };

  const saveData = (data) => {
    axios
      .post(baseURL + "/api/employersDeduc/save", data, {
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
          alert("Saved Successfully!");
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const save = () => {
    setArray.employeeNo = employee.employeeNo;
    setArray.abranch = employee.abranch;
    setArray.obranch = employee.obranch;
    setArray.period1 = employee.period1;
    setArray.period2 = employee.period2;
    setArray.sssdeduction = setArray.sssdeduction
      ? setArray.sssdeduction
      : employee.sssdeduction;
    setArray.pagibigDeduction = setArray.pagibigDeduction
      ? setArray.pagibigDeduction
      : employee.pagibigDeduction;
    setArray.philhealthDeduction = setArray.philhealthDeduction
      ? setArray.philhealthDeduction
      : employee.philhealthDeduction;
    employee.sssdeduction = setArray.sssdeduction;
    employee.pagibigDeduction = setArray.pagibigDeduction;
    employee.philhealthDeduction = setArray.philhealthDeduction;
    console.log(setArray);
    saveData(setArray);
  };

  const showOnDetails = (row) => {
    sssDeducRef.current.value = row.sssdeduction;
    pagDeducRef.current.value = row.pagibigDeduction;
    phDeducRef.current.value = row.philhealthDeduction;
  };

  const nameFormatter = (data, row) => {
    return (
      <span>
        {row.lastName}, {row.firstName}
        {"   "}
        <a style={{ color: "blue" }}>{row.employeeNo}</a>
      </span>
    );
  };

  function nameFilterFormatter(cell, row) {
    return row.lastName + row.firstName + row.employeeNo;
  }

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setEmployee(row);
      setIndex(rowIndex);
      showOnDetails(row);
      return true;
    },
  };

  const rowEvents = {
    clickToSelect: true,
    // onClick: (row, isSelect, rowIndex, e) => {
    //   showOnDetails();
    // },
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
        placeholder: "Name...or...Employee number",
      }),
    },
    {
      // dataField: "currentGroup",
      dataField: "agroupCode",
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
    <div
      style={{
        marginTop: "70px",
        marginBottom: "10px",
        paddingBottom: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ width: "30rem" }}
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
              data={deduc}
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
              selectRow={selectRowProp}
              rowEvents={rowEvents}
            ></BootstrapTable>
          )}
        </Container>
      </Card>
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ width: "30rem" }}
      >
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            EMPLOYERS DEDUCTIONS
          </label>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Employee Number
            </FormLabel>
            <Col>
              <FormControl
                className="inpHeightXs"
                defaultValue={employee.employeeNo}
                disabled
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Period From
            </FormLabel>
            <Col>
              <FormControl
                className="inpHeightXs"
                defaultValue={employee.period1}
                disabled
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Period To
            </FormLabel>
            <Col>
              <FormControl
                className="inpHeightXs"
                defaultValue={employee.period2}
                disabled
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              SSS Deduction
            </FormLabel>
            <Col>
              <FormControl
                ref={sssDeducRef}
                className="inpHeightXs"
                defaultValue={employee.sssdeduction}
                onChange={(event) =>
                  (setArray.sssdeduction = event.target.value)
                }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Pagibig Deduction
            </FormLabel>
            <Col>
              <FormControl
                ref={pagDeducRef}
                className="inpHeightXs"
                onChange={(event) =>
                  (setArray.pagibigDeduction = event.target.value)
                }
              ></FormControl>
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <FormLabel column sm="4" className="noWrapText">
              Philhealth Deduction
            </FormLabel>
            <Col>
              <FormControl
                ref={phDeducRef}
                className="inpHeightXs"
                onChange={(event) =>
                  (setArray.philhealthDeduction = event.target.value)
                }
              ></FormControl>
            </Col>
          </FormGroup>
        </Card.Body>

        <Card.Footer>
          <FormGroup as={Row}>
            <Col sm="8"></Col>
            <Col>
              <Button
                style={{ marginRight: "5px" }}
                className="setButtonMargin"
                variant="success"
                onClick={() => save()}
              >
                Save
              </Button>
            </Col>
          </FormGroup>
        </Card.Footer>
      </Card>
    </div>
  );
};
