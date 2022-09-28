import React, { useRef, useState, useEffect } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import axios from "axios";
import {
  Container,
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

export const EmployeeLoans = () => {
  const usernameRef = useRef();
  const [show, setShow] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState([]);

  const periodRef = useRef();
  const employeeNoRef = useRef();
  const branchRef = useRef();
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const middleNameRef = useRef();

  const sssSDRef = useRef();
  const sssEDRef = useRef();
  const sssCapRef = useRef();
  const sssAmorRef = useRef();
  const sssBalRef = useRef();

  const pagSDRef = useRef();
  const pagEDRef = useRef();
  const pagCapRef = useRef();
  const pagAmorRef = useRef();
  const pagBalRef = useRef();

  const spSDRef = useRef();
  const spEDRef = useRef();
  const spCapRef = useRef();
  const spAmorRef = useRef();
  const spBalRef = useRef();

  const plEDRef = useRef();
  const plSDRef = useRef();
  const plCapRef = useRef();
  const plAmorRef = useRef();
  const plBalRef = useRef();

  const emerSDRef = useRef();
  const emerEDRef = useRef();
  const emerCapRef = useRef();
  const emerAmorRef = useRef();
  const emerBalRef = useRef();

  const foSDRef = useRef();
  const foEDRef = useRef();
  const foCapRef = useRef();
  const foAmorRef = useRef();
  const foBalRef = useRef();

  const storSDRef = useRef();
  const storEDRef = useRef();
  const storCapRef = useRef();
  const storAmorRef = useRef();
  const storBalRef = useRef();

  const pnSDRef = useRef();
  const pnEDRef = useRef();
  const pnCapRef = useRef();
  const pnAmorRef = useRef();
  const pnBalRef = useRef();

  const lapSDRef = useRef();
  const lapEDRef = useRef();
  const lapCapRef = useRef();
  const lapAmorRef = useRef();
  const lapBalRef = useRef();

  const perSDRef = useRef();
  const perEDRef = useRef();
  const perCapRef = useRef();
  const perAmorRef = useRef();
  const perBalRef = useRef();

  const liSDRef = useRef();
  const liEDRef = useRef();
  const liCapRef = useRef();
  const liAmorRef = useRef();
  const liBalRef = useRef();

  const hmoSDRef = useRef();
  const hmoEDRef = useRef();
  const hmoCapRef = useRef();
  const hmoAmorRef = useRef();
  const hmoBalRef = useRef();

  const cpmSDRef = useRef();
  const cpmEDRef = useRef();
  const cpmCapRef = useRef();
  const cpmAmorRef = useRef();
  const cpmBalRef = useRef();

  const handleClose = () => {
    setShow(false);
    showOnDetails();
  };
  const handleShow = () => setShow(true);

  function showOnDetails() {
    employeeNoRef.current.value = employee.employeeNo;
    branchRef.current.value = employee.abranchCode;
    lastNameRef.current.value = employee.lastName;
    firstNameRef.current.value = employee.firstName;
    middleNameRef.current.value = employee.middleName;
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/masemployees").then((response) => {
      setEmployees(response.data);
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
      setEmployee(row);
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
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>Employee List</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-dark bg-dark text-white">
          <Card
            style={{
              "max-width": "25rem",
              "min-width": "25rem",
              height: "auto",
            }}
            className={" border-dark bg-dark text-white"}
          >
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
                // rowEvents={ rowEvents }
              ></BootstrapTable>
            </Container>
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Show Employee Loans
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          marginTop: "15px",
          marginBottom: "10px",
          paddingBottom: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          className={" border-dark bg-dark text-white floatTop"}
          style={{ width: "80rem" }}
        >
          <Card.Header>
            <label
              className="asHeader"
              style={{ paddingLeft: "5px", backgroundColor: "red" }}
              onClick={handleShow}
            >
              CLICK TO SHOW EMPLOYEE LIST ▲
            </label>
          </Card.Header>
          <Card.Body>
            <label className="asHeader" style={{ paddingLeft: "5px" }}>
              EMPLOYEE PAYSLIP INFORMATION
            </label>
            <FormGroup as={Row}>
              <FormGroup as={Col} sm="1"></FormGroup>
              <FormGroup as={Col}>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Period
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={periodRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Employee No.
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={employeeNoRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Branch
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={branchRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup as={Col}>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Last Name
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={lastNameRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    First Name
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={firstNameRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Middle Name
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={middleNameRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
              <FormGroup as={Col} sm="1"></FormGroup>
            </FormGroup>
            <label className="asHeader" style={{ paddingLeft: "5px" }}>
              PRESENT LOANS
            </label>
            <Card className="asTableHeader">
              <FormGroup as={Row}>
                <FormLabel
                  column
                  sm="2"
                  className="noWrapText"
                  style={{ paddingLeft: "15px" }}
                >
                  LOANS
                </FormLabel>
                <FormLabel column className="noWrapText textCenter">
                  START DATE
                </FormLabel>
                <FormLabel column className="noWrapText textCenter">
                  END DATE
                </FormLabel>
                <FormLabel column className="noWrapText textCenter">
                  CAPITAL
                </FormLabel>
                <FormLabel column className="noWrapText textCenter">
                  AMORTIZATION
                </FormLabel>
                <FormLabel column className="noWrapText textCenter">
                  BALANCE
                </FormLabel>
              </FormGroup>
            </Card>
            <FormGroup as={Row}>
              <FormGroup as={Col}>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    SSS Loan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={sssSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Pagibig Loan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={pagSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pagEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pagCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pagAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pagBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    St. Peter Loan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={spSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={spEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={spCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={spAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={spBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Promisory Loan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={plSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={plEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={plCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={plAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={plBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Emergency
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={emerSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={emerEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={emerCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={emerAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={emerBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Fake / Over
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={foSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={foEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={foCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={foAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={foBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Storage
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={storSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={storEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={storCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={storAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={storBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Promisory Note
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={pnSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pnEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pnCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pnAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pnBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Lay Away Plan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={lapSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={lapEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={lapCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={lapAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={lapBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Personal
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={perSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={perEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={perCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={perAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={perBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Life Insurance
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={liSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={liEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={liCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={liAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={liBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    HMO
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={hmoSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={hmoEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={hmoCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={hmoAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={hmoBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    CS/PS/MS
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={cpmSDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={cpmEDRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={cpmCapRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={cpmAmorRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={cpmBalRef}
                      className="inpHeightXs"
                      disabled
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
            </FormGroup>
            <label className="separator"></label>
            <FormGroup as={Row}>
              <Col sm="5"></Col>

              <Col sm="1">
                <Button
                  className="setButtonMargin"
                  variant="success"
                  // onClick={() => deleteUser()}
                >
                  Back
                </Button>
              </Col>
              <Col sm="1">
                <Button
                  className="setButtonMargin"
                  variant="success"
                  // onClick={() => deleteUser()}
                >
                  Next
                </Button>
              </Col>
              <Col sm="4"></Col>
            </FormGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
