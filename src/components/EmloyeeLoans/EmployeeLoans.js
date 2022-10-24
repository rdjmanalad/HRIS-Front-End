import React, { useRef, useState, useEffect } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
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
  const [loans, setLoans] = useState("");

  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
  const [loading, setL] = useState(true);
  var per1 = localStorage.getItem("PPFrom");
  var per2 = localStorage.getItem("PPTo");
  var gcode = localStorage.getItem("FilterValue");

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

  var sssb = false;

  function showOnDetails() {
    employeeNoRef.current.value = employee.employeeNo;
    branchRef.current.value = employee.abranchCode;
    lastNameRef.current.value = employee.lastName;
    firstNameRef.current.value = employee.firstName;
    middleNameRef.current.value = employee.middleName;
    periodRef.current.value = per1 + " to " + per2;
    var len = employee.loan?.length;
    var loanArr = employee.loan;
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        if (employee.loan[i].loanType === "SSS") {
          sssb = true;
          sssSDRef.current.value = loanArr[i].startDate;
          sssEDRef.current.value = loanArr[i].endDate;
          sssCapRef.current.value = numberFormat(loanArr[i].capital);
          sssAmorRef.current.value = numberFormat(loanArr[i].amortization);
          sssBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          sssSDRef.current.value = "";
          sssEDRef.current.value = "";
          sssCapRef.current.value = numberFormat(0);
          sssAmorRef.current.value = numberFormat(0);
          sssBalRef.current.value = numberFormat(0);
          sssSDRef.current.style.color = "grey";
          sssEDRef.current.style.color = "grey";
          sssCapRef.current.style.color = "grey";
          sssAmorRef.current.style.color = "grey";
          sssBalRef.current.style.color = "grey";
        }

        if (employee.loan[i].loanType === "HOUSING") {
          pagSDRef.current.value = loanArr[i].startDate;
          pagEDRef.current.value = loanArr[i].endDate;
          pagCapRef.current.value = numberFormat(loanArr[i].capital);
          pagAmorRef.current.value = numberFormat(loanArr[i].amortization);
          pagBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          pagSDRef.current.value = "";
          pagEDRef.current.value = "";
          pagCapRef.current.value = numberFormat(0);
          pagAmorRef.current.value = numberFormat(0);
          pagBalRef.current.value = numberFormat(0);
          pagEDRef.current.style.color = "grey";
          pagSDRef.current.style.color = "grey";
          pagCapRef.current.style.color = "grey";
          pagAmorRef.current.style.color = "grey";
          pagBalRef.current.style.color = "grey";
        }

        if (employee.loan[i].loanType === "HOUSING") {
          spSDRef.current.value = loanArr[i].startDate;
          spEDRef.current.value = loanArr[i].endDate;
          spCapRef.current.value = numberFormat(loanArr[i].capital);
          spAmorRef.current.value = numberFormat(loanArr[i].amortization);
          spBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          spSDRef.current.value = "";
          spEDRef.current.value = "";
          spCapRef.current.value = numberFormat(0);
          spAmorRef.current.value = numberFormat(0);
          spBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          plSDRef.current.value = loanArr[i].startDate;
          plEDRef.current.value = loanArr[i].endDate;
          plCapRef.current.value = numberFormat(loanArr[i].capital);
          plAmorRef.current.value = numberFormat(loanArr[i].amortization);
          plBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          plSDRef.current.value = "";
          plEDRef.current.value = "";
          plCapRef.current.value = numberFormat(0);
          plAmorRef.current.value = numberFormat(0);
          plBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          emerSDRef.current.value = loanArr[i].startDate;
          emerEDRef.current.value = loanArr[i].endDate;
          emerCapRef.current.value = numberFormat(loanArr[i].capital);
          emerAmorRef.current.value = numberFormat(loanArr[i].amortization);
          emerBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          emerSDRef.current.value = "";
          emerEDRef.current.value = "";
          emerCapRef.current.value = numberFormat(0);
          emerAmorRef.current.value = numberFormat(0);
          emerBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          foSDRef.current.value = loanArr[i].startDate;
          foEDRef.current.value = loanArr[i].endDate;
          foCapRef.current.value = numberFormat(loanArr[i].capital);
          foAmorRef.current.value = numberFormat(loanArr[i].amortization);
          foBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          foSDRef.current.value = "";
          foEDRef.current.value = "";
          foCapRef.current.value = numberFormat(0);
          foAmorRef.current.value = numberFormat(0);
          foBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          storSDRef.current.value = loanArr[i].startDate;
          storEDRef.current.value = loanArr[i].endDate;
          storCapRef.current.value = numberFormat(loanArr[i].capital);
          storAmorRef.current.value = numberFormat(loanArr[i].amortization);
          storBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          storSDRef.current.value = "";
          storEDRef.current.value = "";
          storCapRef.current.value = numberFormat(0);
          storAmorRef.current.value = numberFormat(0);
          storBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          pnSDRef.current.value = loanArr[i].startDate;
          pnEDRef.current.value = loanArr[i].endDate;
          pnCapRef.current.value = numberFormat(loanArr[i].capital);
          pnAmorRef.current.value = numberFormat(loanArr[i].amortization);
          pnBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          pnSDRef.current.value = "";
          pnEDRef.current.value = "";
          pnCapRef.current.value = numberFormat(0);
          pnAmorRef.current.value = numberFormat(0);
          pnBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          lapSDRef.current.value = loanArr[i].startDate;
          lapEDRef.current.value = loanArr[i].endDate;
          lapCapRef.current.value = numberFormat(loanArr[i].capital);
          lapAmorRef.current.value = numberFormat(loanArr[i].amortization);
          lapBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          lapSDRef.current.value = "";
          lapEDRef.current.value = "";
          lapCapRef.current.value = numberFormat(0);
          lapAmorRef.current.value = numberFormat(0);
          lapBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          perSDRef.current.value = loanArr[i].startDate;
          perEDRef.current.value = loanArr[i].endDate;
          perCapRef.current.value = numberFormat(loanArr[i].capital);
          perAmorRef.current.value = numberFormat(loanArr[i].amortization);
          perBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          perSDRef.current.value = "";
          perEDRef.current.value = "";
          perCapRef.current.value = numberFormat(0);
          perAmorRef.current.value = numberFormat(0);
          perBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          liSDRef.current.value = loanArr[i].startDate;
          liEDRef.current.value = loanArr[i].endDate;
          liCapRef.current.value = numberFormat(loanArr[i].capital);
          liAmorRef.current.value = numberFormat(loanArr[i].amortization);
          liBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          liSDRef.current.value = "";
          liEDRef.current.value = "";
          liCapRef.current.value = numberFormat(0);
          liAmorRef.current.value = numberFormat(0);
          liBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          hmoSDRef.current.value = loanArr[i].startDate;
          hmoEDRef.current.value = loanArr[i].endDate;
          hmoCapRef.current.value = numberFormat(loanArr[i].capital);
          hmoAmorRef.current.value = numberFormat(loanArr[i].amortization);
          hmoBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          hmoSDRef.current.value = "";
          hmoEDRef.current.value = "";
          hmoCapRef.current.value = numberFormat(0);
          hmoAmorRef.current.value = numberFormat(0);
          hmoBalRef.current.value = numberFormat(0);
        }

        if (employee.loan[i].loanType === "HOUSING") {
          cpmSDRef.current.value = loanArr[i].startDate;
          cpmEDRef.current.value = loanArr[i].endDate;
          cpmCapRef.current.value = numberFormat(loanArr[i].capital);
          cpmAmorRef.current.value = numberFormat(loanArr[i].amortization);
          cpmBalRef.current.value = numberFormat(loanArr[i].balance);
        } else {
          cpmSDRef.current.value = "";
          cpmEDRef.current.value = "";
          cpmCapRef.current.value = numberFormat(0);
          cpmAmorRef.current.value = numberFormat(0);
          cpmBalRef.current.value = numberFormat(0);
        }
      }
    } else {
      sssSDRef.current.value = "";
      sssEDRef.current.value = "";
      sssCapRef.current.value = numberFormat(0);
      sssAmorRef.current.value = numberFormat(0);
      sssBalRef.current.value = numberFormat(0);
      sssSDRef.current.style.color = "grey";
      sssEDRef.current.style.color = "grey";
      sssCapRef.current.style.color = "grey";
      sssAmorRef.current.style.color = "grey";
      sssBalRef.current.style.color = "grey";

      pagSDRef.current.value = "";
      pagEDRef.current.value = "";
      pagCapRef.current.value = numberFormat(0);
      pagAmorRef.current.value = numberFormat(0);
      pagBalRef.current.value = numberFormat(0);
      pagEDRef.current.style.color = "grey";
      pagSDRef.current.style.color = "grey";
      pagCapRef.current.style.color = "grey";
      pagAmorRef.current.style.color = "grey";
      pagBalRef.current.style.color = "grey";

      spSDRef.current.value = "";
      spEDRef.current.value = "";
      spCapRef.current.value = numberFormat(0);
      spAmorRef.current.value = numberFormat(0);
      spBalRef.current.value = numberFormat(0);
      spEDRef.current.style.color = "grey";
      spSDRef.current.style.color = "grey";
      spCapRef.current.style.color = "grey";
      spAmorRef.current.style.color = "grey";
      spBalRef.current.style.color = "grey";

      plSDRef.current.value = "";
      plEDRef.current.value = "";
      plCapRef.current.value = numberFormat(0);
      plAmorRef.current.value = numberFormat(0);
      plBalRef.current.value = numberFormat(0);
      plEDRef.current.style.color = "grey";
      plSDRef.current.style.color = "grey";
      plCapRef.current.style.color = "grey";
      plAmorRef.current.style.color = "grey";
      plBalRef.current.style.color = "grey";

      emerSDRef.current.value = "";
      emerEDRef.current.value = "";
      emerCapRef.current.value = numberFormat(0);
      emerAmorRef.current.value = numberFormat(0);
      emerBalRef.current.value = numberFormat(0);
      emerEDRef.current.style.color = "grey";
      emerSDRef.current.style.color = "grey";
      emerCapRef.current.style.color = "grey";
      emerAmorRef.current.style.color = "grey";
      emerBalRef.current.style.color = "grey";

      storSDRef.current.value = "";
      storEDRef.current.value = "";
      storCapRef.current.value = numberFormat(0);
      storAmorRef.current.value = numberFormat(0);
      storBalRef.current.value = numberFormat(0);
      storEDRef.current.style.color = "grey";
      storSDRef.current.style.color = "grey";
      storCapRef.current.style.color = "grey";
      storAmorRef.current.style.color = "grey";
      storBalRef.current.style.color = "grey";

      foSDRef.current.value = "";
      foEDRef.current.value = "";
      foCapRef.current.value = numberFormat(0);
      foAmorRef.current.value = numberFormat(0);
      foBalRef.current.value = numberFormat(0);
      foEDRef.current.style.color = "grey";
      foSDRef.current.style.color = "grey";
      foCapRef.current.style.color = "grey";
      foAmorRef.current.style.color = "grey";
      foBalRef.current.style.color = "grey";

      pnSDRef.current.value = "";
      pnEDRef.current.value = "";
      pnCapRef.current.value = numberFormat(0);
      pnAmorRef.current.value = numberFormat(0);
      pnBalRef.current.value = numberFormat(0);
      pnEDRef.current.style.color = "grey";
      pnSDRef.current.style.color = "grey";
      pnCapRef.current.style.color = "grey";
      pnAmorRef.current.style.color = "grey";
      pnBalRef.current.style.color = "grey";

      lapSDRef.current.value = "";
      lapEDRef.current.value = "";
      lapCapRef.current.value = numberFormat(0);
      lapAmorRef.current.value = numberFormat(0);
      lapBalRef.current.value = numberFormat(0);
      lapEDRef.current.style.color = "grey";
      lapSDRef.current.style.color = "grey";
      lapCapRef.current.style.color = "grey";
      lapAmorRef.current.style.color = "grey";
      lapBalRef.current.style.color = "grey";

      perSDRef.current.value = "";
      perEDRef.current.value = "";
      perCapRef.current.value = numberFormat(0);
      perAmorRef.current.value = numberFormat(0);
      perBalRef.current.value = numberFormat(0);
      perEDRef.current.style.color = "grey";
      perSDRef.current.style.color = "grey";
      perCapRef.current.style.color = "grey";
      perAmorRef.current.style.color = "grey";
      perBalRef.current.style.color = "grey";

      liSDRef.current.value = "";
      liEDRef.current.value = "";
      liCapRef.current.value = numberFormat(0);
      liAmorRef.current.value = numberFormat(0);
      liBalRef.current.value = numberFormat(0);
      liEDRef.current.style.color = "grey";
      liSDRef.current.style.color = "grey";
      liCapRef.current.style.color = "grey";
      liAmorRef.current.style.color = "grey";
      liBalRef.current.style.color = "grey";

      hmoSDRef.current.value = "";
      hmoEDRef.current.value = "";
      hmoCapRef.current.value = numberFormat(0);
      hmoAmorRef.current.value = numberFormat(0);
      hmoBalRef.current.value = numberFormat(0);
      hmoEDRef.current.style.color = "grey";
      hmoSDRef.current.style.color = "grey";
      hmoCapRef.current.style.color = "grey";
      hmoAmorRef.current.style.color = "grey";
      hmoBalRef.current.style.color = "grey";

      cpmSDRef.current.value = "";
      cpmEDRef.current.value = "";
      cpmCapRef.current.value = numberFormat(0);
      cpmAmorRef.current.value = numberFormat(0);
      cpmBalRef.current.value = numberFormat(0);
      cpmEDRef.current.style.color = "grey";
      cpmSDRef.current.style.color = "grey";
      cpmCapRef.current.style.color = "grey";
      cpmAmorRef.current.style.color = "grey";
      cpmBalRef.current.style.color = "grey";
    }

    setLen(loans.length);
  }

  const resetToBlack = () => {
    cpmEDRef.current.style.color = "black";
    cpmSDRef.current.style.color = "black";
    cpmCapRef.current.style.color = "black";
    cpmAmorRef.current.style.color = "black";
    cpmBalRef.current.style.color = "black";
    hmoEDRef.current.style.color = "black";
    hmoSDRef.current.style.color = "black";
    hmoCapRef.current.style.color = "black";
    hmoAmorRef.current.style.color = "black";
    hmoBalRef.current.style.color = "black";
    liEDRef.current.style.color = "black";
    liSDRef.current.style.color = "black";
    liCapRef.current.style.color = "black";
    liAmorRef.current.style.color = "black";
    liBalRef.current.style.color = "black";
    perEDRef.current.style.color = "black";
    perSDRef.current.style.color = "black";
    perCapRef.current.style.color = "black";
    perAmorRef.current.style.color = "black";
    perBalRef.current.style.color = "black";
    lapEDRef.current.style.color = "black";
    lapSDRef.current.style.color = "black";
    lapCapRef.current.style.color = "black";
    lapAmorRef.current.style.color = "black";
    lapBalRef.current.style.color = "black";
    pnEDRef.current.style.color = "black";
    pnSDRef.current.style.color = "black";
    pnCapRef.current.style.color = "black";
    pnAmorRef.current.style.color = "black";
    pnBalRef.current.style.color = "black";
    foEDRef.current.style.color = "black";
    foSDRef.current.style.color = "black";
    foCapRef.current.style.color = "black";
    foAmorRef.current.style.color = "black";
    foBalRef.current.style.color = "black";
    storEDRef.current.style.color = "black";
    storSDRef.current.style.color = "black";
    storCapRef.current.style.color = "black";
    storAmorRef.current.style.color = "black";
    storBalRef.current.style.color = "black";
    emerEDRef.current.style.color = "black";
    emerSDRef.current.style.color = "black";
    emerCapRef.current.style.color = "black";
    emerAmorRef.current.style.color = "black";
    emerBalRef.current.style.color = "black";
    plEDRef.current.style.color = "black";
    plSDRef.current.style.color = "black";
    plCapRef.current.style.color = "black";
    plAmorRef.current.style.color = "black";
    plBalRef.current.style.color = "black";
    spEDRef.current.style.color = "black";
    spSDRef.current.style.color = "black";
    spCapRef.current.style.color = "black";
    spAmorRef.current.style.color = "black";
    spBalRef.current.style.color = "black";
    pagEDRef.current.style.color = "black";
    pagSDRef.current.style.color = "black";
    pagCapRef.current.style.color = "black";
    pagAmorRef.current.style.color = "black";
    pagBalRef.current.style.color = "black";
    sssSDRef.current.style.color = "black";
    sssEDRef.current.style.color = "black";
    sssCapRef.current.style.color = "black";
    sssAmorRef.current.style.color = "black";
    sssBalRef.current.style.color = "black";
  };

  useEffect(() => {
    resetToBlack();
    showOnDetails();
  }, [employee]);

  useEffect(() => {
    getData();
  }, []);

  // const getData = () => {
  //   axios.defaults.headers.common["Authorization"] =
  //     "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

  //   axios.get("http://localhost:8080/api/vloan").then((response) => {
  //     setLoans(response.data);
  //     console.log(response.data);
  //   });
  // };

  const getData = () => {
    if (gcode) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

      axios
        .get("http://localhost:8080/api/loan/emploan/" + gcode)
        .then((response) => {
          setL(false);
          setLoans(response.data);
          console.log(response.data);
        });
    } else {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

      axios.get("http://localhost:8080/api/loan/emploan").then((response) => {
        setL(false);
        setLoans(response.data);
        console.log(response.data);
      });
    }
  };
  const handleClose = () => {
    setShow(false);
    showOnDetails();
  };
  const handleShow = () => {
    setShow(true);
    // setToggle(true);
  };

  const nextEmp = () => {
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    if (index < len - 1) {
      setEmployee(loans[index + 1]);
      setIndex(index + 1);
      // showOnDetails();
    }
  };

  const prevEmp = () => {
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    if (index > 0) {
      setEmployee(loans[index - 1]);
      setIndex(index - 1);
      // showOnDetails();
    }
  };

  const firstEmp = () => {
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    setEmployee(loans[0]);
    setIndex(0);
    showOnDetails();
  };

  const lastEmp = () => {
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    setEmployee(loans[len - 1]);
    setEmployee(loans[len - 1]);
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
        {row.lastName}, {row.firstName}
        {"   "}
        <a style={{ color: "blue" }}>{row.employeeNo}</a>
      </span>
    );
  };

  function nameFilterFormatter(cell, row) {
    return row.lastName + row.firstName + row.employeeNo;
  }

  const rowEvents = {
    // clickToSelect: true,
    onDoubleClick: (row, isSelect, rowIndex, e) => {
      handleClose();
    },
  };

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setEmployee(row);
      setIndex(rowIndex);
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
                  keyField="employeeNo"
                  data={loans}
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
                <FormGroup as={Row} className={"loansRowColor"}>
                  <FormLabel column sm="2" className="noWrapText">
                    SSS Loan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={sssSDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pagEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pagCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pagAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pagBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={spEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={spCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={spAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={spBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={plEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={plCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={plAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={plBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={emerEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={emerCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={emerAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={emerBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={foEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={foCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={foAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={foBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={storEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={storCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={storAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={storBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pnEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pnCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pnAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={pnBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={lapEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={lapCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={lapAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={lapBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={perEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={perCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={perAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={perBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={liEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={liCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={liAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={liBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={hmoEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={hmoCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={hmoAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={hmoBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
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
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={cpmEDRef}
                      className="inpHeightXs"
                      disabled
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={cpmCapRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={cpmAmorRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={cpmBalRef}
                      className="inpHeightXs"
                      disabled
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
            </FormGroup>
            <label className="separator"></label>
            <FormGroup as={Row}>
              <Col sm="7"></Col>
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
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
