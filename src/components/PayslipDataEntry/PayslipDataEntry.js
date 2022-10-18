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
  const [employee, setEmployee] = useState("");
  const [toggle, setToggle] = useState(true);
  const [payslips, setPayslips] = useState([]);
  const [payslip, setPayslip] = useState([]);
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
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
  const grossRef = useRef();

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
  const totalDeductionRef = useRef();
  const netRef = useRef();

  const basicPayAdjRef = useRef();
  const perCutOffRef = useRef();
  const perDayRef = useRef();
  const perHourRef = useRef();
  const perMinRef = useRef();

  // let toggle = true;

  useEffect(() => {
    if (toggle) {
      getData();
    }
    setToggle(false);
  }, [show]);

  useEffect(() => {
    showOnDetails();
  }, [employee]);

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
    if (employee) {
      employeeNoRef.current.value = employee.employeeNo;
      branchRef.current.value = employee.abranchCode;
      lastNameRef.current.value = employee.lastName;
      firstNameRef.current.value = employee.firstName;
      middleNameRef.current.value = employee.middleName;
      positionRef.current.value = employee.workPosition;
      companyRef.current.value = employee.acompanyCode;
      periodRef.current.value = per1 + " to " + per2;
      basicPayRef.current.value = numberFormat(employee.basicPay);
      allow1Ref.current.value = numberFormat(employee.allowance1);
      allow2Ref.current.value = numberFormat(employee.allowance2);
      colaRef.current.value = numberFormat(employee.cola);
      incentiveRef.current.value = numberFormat(employee.incentive);
      bonusRef.current.value = numberFormat(employee.bonus13);
      otpayRef.current.value = numberFormat(employee.otamount);
      srHolidayPayRef.current.value = numberFormat(employee.specialAmount);
      legHolidayPayRef.current.value = numberFormat(employee.legalAmount);
      restOTPayRef.current.value = numberFormat(employee.sundayAmount);
      lateDeducRef.current.value = numberFormat(employee.lateAmount);
      absDeducRef.current.value = numberFormat(employee.absentAmount);
      otherCompRef.current.value = numberFormat(employee.otherAmount);
      grossRef.current.value = numberFormat(employee.gross);

      withHoldTaxRef.current.value = numberFormat(employee.tax);
      sssPremRef.current.value = numberFormat(employee.sss);
      philhealthPremRef.current.value = numberFormat(employee.philHealth);
      pagibigPremRef.current.value = numberFormat(employee.pagibig);
      fakeOverRef.current.value = numberFormat(employee.fakeOver);
      hmoRef.current.value = numberFormat(0);
      promisoryRef.current.value = numberFormat(employee.promisoryNote);
      promisoryNoteRef.current.value = numberFormat(0);
      sssLoanRef.current.value = numberFormat(employee.sssloan);
      pagibigRef.current.value = numberFormat(employee.pagibigLoan);
      storageRef.current.value = numberFormat(employee.storageLoan);
      stPeterRef.current.value = numberFormat(employee.calamityLoan);
      emergencyRef.current.value = numberFormat(employee.emergencyLoan);
      layAwayRef.current.value = numberFormat(employee.housingLoan);
      personalRef.current.value = numberFormat(employee.cashBondLoan);
      lifeInsRef.current.value = numberFormat(employee.coop);
      cspsmcsRef.current.value = numberFormat(employee.coopLoan);
      otherDeducRef.current.value = numberFormat(employee.otherDeduction);
      totalDeductionRef.current.value = numberFormat(employee.deduction);

      vacLeaveRef.current.value = numberFormat(employee.vacationLeave);
      netRef.current.value = numberFormat(employee.net);
      //     lateRef.current.value = numberFormat(employee.
      //     absentRef.current.value = numberFormat(employee.
      //     overTimeRef.current.value = numberFormat(employee.
      //     srHolRef.current.value = numberFormat(employee.
      // legHolRef.current.value = numberFormat(employee.
      // restSunRef.current.value = numberFormat(employee.

      basicPayAdjRef.current.value = numberFormat(employee.basicPay * 2);
      perCutOffRef.current.value = numberFormat(employee.basicPay);
      perHourRef.current.value = numberFormat(employee.basicPay / 13 / 8);
      perDayRef.current.value = numberFormat(employee.basicPay / 13);
      perMinRef.current.value = numberFormat(employee.basicPay / 13 / 8 / 60);
      setLen(payslips.length);
    }
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
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    if (index < len - 1) {
      setEmployee(payslips[index + 1]);
      setIndex(index + 1);
      // showOnDetails();
    }
  };

  const prevEmp = () => {
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    if (index > 0) {
      setEmployee(payslips[index - 1]);
      setIndex(index - 1);
      // showOnDetails();
    }
  };

  const firstEmp = () => {
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    setEmployee(payslips[0]);
    setIndex(0);
    showOnDetails();
  };

  const lastEmp = () => {
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    setEmployee(payslips[len - 1]);
    setEmployee(payslips[len - 1]);
    setIndex(len - 1);
    showOnDetails();
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  const normalizeCurrency = (value) => {
    return value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
      return true;
    },
  };

  const rowEvents = {
    clickToSelect: true,
    onDoubleClick: (row, isSelect, rowIndex, e) => {
      handleClose();
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
                    rowEvents={rowEvents}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
                    // disabled
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      BASIC PAY
                    </FormLabel>
                    <Col sm="1">
                      {/* <label className="blackText3">0000</label> */}
                      <input
                        ref={basicPayAdjRef}
                        className={" currency"}
                        style={{
                          marginTop: "5px",
                          width: "100px",
                          borderStyle: "none",
                        }}
                      ></input>
                    </Col>
                  </FormGroup>
                  <label className="separator2"></label>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      Per Cut-off
                    </FormLabel>
                    <Col sm="1">
                      {/* <label className="blackText2">0000</label> */}
                      <input
                        ref={perCutOffRef}
                        className={" currency"}
                        style={{
                          marginTop: "5px",
                          width: "100px",
                          borderStyle: "none",
                        }}
                      ></input>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      Per Day
                    </FormLabel>
                    <Col sm="2">
                      {/* <label className={"blackText2"}>0000</label> */}
                      <input
                        ref={perDayRef}
                        className={" currency"}
                        style={{
                          marginTop: "5px",
                          width: "100px",
                          borderStyle: "none",
                        }}
                      ></input>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      Per Hour
                    </FormLabel>
                    <Col sm="2">
                      {/* <label className={"blackText2"}>0000</label> */}
                      <input
                        ref={perHourRef}
                        className={" currency"}
                        style={{
                          marginTop: "5px",
                          width: "100px",
                          borderStyle: "none",
                        }}
                      ></input>
                    </Col>
                  </FormGroup>
                  <FormGroup as={Row}>
                    <FormLabel
                      style={{ padding: "0px 0px 0px 10px" }}
                      column
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      Per Minute
                    </FormLabel>
                    <Col sm="2">
                      {/* <label className={"blackText2"}>0000</label> */}
                      <input
                        ref={perMinRef}
                        className={" currency"}
                        style={{
                          marginTop: "5px",
                          width: "100px",
                          borderStyle: "none",
                        }}
                      ></input>
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
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
                      sm="5"
                      className={("noWrapText", "greenText")}
                    >
                      TOTAL GROSS PAY:
                    </FormLabel>
                    <Col sm="2">
                      {/* <label className="blackText3" ref={grossRef}></label> */}
                      <input
                        ref={grossRef}
                        className={"asLabel currency2"}
                        style={{
                          fontWeight: "bolder",
                          marginTop: "2px",
                          paddingRight: "10px",
                          fontSize: "medium",
                          width: "175px",
                        }}
                      ></input>
                    </Col>
                  </FormGroup>
                </FormGroup>
                <FormGroup as={Col} sm="4">
                  <FormGroup as={Row}>
                    <FormLabel
                      column
                      sm="6"
                      className={("noWrapText", "redText")}
                    >
                      TOTAL DEDUCTIONS:
                    </FormLabel>
                    <Col sm="1">
                      {/* <label className="blackText3">0000</label> */}
                      <input
                        ref={totalDeductionRef}
                        className={"asLabel currency2"}
                        style={{
                          fontWeight: "bolder",
                          marginTop: "2px",
                          paddingRight: "10px",
                          fontSize: "medium",
                          width: "145px",
                        }}
                      ></input>
                    </Col>
                  </FormGroup>
                </FormGroup>
                <FormGroup as={Col} sm="4">
                  <FormGroup as={Row}>
                    <FormLabel
                      column
                      sm="5"
                      className={("noWrapText", "blackText")}
                    >
                      TOTAL NET PAY:
                    </FormLabel>
                    <Col sm="1">
                      {/* <label className="blackText3">0000</label> */}
                      <input
                        ref={netRef}
                        className={"asLabel currency2"}
                        style={{
                          fontWeight: "bolder",
                          marginTop: "2px",
                          paddingRight: "10px",
                          fontSize: "medium",
                          width: "165px",
                        }}
                      ></input>
                    </Col>
                  </FormGroup>
                </FormGroup>
              </FormGroup>
            </Card>
            <Card className={" border-dark bg-dark text-white asButtonPart"}>
              <FormGroup as={Row}>
                <Col sm="4"></Col>
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
                    variant="success"
                    // onClick={() => newUser()}
                  >
                    Edit
                  </Button>
                </Col>
                <Col sm="1">
                  <Button
                    className="setButtonMargin"
                    variant="secondary"
                    onClick={() => firstEmp()}
                  >
                    &lt;&lt;
                  </Button>
                </Col>

                <Col sm="1">
                  <Button
                    className="setButtonMargin"
                    variant="primary"
                    onClick={() => prevEmp()}
                  >
                    Prev
                  </Button>
                </Col>
                <Col sm="1">
                  <Button
                    className="setButtonMargin"
                    variant="primary"
                    onClick={() => nextEmp()}
                  >
                    Next
                  </Button>
                </Col>
                <Col sm="1">
                  <Button
                    className="setButtonMargin"
                    variant="secondary"
                    onClick={() => lastEmp()}
                  >
                    &gt;&gt;
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
