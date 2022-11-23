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

  const [setSSS, setSetSSS] = useState("");

  var setArray = {
    id: "",
    loanType: "",
    employeeNo: "",
    startDate: "",
    endDate: "",
    capital: "",
    amortization: "",
    balance: "",
    transactNo: "",
    origEndDate: "",
  };

  //var setSSS = setArray;
  var setPagibig = setArray;
  var setHousing = setArray; //st peter
  var setPromisory = setArray; //promisory loan
  var setEmergency = setArray;
  var setFake = setArray;
  var setStorage = setArray;
  var setCalamity = setArray; // promisory note
  var setCoop = setArray; //lay away
  var setPersonal = setArray;
  var setOther = setArray; // life insurance
  var setHRM = setArray;
  var setCash = setArray; //CS/PS/MS

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
    setToMute();
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        if (employee.loan[i].loanType === "SSS") {
          sssb = true;
          setSetSSS(employee.loan[i]);
          console.log(setSSS);
          sssSDRef.current.value = loanArr[i].startDate;
          sssEDRef.current.value = loanArr[i].endDate;
          sssCapRef.current.value = numberFormat(loanArr[i].capital);
          sssAmorRef.current.value = numberFormat(loanArr[i].amortization);
          sssBalRef.current.value = numberFormat(loanArr[i].balance);
          sssSDRef.current.style.color = "blue";
          sssEDRef.current.style.color = "blue";
          sssCapRef.current.style.color = "blue";
          sssAmorRef.current.style.color = "blue";
          sssBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "PAGIBIG") {
          pagSDRef.current.value = loanArr[i].startDate;
          pagEDRef.current.value = loanArr[i].endDate;
          pagCapRef.current.value = numberFormat(loanArr[i].capital);
          pagAmorRef.current.value = numberFormat(loanArr[i].amortization);
          pagBalRef.current.value = numberFormat(loanArr[i].balance);
          pagEDRef.current.style.color = "blue";
          pagSDRef.current.style.color = "blue";
          pagCapRef.current.style.color = "blue";
          pagAmorRef.current.style.color = "blue";
          pagBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "HOUSING") {
          setHousing = employee.loan;
          console.log(setHousing);
          spSDRef.current.value = loanArr[i].startDate;
          spEDRef.current.value = loanArr[i].endDate;
          spCapRef.current.value = numberFormat(loanArr[i].capital);
          spAmorRef.current.value = numberFormat(loanArr[i].amortization);
          spBalRef.current.value = numberFormat(loanArr[i].balance);
          spSDRef.current.style.color = "blue";
          spEDRef.current.style.color = "blue";
          spCapRef.current.style.color = "blue";
          spAmorRef.current.style.color = "blue";
          spBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "PROMISORY") {
          setPromisory = employee.loan;
          plSDRef.current.value = loanArr[i].startDate;
          plEDRef.current.value = loanArr[i].endDate;
          plCapRef.current.value = numberFormat(loanArr[i].capital);
          plAmorRef.current.value = numberFormat(loanArr[i].amortization);
          plBalRef.current.value = numberFormat(loanArr[i].balance);
          plSDRef.current.style.color = "blue";
          plEDRef.current.style.color = "blue";
          plCapRef.current.style.color = "blue";
          plAmorRef.current.style.color = "blue";
          plBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "EMERGENCY") {
          setEmergency = employee.loan;
          emerSDRef.current.value = loanArr[i].startDate;
          emerEDRef.current.value = loanArr[i].endDate;
          emerCapRef.current.value = numberFormat(loanArr[i].capital);
          emerAmorRef.current.value = numberFormat(loanArr[i].amortization);
          emerBalRef.current.value = numberFormat(loanArr[i].balance);
          emerSDRef.current.style.color = "blue";
          emerEDRef.current.style.color = "blue";
          emerCapRef.current.style.color = "blue";
          emerAmorRef.current.style.color = "blue";
          emerBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "FAKE") {
          setFake = employee.loan;
          foSDRef.current.value = loanArr[i].startDate;
          foEDRef.current.value = loanArr[i].endDate;
          foCapRef.current.value = numberFormat(loanArr[i].capital);
          foAmorRef.current.value = numberFormat(loanArr[i].amortization);
          foBalRef.current.value = numberFormat(loanArr[i].balance);
          foSDRef.current.style.color = "blue";
          foEDRef.current.style.color = "blue";
          foCapRef.current.style.color = "blue";
          foAmorRef.current.style.color = "blue";
          foBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "STORAGE") {
          setStorage = employee.loan;
          storSDRef.current.value = loanArr[i].startDate;
          storEDRef.current.value = loanArr[i].endDate;
          storCapRef.current.value = numberFormat(loanArr[i].capital);
          storAmorRef.current.value = numberFormat(loanArr[i].amortization);
          storBalRef.current.value = numberFormat(loanArr[i].balance);
          storSDRef.current.style.color = "blue";
          storEDRef.current.style.color = "blue";
          storCapRef.current.style.color = "blue";
          storAmorRef.current.style.color = "blue";
          storBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "CALAMITY") {
          setCalamity = employee.loan;
          pnSDRef.current.value = loanArr[i].startDate;
          pnEDRef.current.value = loanArr[i].endDate;
          pnCapRef.current.value = numberFormat(loanArr[i].capital);
          pnAmorRef.current.value = numberFormat(loanArr[i].amortization);
          pnBalRef.current.value = numberFormat(loanArr[i].balance);
          pnSDRef.current.style.color = "blue";
          pnEDRef.current.style.color = "blue";
          pnCapRef.current.style.color = "blue";
          pnAmorRef.current.style.color = "blue";
          pnBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "COOP") {
          setCoop = employee.loan;
          lapSDRef.current.value = loanArr[i].startDate;
          lapEDRef.current.value = loanArr[i].endDate;
          lapCapRef.current.value = numberFormat(loanArr[i].capital);
          lapAmorRef.current.value = numberFormat(loanArr[i].amortization);
          lapBalRef.current.value = numberFormat(loanArr[i].balance);
          lapSDRef.current.style.color = "blue";
          lapEDRef.current.style.color = "blue";
          lapCapRef.current.style.color = "blue";
          lapAmorRef.current.style.color = "blue";
          lapBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "PERSONAL") {
          setPersonal = employee.loan;
          perSDRef.current.value = loanArr[i].startDate;
          perEDRef.current.value = loanArr[i].endDate;
          perCapRef.current.value = numberFormat(loanArr[i].capital);
          perAmorRef.current.value = numberFormat(loanArr[i].amortization);
          perBalRef.current.value = numberFormat(loanArr[i].balance);
          perSDRef.current.style.color = "blue";
          perEDRef.current.style.color = "blue";
          perCapRef.current.style.color = "blue";
          perAmorRef.current.style.color = "blue";
          perBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "OTHER") {
          setOther = employee.loan;
          liSDRef.current.value = loanArr[i].startDate;
          liEDRef.current.value = loanArr[i].endDate;
          liCapRef.current.value = numberFormat(loanArr[i].capital);
          liAmorRef.current.value = numberFormat(loanArr[i].amortization);
          liBalRef.current.value = numberFormat(loanArr[i].balance);
          liSDRef.current.style.color = "blue";
          liEDRef.current.style.color = "blue";
          liCapRef.current.style.color = "blue";
          liAmorRef.current.style.color = "blue";
          liBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "HRM") {
          setHRM = employee.loan;
          hmoSDRef.current.value = loanArr[i].startDate;
          hmoEDRef.current.value = loanArr[i].endDate;
          hmoCapRef.current.value = numberFormat(loanArr[i].capital);
          hmoAmorRef.current.value = numberFormat(loanArr[i].amortization);
          hmoBalRef.current.value = numberFormat(loanArr[i].balance);
          hmoSDRef.current.style.color = "blue";
          hmoEDRef.current.style.color = "blue";
          hmoCapRef.current.style.color = "blue";
          hmoAmorRef.current.style.color = "blue";
          hmoBalRef.current.style.color = "blue";
        }

        if (employee.loan[i].loanType === "CASH") {
          setCash = employee.loan;
          cpmSDRef.current.value = loanArr[i].startDate;
          cpmEDRef.current.value = loanArr[i].endDate;
          cpmCapRef.current.value = numberFormat(loanArr[i].capital);
          cpmAmorRef.current.value = numberFormat(loanArr[i].amortization);
          cpmBalRef.current.value = numberFormat(loanArr[i].balance);
          cpmSDRef.current.style.color = "blue";
          cpmEDRef.current.style.color = "blue";
          cpmCapRef.current.style.color = "blue";
          cpmAmorRef.current.style.color = "blue";
          cpmBalRef.current.style.color = "blue";
        }
      }
    }

    setLen(loans.length);
  }

  const setToMute = () => {
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
  };

  const resetToBlack = () => {
    cpmEDRef.current.style.color = "blue";
    cpmSDRef.current.style.color = "blue";
    cpmCapRef.current.style.color = "blue";
    cpmAmorRef.current.style.color = "blue";
    cpmBalRef.current.style.color = "blue";
    hmoEDRef.current.style.color = "blue";
    hmoSDRef.current.style.color = "blue";
    hmoCapRef.current.style.color = "blue";
    hmoAmorRef.current.style.color = "blue";
    hmoBalRef.current.style.color = "blue";
    liEDRef.current.style.color = "blue";
    liSDRef.current.style.color = "blue";
    liCapRef.current.style.color = "blue";
    liAmorRef.current.style.color = "blue";
    liBalRef.current.style.color = "blue";
    perEDRef.current.style.color = "blue";
    perSDRef.current.style.color = "blue";
    perCapRef.current.style.color = "blue";
    perAmorRef.current.style.color = "blue";
    lapEDRef.current.style.color = "blue";
    perBalRef.current.style.color = "blue";
    lapSDRef.current.style.color = "blue";
    lapCapRef.current.style.color = "blue";
    lapAmorRef.current.style.color = "blue";
    lapBalRef.current.style.color = "blue";
    pnEDRef.current.style.color = "blue";
    pnSDRef.current.style.color = "blue";
    pnCapRef.current.style.color = "blue";
    pnAmorRef.current.style.color = "blue";
    pnBalRef.current.style.color = "blue";
    foEDRef.current.style.color = "blue";
    foSDRef.current.style.color = "blue";
    foCapRef.current.style.color = "blue";
    foAmorRef.current.style.color = "blue";
    foBalRef.current.style.color = "blue";
    storEDRef.current.style.color = "blue";
    storSDRef.current.style.color = "blue";
    storCapRef.current.style.color = "blue";
    storAmorRef.current.style.color = "blue";
    storBalRef.current.style.color = "blue";
    emerEDRef.current.style.color = "blue";
    emerSDRef.current.style.color = "blue";
    emerCapRef.current.style.color = "blue";
    emerAmorRef.current.style.color = "blue";
    emerBalRef.current.style.color = "blue";
    plEDRef.current.style.color = "blue";
    plSDRef.current.style.color = "blue";
    plCapRef.current.style.color = "blue";
    plAmorRef.current.style.color = "blue";
    plBalRef.current.style.color = "blue";
    spEDRef.current.style.color = "blue";
    spSDRef.current.style.color = "blue";
    spCapRef.current.style.color = "blue";
    spAmorRef.current.style.color = "blue";
    spBalRef.current.style.color = "blue";

    pagEDRef.current.style.color = "blue";
    pagSDRef.current.style.color = "blue";
    pagCapRef.current.style.color = "blue";
    pagAmorRef.current.style.color = "blue";
    pagBalRef.current.style.color = "blue";

    sssSDRef.current.style.color = "blue";
    sssEDRef.current.style.color = "blue";
    sssCapRef.current.style.color = "blue";
    sssAmorRef.current.style.color = "blue";
    sssBalRef.current.style.color = "blue";
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

  const saveEmpLoan = (setSave) => {
    axios
      .post("http://localhost:8080/api/loan/save", setSave, {
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
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  const normalizeCurrency = (value) => {
    return value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const checkChange = (val, val2) => {
    // alert(val);
    // alert(val2);
    val = val.replaceAll(",", "").replaceAll("₱", "");
    val2 = val.replaceAll(",", "").replaceAll("₱", "");
    var ret = 0;
    ret = val === numberFormat(val2) ? val : numberFormat(val);
    if (val === numberFormat(val2)) {
      ret = val;
    } else {
      reComputeLoan(val);
    }
    return ret;
  };

  const removePesoComma = (val) => {
    return val.substring(1).replaceAll(",", "");
  };

  const reComputeLoan = (type) => {
    if (type === "SSS") {
      if (
        setSSS.startDate != "" &&
        setSSS.endDate != "" &&
        setSSS.capital != ""
      ) {
        var months = monthDiff(setSSS.startDate, setSSS.endDate);
        var cap = setSSS.capital;
        // sssBalRef.current.value = setSSS.capital;
        sssBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        sssAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        sssAmorRef.current.style.color = "blue";
        sssBalRef.current.style.color = "blue";
      }
    }
  };

  const monthDiff = (d1, d2) => {
    var months;
    months = (d2.substring(0, 4) - d1.substring(0, 4)) * 12;
    months -= parseInt(d1.substring(5, 7));
    months += parseInt(d2.substring(5, 7));
    return months <= 0 ? 0 : months;
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

  const save = (type) => {
    alert(type);
    if (type === "SSS") {
      if (setSSS.id === "") {
        setSSS.origEndDate = setSSS.endDate;
        setSSS.loanType = type;
        setSSS.employeeNo = employeeNoRef.current.value;
        setSSS.amortization = removePesoComma(sssAmorRef.current.value);
        setSSS.balance = removePesoComma(sssBalRef.current.value);
        setSSS.transactNo = 0;
      }
      saveEmpLoan(setSSS);
      console.log(setSSS);
    }
  };

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
              EMPLOYEE LOAN INFORMATION
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
                <FormLabel column sm="2" className="noWrapText textCenter">
                  START DATE
                </FormLabel>
                <FormLabel column sm="2" className="noWrapText textCenter">
                  END DATE
                </FormLabel>
                <FormLabel column sm="1" className="noWrapText textCenter">
                  CAPITAL
                </FormLabel>
                <FormLabel column className="noWrapText textCenter">
                  AMORTIZATION
                </FormLabel>
                <FormLabel column sm="1" className="noWrapText textCenter">
                  BALANCE
                </FormLabel>
                <FormLabel column sm="1" className="noWrapText textRight">
                  ACTION
                </FormLabel>
              </FormGroup>
            </Card>
            <FormGroup as={Row} style={{ marginTop: "5px" }}>
              <FormGroup as={Col}>
                <FormGroup as={Row} className={"loansRowColor"}>
                  <FormLabel column sm="2" className="noWrapText">
                    SSS Loan
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={sssSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSSS.startDate = value;
                        sssSDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssEDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSSS.endDate = value;
                        sssEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssCapRef}
                      className="inpHeightXs"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);

                        if (!isNaN(parseFloat(value))) {
                          setSSS.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            sssCapRef.current.style.color = "blue";
                          } else {
                            sssCapRef.current.style.color = "gray";
                          }
                        } else {
                          setSSS.capital = 0;
                          sssCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("SSS");
                      }}
                      onBlur={(event) => {
                        sssCapRef.current.value = checkChange(
                          sssCapRef.current.value,
                          setSSS.capital
                        );
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssAmorRef}
                      className="inpHeightXs"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);

                        if (!isNaN(parseFloat(value))) {
                          setSSS.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            sssAmorRef.current.style.color = "blue";
                          } else {
                            sssAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setSSS.amortization = 0;
                          sssAmorRef.current.style.color = "gray";
                        }
                        reComputeLoan(value);
                      }}
                      onBlur={(event) => {
                        sssAmorRef.current.value = checkChange(
                          sssAmorRef.current.value,
                          setSSS.amortization
                        );
                      }}
                    ></FormControl>
                  </Col>
                  <Col>
                    <FormControl
                      ref={sssBalRef}
                      className="inpHeightXs"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);

                        if (!isNaN(parseFloat(value))) {
                          setSSS.balance = value;
                          if (value > 0) {
                            sssBalRef.current.style.color = "blue";
                          } else {
                            sssBalRef.current.style.color = "gray";
                          }
                        } else {
                          setSSS.balance = 0;
                          sssBalRef.current.style.color = "gray";
                        }
                        reComputeLoan(value);
                      }}
                      onBlur={(event) => {
                        sssBalRef.current.value = checkChange(
                          sssBalRef.current.value,
                          setSSS.balance
                        );
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("SSS")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Pagibig Loan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={pagSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("PAGIBIG")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    St. Peter Loan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={spSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("HOUSING")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Promisory Loan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={plSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("PROMISORY")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Emergency
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={emerSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("EMERGENCY")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Fake / Over
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={foSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("FAKE")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Storage
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={storSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("STORAGE")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Promisory Note
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={pnSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("CALAMITY")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Lay Away Plan
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={lapSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("COOP")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Personal
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={perSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("PERSONAL")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    Life Insurance
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={liSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("OTHER")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    HMO
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={hmoSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("COOP")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>
                <FormGroup as={Row}>
                  <FormLabel column sm="2" className="noWrapText">
                    CS/PS/MS
                  </FormLabel>
                  <Col>
                    <FormControl
                      ref={cpmSDRef}
                      className="inpHeightXs"
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
                      style={{
                        fontWeight: "bolder",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("CASH")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                {/* <label className="separator3"></label> */}
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
