import React, { useRef, useState, useEffect } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import axios from "axios";
import "../../css/paySlipDataEntry.css";
import { ColorRing } from "react-loader-spinner";
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
  Form,
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
  const [loading, setL] = useState(true);
  const [gross, setGross] = useState(0);
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
  const leaveRef = useRef();

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
        setL(false);
        setPayslips(response.data);
        console.log(response.data);
      });
  };

  const saveEmpPayslip = () => {
    axios
      .post("http://localhost:8080/api/payslip/save", employee, {
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
      hmoRef.current.value = numberFormat(employee.coop);
      promisoryRef.current.value = numberFormat(employee.promisoryNote);
      promisoryNoteRef.current.value = numberFormat(employee.calamityLoan);
      sssLoanRef.current.value = numberFormat(employee.sssloan);
      pagibigRef.current.value = numberFormat(employee.pagibigLoan);
      storageRef.current.value = numberFormat(employee.storageLoan);
      stPeterRef.current.value = numberFormat(employee.housingLoan);
      emergencyRef.current.value = numberFormat(employee.emergencyLoan);
      layAwayRef.current.value = numberFormat(employee.coopLoan);
      personalRef.current.value = numberFormat(employee.personalLoan);
      lifeInsRef.current.value = numberFormat(employee.otherLoan);
      cspsmcsRef.current.value = numberFormat(employee.cashBondLoan);
      otherDeducRef.current.value = numberFormat(employee.otherDeduction);
      totalDeductionRef.current.value = numberFormat(employee.deduction);
      leaveCreditsRef.current.value = numberFormat(
        employee.leaveAmount ? employee.leaveAmount : 0
      );
      leaveRef.current.checked = employee.leave === 1 ? true : false;
      vacLeaveRef.current.value = 0;
      lateRef.current.value = employee.late;
      absentRef.current.value = employee.absent;
      overTimeRef.current.value = employee.ot;
      srHolRef.current.value = employee.special;
      legHolRef.current.value = employee.legal;
      restSunRef.current.value = employee.sunday;
      netRef.current.value = numberFormat(employee.net);

      basicPayAdjRef.current.value = numberFormat(employee.basicPay * 2);
      perCutOffRef.current.value = numberFormat(employee.basicPay);
      perHourRef.current.value = numberFormat(
        (((employee.basicPay * 2) / 313) * 12) / 8
      );
      perDayRef.current.value = numberFormat(
        ((employee.basicPay * 2) / 313) * 12
      );
      perMinRef.current.value = numberFormat(
        (((employee.basicPay * 2) / 313) * 12) / 8 / 60
      );
      setLen(payslips.length);
    }
  };

  const save = () => {
    setData();
    console.log(employee);
    saveEmpPayslip();
  };

  const setData = () => {
    employee.gross = removePesoComma(grossRef.current.value);
    employee.deduction = removePesoComma(totalDeductionRef.current.value);
    employee.net = removePesoComma(netRef.current.value);
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

  const removePesoComma = (val) => {
    return val.substring(1).replaceAll(",", "");
  };

  const checkChange = (val, val2) => {
    var ret = 0;
    // alert(val + "   " + val2);
    ret =
      val === numberFormat(val2) ? val : numberFormat(val.replaceAll(",", ""));
    if (val === numberFormat(val2)) {
      ret = val;
    } else {
      reComputeGross();
    }
    return ret;
  };

  const checkChange2 = (val, val2) => {
    var ret = 0;
    // alert(val + "   " + val2);
    ret =
      val === numberFormat(val2) ? val : numberFormat(val.replaceAll(",", ""));
    if (val === numberFormat(val2)) {
      ret = val;
    } else {
      reComputeDeduction();
    }

    return ret;
  };

  const reComputeGross = () => {
    var cur = grossRef.current.value.replaceAll(",", "");
    cur = cur.substring(1);
    // val = val.substring(1);
    var grs = 0;
    grs =
      parseFloat(employee.gross) +
      parseFloat(employee.allowance1) +
      parseFloat(employee.allowance2) +
      parseFloat(employee.cola) +
      parseFloat(employee.bonus13) +
      parseFloat(employee.incentive) +
      parseFloat(employee.otamount) +
      parseFloat(employee.specialAmount) +
      parseFloat(employee.legalAmount) +
      parseFloat(employee.sundayAmount) -
      parseFloat(employee.lateAmount) -
      parseFloat(employee.absentAmount) -
      parseFloat(employee.leaveAmount ? employee.leaveAmount : 0) -
      parseFloat(employee.otherAmount);

    setGross(grs);
    grossRef.current.value = numberFormat(grs);
    netRef.current.value = numberFormat(
      grs - removePesoComma(totalDeductionRef.current.value)
    );
  };

  const reComputeDeduction = () => {
    var newDeduction = 0;
    newDeduction =
      // parseFloat(employee.deduction) +
      parseFloat(employee.pagibig) +
      parseFloat(employee.sss) +
      parseFloat(employee.cola) +
      parseFloat(employee.tax) +
      parseFloat(employee.philHealth) +
      parseFloat(employee.coop) +
      parseFloat(employee.fakeOver) +
      parseFloat(employee.promisoryNote) +
      parseFloat(employee.sssloan) +
      parseFloat(employee.calamityLoan) +
      parseFloat(employee.pagibigLoan) +
      parseFloat(employee.storageLoan) +
      parseFloat(employee.housingLoan) +
      parseFloat(employee.emergencyLoan) +
      parseFloat(employee.coopLoan) +
      parseFloat(employee.personalLoan) +
      parseFloat(employee.otherLoan) +
      parseFloat(employee.cashBondLoan) +
      parseFloat(employee.otherDeduction);

    // setGross(grs);
    totalDeductionRef.current.value = numberFormat(newDeduction);
    netRef.current.value = numberFormat(
      removePesoComma(grossRef.current.value) - newDeduction
    );
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
                  )}
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
                    disabled
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
                    onBlur={(event) => {
                      basicPayRef.current.value = checkChange(
                        basicPayRef.current.value,
                        employee.basicPay
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.allowance1 = value;
                      } else {
                        employee.allowance1 = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      allow1Ref.current.value = checkChange(
                        allow1Ref.current.value,
                        employee.allowance1
                      );
                      // employee.allowance1 = allow1Ref.current.value
                      //   .replaceAll(",", "")
                      //   .substring(1);
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.allowance2 = value;
                      } else {
                        employee.allowance2 = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      allow2Ref.current.value = checkChange(
                        allow2Ref.current.value,
                        employee.allowance2
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.cola = value;
                      } else {
                        employee.cola = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      colaRef.current.value = checkChange(
                        colaRef.current.value,
                        employee.cola
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.incentive = value;
                      } else {
                        employee.incentive = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      incentiveRef.current.value = checkChange(
                        incentiveRef.current.value,
                        employee.incentive
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.bonus13 = value;
                      } else {
                        employee.bonus13 = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      bonusRef.current.value = checkChange(
                        bonusRef.current.value,
                        employee.bonus13
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.otamount = value;
                      } else {
                        employee.otamount = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      otpayRef.current.value = checkChange(
                        otpayRef.current.value,
                        employee.otamount
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.specialAmount = value;
                      } else {
                        employee.specialAmount = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      srHolidayPayRef.current.value = checkChange(
                        srHolidayPayRef.current.value,
                        employee.specialAmount
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.legalAmount = value;
                      } else {
                        employee.legalAmount = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      legHolidayPayRef.current.value = checkChange(
                        legHolidayPayRef.current.value,
                        employee.legalAmount
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.sundayAmount = value;
                      } else {
                        employee.sundayAmount = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      restOTPayRef.current.value = checkChange(
                        restOTPayRef.current.value,
                        employee.sundayAmount
                      );
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
                    style={{ fontWeight: "bolder", color: "red" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.lateAmount = value;
                      } else {
                        employee.lateAmount = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      lateDeducRef.current.value = checkChange(
                        lateDeducRef.current.value,
                        employee.lateAmount
                      );
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
                    style={{ fontWeight: "bolder", color: "red" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.absentAmount = value;
                      } else {
                        employee.absentAmount = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      absDeducRef.current.value = checkChange(
                        absDeducRef.current.value,
                        employee.absentAmount
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.leaveAmount = value;
                      } else {
                        employee.leaveAmount = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      leaveCreditsRef.current.value = checkChange(
                        leaveCreditsRef.current.value,
                        employee.leaveAmount ? employee.leaveAmount : 0
                      );
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
                    style={{ fontWeight: "bolder", color: "red" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.otherAmount = value;
                      } else {
                        employee.otherAmount = 0;
                      }
                      reComputeGross();
                    }}
                    onBlur={(event) => {
                      otherCompRef.current.value = checkChange(
                        otherCompRef.current.value,
                        employee.otherAmount
                      );
                    }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row} style={{ marginTop: "20px" }}>
                <FormLabel column sm="4" className="noWrapText">
                  On leave
                </FormLabel>
                <Col>
                  <Form.Check
                    ref={leaveRef}
                    disabled
                    style={{ paddingTop: "5px" }}
                    // onChange={(event) => checkToggle(event)}
                  ></Form.Check>
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.tax = value;
                      } else {
                        employee.tax = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      withHoldTaxRef.current.value = checkChange2(
                        withHoldTaxRef.current.value,
                        employee.tax
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.sssLoanRef = value;
                      } else {
                        employee.sss = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      sssPremRef.current.value = checkChange2(
                        sssPremRef.current.value,
                        employee.sss
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.philHealth = value;
                      } else {
                        employee.philHealth = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      philhealthPremRef.current.value = checkChange2(
                        philhealthPremRef.current.value,
                        employee.philHealth
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.pagibig = value;
                      } else {
                        employee.pagibig = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      pagibigPremRef.current.value = checkChange2(
                        pagibigPremRef.current.value,
                        employee.pagibig
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.coop = value;
                      } else {
                        employee.coop = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      hmoRef.current.value = checkChange2(
                        hmoRef.current.value,
                        employee.coop
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.fakeOver = value;
                      } else {
                        employee.fakeOver = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      fakeOverRef.current.value = checkChange2(
                        fakeOverRef.current.value,
                        employee.fakeOver
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.promisoryNote = value;
                      } else {
                        employee.promisoryNote = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      promisoryRef.current.value = checkChange2(
                        promisoryRef.current.value,
                        employee.promisoryNote
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.sssloan = value;
                      } else {
                        employee.sssloan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      sssLoanRef.current.value = checkChange2(
                        sssLoanRef.current.value,
                        employee.sssloan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.calamityLoan = value;
                      } else {
                        employee.calamityLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      promisoryNoteRef.current.value = checkChange2(
                        promisoryNoteRef.current.value,
                        employee.calamityLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.pagibigLoan = value;
                      } else {
                        employee.pagibigLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      pagibigRef.current.value = checkChange2(
                        pagibigRef.current.value,
                        employee.pagibigLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.storageLoan = value;
                      } else {
                        employee.storageLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      storageRef.current.value = checkChange2(
                        storageRef.current.value,
                        employee.storageLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.housingLoan = value;
                      } else {
                        employee.housingLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      stPeterRef.current.value = checkChange2(
                        stPeterRef.current.value,
                        employee.housingLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.emergencyLoan = value;
                      } else {
                        employee.emergencyLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      emergencyRef.current.value = checkChange2(
                        emergencyRef.current.value,
                        employee.emergencyLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.coopLoan = value;
                      } else {
                        employee.coopLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      layAwayRef.current.value = checkChange2(
                        layAwayRef.current.value,
                        employee.coopLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.personalLoan = value;
                      } else {
                        employee.personalLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      personalRef.current.value = checkChange2(
                        personalRef.current.value,
                        employee.personalLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.otherLoan = value;
                      } else {
                        employee.otherLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      lifeInsRef.current.value = checkChange2(
                        lifeInsRef.current.value,
                        employee.otherLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.cashBondLoan = value;
                      } else {
                        employee.cashBondLoan = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      cspsmcsRef.current.value = checkChange2(
                        cspsmcsRef.current.value,
                        employee.cashBondLoan
                      );
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
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      if (!isNaN(parseFloat(value))) {
                        employee.otherDeduction = value;
                      } else {
                        employee.otherDeduction = 0;
                      }
                      reComputeDeduction();
                    }}
                    onBlur={(event) => {
                      otherDeducRef.current.value = checkChange2(
                        otherDeducRef.current.value,
                        employee.otherDeduction
                      );
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
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      SALARY ADJUSTMENT
                    </FormLabel>
                    <Col sm="1">
                      <input
                        disabled
                        value={numberFormat(employee.increase)}
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
                      column
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      BASIC PAY
                    </FormLabel>
                    <Col sm="1">
                      {/* <label className="blackText3">0000</label> */}
                      <input
                        disabled
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
                      <input
                        disabled
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
                      <input
                        disabled
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
                      <input
                        disabled
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
                      <input
                        disabled
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
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      Leave Balance
                    </FormLabel>
                    <Col sm="2">
                      <input
                        disabled
                        value={employee.presentLeave}
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
                      column
                      sm="7"
                      className={("noWrapText", "blackText")}
                    >
                      COLA (13)
                    </FormLabel>
                    <Col sm="1">
                      <input
                        disabled
                        value={numberFormat(employee.cola)}
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
                      Per Day
                    </FormLabel>
                    <Col sm="2">
                      <input
                        disabled
                        value={numberFormat(((employee.cola * 2) / 313) * 12)}
                        className={" currency"}
                        style={{
                          marginTop: "5px",
                          width: "100px",
                          borderStyle: "none",
                        }}
                      ></input>
                    </Col>
                  </FormGroup>
                </Card>
              </FormGroup>

              {/* ############################################################### */}
              {/* ############################################################### */}
              {/* ############################################################### */}

              <FormGroup as={Row}>
                <label style={{ color: "yellow" }}>
                  Please input in Day/s, Hour/s, Minute/s{" "}
                </label>
                <FormLabel column sm="5" className="noWrapText">
                  Vacation Leave (Day/s)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={vacLeaveRef}
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="5" className="noWrapText">
                  Late (Minute/s)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={lateRef}
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder", color: "red" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      employee.late = value;
                      lateDeducRef.current.value = numberFormat(
                        event.target.value *
                          removePesoComma(perMinRef.current.value)
                      );
                      employee.lateAmount = (
                        event.target.value *
                        removePesoComma(perMinRef.current.value)
                      ).toFixed(2);
                      reComputeGross();
                    }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="5" className="noWrapText">
                  Absent (Day/s)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={absentRef}
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder", color: "red" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      employee.absent = value;
                      employee.absentAmount =
                        event.target.value *
                        removePesoComma(perDayRef.current.value);
                      absDeducRef.current.value = numberFormat(
                        employee.absentAmount
                      );
                      reComputeGross();
                    }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="5" className="noWrapText">
                  Over Time (Hour/s)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={overTimeRef}
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      employee.ot = value;
                      employee.otamount =
                        event.target.value *
                        removePesoComma(perHourRef.current.value);
                      otpayRef.current.value = numberFormat(employee.otamount);
                      reComputeGross();
                    }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="5" className="noWrapText">
                  Special/Reg. Hol (Day/s)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={srHolRef}
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      employee.special = value;
                      employee.specialAmount =
                        event.target.value *
                        removePesoComma(perDayRef.current.value);
                      srHolidayPayRef.current.value = numberFormat(
                        employee.specialAmount
                      );
                      reComputeGross();
                    }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="5" className="noWrapText">
                  Legal Holiday (Day/s)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={legHolRef}
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      employee.legal = value;
                      employee.legalAmount =
                        event.target.value *
                        removePesoComma(perDayRef.current.value);
                      legHolidayPayRef.current.value = numberFormat(
                        employee.legalAmount
                      );
                      reComputeGross();
                    }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="5" className="noWrapText">
                  Rest Sunday (Day/s)
                </FormLabel>
                <Col>
                  <FormControl
                    ref={restSunRef}
                    className="inpHeightXs currency2"
                    style={{ fontWeight: "bolder" }}
                    onFocus={(event) => event.target.select()}
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                      employee.sunday = value;
                      employee.sundayAmount =
                        event.target.value *
                        removePesoComma(perDayRef.current.value);
                      restOTPayRef.current.value = numberFormat(
                        employee.sundayAmount
                      );
                      reComputeGross();
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
                        disabled
                        style={{
                          fontWeight: "bolder",
                          marginTop: "2px",
                          paddingRight: "10px",
                          fontSize: "medium",
                          width: "175px",
                          color: "black",
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
                        disabled
                        style={{
                          fontWeight: "bolder",
                          marginTop: "2px",
                          paddingRight: "10px",
                          fontSize: "medium",
                          width: "145px",
                          color: "black",
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
                        disabled
                        style={{
                          fontWeight: "bolder",
                          marginTop: "2px",
                          paddingRight: "10px",
                          fontSize: "medium",
                          width: "165px",
                          color: "black",
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
                    onClick={() => save()}
                  >
                    Save
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
