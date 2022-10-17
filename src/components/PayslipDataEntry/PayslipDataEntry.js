import React, { useRef, useState, useEffect } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import axios from "axios";
import "../../css/paySlipDataEntry.css";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Button,
  Modal,
  Container,
} from "react-bootstrap";

export const PaySlipDataEntry = () => {
  const [show, setShow] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [payslips, setPayslips] = useState([]);
  const [payslip, setPayslip] = useState([]);
  const [index, setIndex] = useState(0);
  var per1 = localStorage.getItem("PPFrom");
  var per2 = localStorage.getItem("PPTo");
  var gcode = localStorage.getItem("FilterValue");

  const periodRef = useRef();
  const employeeNoRef = useRef();
  const companyRef = useRef();
  const positionRef = useRef();
  const branchRef = useRef();
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const middleNameRef = useRef();

  const otherCompRef = useRef();
  const leaveCreditsRef = useRef();
  const absDeducRef = useRef();
  const lateDeducRef = useRef();
  const restOTPayRef = useRef();
  const legHolidayPayRef = useRef();
  const srHolidayPayRef = useRef();
  const otpayRef = useRef();
  const bonusRef = useRef();
  const incentiveRef = useRef();
  const colaRef = useRef();
  const allow2Ref = useRef();
  const allow1Ref = useRef();
  const basicPayRef = useRef();

  const otherDeducRef = useRef();
  const cspsmcsRef = useRef();
  const lifeInsRef = useRef();
  const personalRef = useRef();
  const emergencyRef = useRef();
  const stPeterRef = useRef();
  const storageRef = useRef();
  const pagibigRef = useRef();
  const promisoryNoteRef = useRef();
  const sssLoanRef = useRef();
  const promisoryRef = useRef();
  const fakeOverRef = useRef();
  const hmoRef = useRef();
  const pagibigPremRef = useRef();
  const layAwayRef = useRef();
  const philhealthPremRef = useRef();
  const sssPremRef = useRef();
  const withHoldTaxRef = useRef();
  const lateRef = useRef();
  const absentRef = useRef();
  const overTimeRef = useRef();
  const srHolRef = useRef();
  const legHolRef = useRef();
  const restSunRef = useRef();
  const vacLeaveRef = useRef();

  // let toggle = true;

  useEffect(() => {
    if (toggle) {
      getData();
    }
    setToggle(false);
  }, [show]);

  const getData = () => {
    // axios.defaults.headers.common["Authorization"] =
    //   "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    // axios.get("http://localhost:8080/api/masemployees").then((response) => {
    //   setEmployees(response.data);
    //   console.log(response.data);
    // });

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .get(
        "http://localhost:8080/api/vpayslip/" + per1 + "/" + per2 + "/" + gcode
      )
      .then((response) => {
        // setEmployees(response.data);
        setPayslips(response.data);
        console.log(response.data);
      });
  };

  const showOnDetails = () => {
    employeeNoRef.current.value = employee.employeeNo;
    branchRef.current.value = employee.abranchCode;
    lastNameRef.current.value = employee.lastName;
    firstNameRef.current.value = employee.firstName;
    middleNameRef.current.value = employee.middleName;
    positionRef.current.value = employee.workPosition;
    companyRef.current.value = employee.acompanyCode;
    periodRef.current.value = per1 + " to " + per2;
  };

  const handleClose = () => {
    setShow(false);
    showOnDetails();
  };
  const handleShow = () => {
    setShow(true);
    setToggle(true);
  };

  const nextEmp = () => {
    employeeNoRef.current.value = payslips[index + 1].employeeNo;
    setIndex(index + 1);
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
      setIndex(rowIndex);
      alert(rowIndex);
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
        <Card.Body>
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="my-modal"
            backdrop="static"
          >
            <Modal.Header
              closeButton
              className="border-dark bg-dark text-white"
            >
              <Modal.Title>Employee List</Modal.Title>
            </Modal.Header>
            <Modal.Body className="border-dark bg-dark text-white">
              <Card
                style={{
                  maxWidth: "25rem",
                  minWidth: "25rem",
                  height: "auto",
                }}
                className={" border-dark bg-dark text-white"}
              >
                <Container>
                  <BootstrapTable
                    id="bsTable"
                    // keyField="userId"
                    keyField="id"
                    data={payslips}
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
          <label
            className="asHeader"
            style={{ paddingLeft: "5px", backgroundColor: "red" }}
            onClick={handleShow}
          >
            CLICK TO SHOW EMPLOYEE LIST ▲
          </label>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            EMPLOYEE PAYSLIP INFORMATION
          </label>
          <FormGroup as={Row}>
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
                  Company
                </FormLabel>
                <Col>
                  <FormControl
                    ref={companyRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Position
                </FormLabel>
                <Col>
                  <FormControl
                    ref={positionRef}
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
          </FormGroup>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            PAYSLIP DETAILS
          </label>
          {/* ############################ DETAILS ####################### */}
          {/* ############################ DETAILS ####################### */}
          {/* ############################ DETAILS ####################### */}
          <FormGroup as={Row}>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Basic Pay
                </FormLabel>
                <Col>
                  <FormControl
                    ref={basicPayRef}
                    className="inpHeightXs"
                    // value={}
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Allow 1 - Meal Allow
                </FormLabel>
                <Col>
                  <FormControl
                    ref={allow1Ref}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Allow 2 - Night Diff
                </FormLabel>
                <Col>
                  <FormControl
                    ref={allow2Ref}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  COLA
                </FormLabel>
                <Col>
                  <FormControl
                    ref={colaRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Incentive
                </FormLabel>
                <Col>
                  <FormControl
                    ref={incentiveRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Bonus/13th Month
                </FormLabel>
                <Col>
                  <FormControl
                    ref={bonusRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Over Time Pay
                </FormLabel>
                <Col>
                  <FormControl
                    ref={otpayRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Special/Reg. Hol Pay
                </FormLabel>
                <Col>
                  <FormControl
                    ref={srHolidayPayRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Legal Holiday
                </FormLabel>
                <Col>
                  <FormControl
                    ref={legHolidayPayRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Rest/Sunday OT Pay
                </FormLabel>
                <Col>
                  <FormControl
                    ref={restOTPayRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Late Deductions
                </FormLabel>
                <Col>
                  <FormControl
                    ref={lateDeducRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Absent Deductions
                </FormLabel>
                <Col>
                  <FormControl
                    ref={absDeducRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Leave Credits
                </FormLabel>
                <Col>
                  <FormControl
                    ref={leaveCreditsRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Other Compensation
                </FormLabel>
                <Col>
                  <FormControl
                    ref={otherCompRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* ############################################################### */}
            {/* ############################################################### */}
            {/* ############################################################### */}
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Witholding Tax
                </FormLabel>
                <Col>
                  <FormControl
                    ref={withHoldTaxRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  SSSnPremium
                </FormLabel>
                <Col>
                  <FormControl
                    ref={sssPremRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Philhealth Premium
                </FormLabel>
                <Col>
                  <FormControl
                    ref={philhealthPremRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Pagibig Premium
                </FormLabel>
                <Col>
                  <FormControl
                    ref={pagibigPremRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  HMO
                </FormLabel>
                <Col>
                  <FormControl
                    ref={hmoRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Fake / Over
                </FormLabel>
                <Col>
                  <FormControl
                    ref={fakeOverRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Promisory
                </FormLabel>
                <Col>
                  <FormControl
                    ref={promisoryRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  SSS Loan
                </FormLabel>
                <Col>
                  <FormControl
                    ref={sssLoanRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Promisory Note
                </FormLabel>
                <Col>
                  <FormControl
                    ref={promisoryNoteRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Pagibig
                </FormLabel>
                <Col>
                  <FormControl
                    ref={pagibigRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Storage
                </FormLabel>
                <Col>
                  <FormControl
                    ref={storageRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  St. Peter
                </FormLabel>
                <Col>
                  <FormControl
                    ref={stPeterRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Emergency
                </FormLabel>
                <Col>
                  <FormControl
                    ref={emergencyRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Lay Away
                </FormLabel>
                <Col>
                  <FormControl
                    ref={layAwayRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Personal
                </FormLabel>
                <Col>
                  <FormControl
                    ref={personalRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Life Insurance
                </FormLabel>
                <Col>
                  <FormControl
                    ref={lifeInsRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  CS/PS/MCS
                </FormLabel>
                <Col>
                  <FormControl
                    ref={cspsmcsRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Other Deductions
                </FormLabel>
                <Col>
                  <FormControl
                    ref={otherDeducRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* ############################################################### */}
            {/* ############################################################### */}
            {/* ############################################################### */}

            <FormGroup as={Col}>
              <FormGroup
                as={Row}
                style={{
                  marginTop: "6px",
                  marginBottom: "4px",
                }}
              >
                <Card
                  style={{
                    width: "94%",
                    paddingTop: "7px",
                    paddingBottom: "12px",
                    marginLeft: "10px",
                  }}
                >
                  <FormGroup as={Row}>
                    <FormLabel
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      SALARY ADJUSTMENT
                    </FormLabel>
                    <Col sm="1">
                      <label className="blackText3">0000</label>
                    </Col>
                  </FormGroup>
                  <label className="separator2"></label>
                  <FormGroup as={Row}>
                    <FormLabel
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      BASIC PAY
                    </FormLabel>
                    <Col sm="1">
                      <label className="blackText3">0000</label>
                    </Col>
                  </FormGroup>
                  <label className="separator2"></label>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      Per Cut-off
                    </FormLabel>
                    <Col sm="1">
                      <label className="blackText2">0000</label>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      Per Day
                    </FormLabel>
                    <Col sm="2">
                      <label className={"blackText2"}>0000</label>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      Per Hour
                    </FormLabel>
                    <Col sm="2">
                      <label className={"blackText2"}>0000</label>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      Per Minute
                    </FormLabel>
                    <Col sm="2">
                      <label className={"blackText2"}>0000</label>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      Leave Balance
                    </FormLabel>
                    <Col sm="2">
                      <label className={"blackText2"}>0000</label>
                    </Col>
                  </FormGroup>
                  <label className="separator2"></label>
                  <FormGroup as={Row}>
                    <FormLabel
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      COLA (13)
                    </FormLabel>
                    <Col sm="1">
                      <label className="blackText3">0000</label>
                    </Col>
                  </FormGroup>
                  <label className="separator2"></label>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      Per Day
                    </FormLabel>
                    <Col sm="2">
                      <label className={"blackText2"}>0000</label>
                    </Col>
                  </FormGroup>
                </Card>
              </FormGroup>

              {/* ############################################################### */}
              {/* ############################################################### */}
              {/* ############################################################### */}

              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Vacation Leave (D)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={vacLeaveRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Late (M)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={lateRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Absent (D)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={absentRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Over Time (H)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={overTimeRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Special/Reg. Hol (D)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={srHolRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Legal Holiday (D)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={legHolRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Rest Sunday (D)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={restSunRef}
                    className="inpHeightXs"
                    disabled
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* <label className="separator2"></label> */}
            <Card className="asTotal">
              <FormGroup as={Row}>
                <FormGroup as={Col} sm="4">
                  <FormGroup as={Row}>
                    <FormLabel
                      column
                      sm="8"
                      className={("noWrapText", "greenText")}
                    >
                      TOTAL GROSS PAY:
                    </FormLabel>
                    <Col sm="1">
                      <label className="blackText3">0000</label>
                    </Col>
                  </FormGroup>
                </FormGroup>
                <FormGroup as={Col} sm="4">
                  <FormGroup as={Row}>
                    <FormLabel
                      column
                      sm="8"
                      className={("noWrapText", "redText")}
                    >
                      TOTAL DEDUCTIONS:
                    </FormLabel>
                    <Col sm="1">
                      <label className="blackText3">0000</label>
                    </Col>
                  </FormGroup>
                </FormGroup>
                <FormGroup as={Col} sm="4">
                  <FormGroup as={Row}>
                    <FormLabel
                      column
                      sm="8"
                      className={("noWrapText", "blackText")}
                    >
                      TOTAL NET PAY:
                    </FormLabel>
                    <Col sm="1">
                      <label className="blackText3">0000</label>
                    </Col>
                  </FormGroup>
                </FormGroup>
              </FormGroup>
            </Card>
            <Card className={" border-dark bg-dark text-white asButtonPart"}>
              <FormGroup as={Row}>
                <Col sm="5"></Col>
                <Col sm="2">
                  <Button
                    className="setButtonMargin"
                    style={{ width: "150px" }}
                    variant="info"
                    // onClick={() => deleteUser()}
                  >
                    Time Records
                  </Button>
                </Col>
                <Col sm="1">
                  <Button
                    className="setButtonMargin"
                    // onClick={() => newUser()}
                  >
                    Edit
                  </Button>
                </Col>
                <Col sm="1">
                  <Button
                    className="setButtonMargin"
                    variant="danger"
                    // onClick={() => deleteUser()}
                  >
                    Remove
                  </Button>
                </Col>
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
                    onClick={() => nextEmp()}
                  >
                    Next
                  </Button>
                </Col>
              </FormGroup>
            </Card>
          </FormGroup>
        </Card.Body>
      </Card>
    </div>
  );
};
