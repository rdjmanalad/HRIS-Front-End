import React, { useRef, useState, useEffect } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import PopUpMsg from "../ModalAlerts/PopUpMsg";
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
  Form,
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
  const [lkpId, setLkpId] = useState(0);
  const baseURL = localStorage.getItem("baseURL");
  var lkpLoanId = 0;
  var per1 = localStorage.getItem("PPFrom");
  var per2 = localStorage.getItem("PPTo");
  var gcode = localStorage.getItem("FilterValue");
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");

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

  const [SSSA, setSSSA] = useState("");
  const [pagA, setPagA] = useState("");
  const [houA, setHouA] = useState("");
  const [proA, setProA] = useState("");
  const [emeA, setEmeA] = useState("");
  const [fakA, setFakA] = useState("");
  const [stoA, setStoA] = useState("");
  const [calA, setCalA] = useState("");
  const [cooA, setCooA] = useState("");
  const [perA, setPerA] = useState("");
  const [othA, setOthA] = useState("");
  const [hrmA, setHrmA] = useState("");
  const [casA, setCasA] = useState("");

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

  var lkpArr = { id: "", loanNo: "", transactDate: "", payed: "" };

  var setSSS = setArray;
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

  const [sssI, setSssI] = useState(99);
  const [pagI, setPagI] = useState(99);
  const [houI, setHouI] = useState(99);
  const [proI, setProI] = useState(99);
  const [emeI, setEmeI] = useState(99);
  const [fakI, setFakI] = useState(99);
  const [stoI, setStoI] = useState(99);
  const [calI, setCalI] = useState(99);
  const [cooI, setCooI] = useState(99);
  const [perI, setPerI] = useState(99);
  const [othI, setOthI] = useState(99);
  const [hrmI, setHrmI] = useState(99);
  const [casI, setCasI] = useState(99);

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
          setSssI(i);
          setSSSA(employee.loan[i]);
          console.log(employee.loan[i]);
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
          setPagA(employee.loan[i]);
          setPagI(i);
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
          setHouI(i);
          setHouA(employee.loan[i]);
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
          setProI(i);
          setProA(employee.loan[i]);
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
          setEmeI(i);
          setEmeA(employee.loan[i]);
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
          setFakI(i);
          setFakA(employee.loan[i]);
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
          setStoI(i);
          setStoA(employee.loan[i]);
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
          setCalI(i);
          setCalA(employee.loan[i]);
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
          setCooI(i);
          setCooA(employee.loan[i]);
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
          setPerI(i);
          setPerA(employee.loan[i]);
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
          setOthI(i);
          setOthA(employee.loan[i]);
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
          console.log("HRM HERE");
          console.log(numberFormat(loanArr[i].capital));
          setHrmI(i);
          setHrmA(employee.loan[i]);
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
          setCalI(i);
          setCasA(employee.loan[i]);
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

  var yearsPay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  useEffect(() => {
    showOnDetails();
  }, [employee]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (gcode) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

      axios.get(baseURL + "/api/loan/emploan/" + gcode).then((response) => {
        setL(false);
        setLoans(response.data);
        console.log(response.data);
      });
    } else {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

      axios.get(baseURL + "/api/loan/emploan").then((response) => {
        setL(false);
        setLoans(response.data);
        console.log(response.data);
      });
    }
  };

  const saveEmpLoan = (setSave) => {
    axios
      .post(baseURL + "/api/loan/save", setSave, {
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
          // alert("Saved Successfully!");
          setMessage("Loan Saved");
          setShowMsg(true);
          if (setSave.id === "") {
            setSave.id = response.data;
            employee.loan.push(setSave);
            console.log(employee.loan);
            showOnDetails();
          }
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveEmpLoanPaid = (setSave) => {
    axios
      .post(baseURL + "/api/loan/save", setSave, {
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
          // alert("Saved Successfully!");
          setMessage("Loan Paid " + message);
          setShowMsg(true);
          if (setSave.id === "") {
            setSave.id = response.data;
            employee.loan.push(setSave);
            console.log(employee.loan);
            showOnDetails();
          }
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveLoanHistory = (setSave) => {
    axios
      .post(baseURL + "/api/loan/history/save", setSave, {
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
          // alert("Saved To Loan History");
          // setMessage("Loan Paid ");
          // setShowMsg(true);
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveLkp = (setSave, finalArr, ind) => {
    axios
      .post(baseURL + "/api/loan/lkp/save", setSave, {
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
          //employee.loan[id].transactNo = response.data;
          finalArr.transactNo = response.data;
          // alert(finalArr.transactNo);
          setMessage("Transaction No: " + finalArr.transactNo);
          var yest = new Date();
          yest.setDate(yest.getDate() - 1);
          finalArr.endDate = yest.toLocaleDateString("en-CA");
          if (parseInt(finalArr.transactNo) > 0) {
            saveLoanHistory(finalArr);
            // saveEmpLoan(finalArr);
            saveEmpLoanPaid(finalArr);
            console.log(employee.loan[ind]);
            employee.loan.splice(ind);
            console.log(employee.loan[ind]);
          }
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

  const clear = () => {
    setSSSA("");
    setPagA("");
    setHouA("");
    setProA("");
    setEmeA("");
    setFakA("");
    setStoA("");
    setCalA("");
    setCooA("");
    setPerA("");
    setOthA("");
    setHrmA("");
    setCasA("");
  };

  const nextEmp = () => {
    clear();
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    if (index < len - 1) {
      setEmployee(loans[index + 1]);
      setIndex(index + 1);
      // showOnDetails();
    }
  };

  const prevEmp = () => {
    clear();
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    if (index > 0) {
      setEmployee(loans[index - 1]);
      setIndex(index - 1);
      // showOnDetails();
    }
  };

  const firstEmp = () => {
    clear();
    // employeeNoRef.current.value = payslips[index + 1].employeeNo;
    setEmployee(loans[0]);
    setIndex(0);
    showOnDetails();
  };

  const lastEmp = () => {
    clear();
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
      // setSetSSS(setArray);
      if (
        setSSS.startDate != "" &&
        setSSS.endDate != "" &&
        setSSS.capital != ""
      ) {
        var months = monthDiff(setSSS.startDate, setSSS.endDate);
        var cap = setSSS.capital;
        setSSS.amortization = cap.replaceAll(",", "") / (months * 2);
        setSSS.balance = cap.replaceAll(",", "");
        // sssBalRef.current.value = setSSS.capital;
        sssBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        sssAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        sssAmorRef.current.style.color = "blue";
        sssBalRef.current.style.color = "blue";
      }
    }
    if (type === "PAGIBIG") {
      if (
        setPagibig.startDate != "" &&
        setPagibig.endDate != "" &&
        setPagibig.capital != ""
      ) {
        var months = monthDiff(setPagibig.startDate, setPagibig.endDate);
        var cap = setPagibig.capital;
        setPagibig.amortization = cap.replaceAll(",", "") / (months * 2);
        setPagibig.balance = cap.replaceAll(",", "");
        pagBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        pagAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        pagAmorRef.current.style.color = "blue";
        pagBalRef.current.style.color = "blue";
      }
    }
    if (type === "HOUSING") {
      if (
        setHousing.startDate != "" &&
        setHousing.endDate != "" &&
        setHousing.capital != ""
      ) {
        var months = monthDiff(setHousing.startDate, setHousing.endDate);
        var cap = setHousing.capital;
        setHousing.amortization = cap.replaceAll(",", "") / (months * 2);
        setHousing.balance = cap.replaceAll(",", "");
        spBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        spAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        spAmorRef.current.style.color = "blue";
        spBalRef.current.style.color = "blue";
      }
    }
    if (type === "PROMISORY") {
      if (
        setPromisory.startDate != "" &&
        setPromisory.endDate != "" &&
        setPromisory.capital != ""
      ) {
        var months = monthDiff(setPromisory.startDate, setPromisory.endDate);
        var cap = setPromisory.capital;
        setPromisory.amortization = cap.replaceAll(",", "") / (months * 2);
        setPromisory.balance = cap.replaceAll(",", "");
        plBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        plAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        plAmorRef.current.style.color = "blue";
        plBalRef.current.style.color = "blue";
      }
    }
    if (type === "EMERGENCY") {
      if (
        setEmergency.startDate != "" &&
        setEmergency.endDate != "" &&
        setEmergency.capital != ""
      ) {
        var months = monthDiff(setEmergency.startDate, setEmergency.endDate);
        var cap = setEmergency.capital;
        setEmergency.amortization = cap.replaceAll(",", "") / (months * 2);
        setEmergency.balance = cap.replaceAll(",", "");
        emerBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        emerAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        emerAmorRef.current.style.color = "blue";
        emerBalRef.current.style.color = "blue";
      }
    }
    if (type === "FAKE") {
      if (
        setFake.startDate != "" &&
        setFake.endDate != "" &&
        setFake.capital != ""
      ) {
        var months = monthDiff(setFake.startDate, setFake.endDate);
        var cap = setFake.capital;
        setFake.amortization = cap.replaceAll(",", "") / (months * 2);
        setFake.balance = cap.replaceAll(",", "");
        foBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        foAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        foAmorRef.current.style.color = "blue";
        foBalRef.current.style.color = "blue";
      }
    }
    if (type === "STORAGE") {
      if (
        setStorage.startDate != "" &&
        setStorage.endDate != "" &&
        setStorage.capital != ""
      ) {
        var months = monthDiff(setStorage.startDate, setStorage.endDate);
        var cap = setStorage.capital;
        setStorage.amortization = cap.replaceAll(",", "") / (months * 2);
        setStorage.balance = cap.replaceAll(",", "");
        storBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        storAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        storAmorRef.current.style.color = "blue";
        storBalRef.current.style.color = "blue";
      }
    }
    if (type === "CALAMITY") {
      if (
        setCalamity.startDate != "" &&
        setCalamity.endDate != "" &&
        setCalamity.capital != ""
      ) {
        var months = monthDiff(setCalamity.startDate, setCalamity.endDate);
        var cap = setCalamity.capital;
        setCalamity.amortization = cap.replaceAll(",", "") / (months * 2);
        setCalamity.balance = cap.replaceAll(",", "");
        pnBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        pnAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        pnAmorRef.current.style.color = "blue";
        pnBalRef.current.style.color = "blue";
      }
    }
    if (type === "COOP") {
      if (
        setCoop.startDate != "" &&
        setCoop.endDate != "" &&
        setCoop.capital != ""
      ) {
        var months = monthDiff(setCoop.startDate, setCoop.endDate);
        var cap = setCoop.capital;
        setCoop.amortization = cap.replaceAll(",", "") / (months * 2);
        setCoop.balance = cap.replaceAll(",", "");
        lapBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        lapAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        lapAmorRef.current.style.color = "blue";
        lapBalRef.current.style.color = "blue";
      }
    }
    if (type === "PERSONAL") {
      if (
        setPersonal.startDate != "" &&
        setPersonal.endDate != "" &&
        setPersonal.capital != ""
      ) {
        var months = monthDiff(setPersonal.startDate, setPersonal.endDate);
        var cap = setPersonal.capital;
        setPersonal.amortization = cap.replaceAll(",", "") / (months * 2);
        setPersonal.balance = cap.replaceAll(",", "");
        perBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        perAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        perAmorRef.current.style.color = "blue";
        perBalRef.current.style.color = "blue";
      }
    }
    if (type === "OTHER") {
      if (
        setOther.startDate != "" &&
        setOther.endDate != "" &&
        setOther.capital != ""
      ) {
        var months = monthDiff(setOther.startDate, setOther.endDate);
        var cap = setOther.capital;
        setOther.amortization = cap.replaceAll(",", "") / (months * 2);
        setOther.balance = cap.replaceAll(",", "");
        liBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        liAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        liAmorRef.current.style.color = "blue";
        liBalRef.current.style.color = "blue";
      }
    }
    if (type === "HRM") {
      if (
        setHRM.startDate != "" &&
        setHRM.endDate != "" &&
        setHRM.capital != ""
      ) {
        var months = monthDiff(setHRM.startDate, setHRM.endDate);
        var cap = setHRM.capital;
        setHRM.amortization = cap.replaceAll(",", "") / (months * 2);
        setHRM.balance = cap.replaceAll(",", "");
        hmoBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        hmoAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        hmoAmorRef.current.style.color = "blue";
        hmoBalRef.current.style.color = "blue";
      }
    }
    if (type === "CASH") {
      if (
        setCash.startDate != "" &&
        setCash.endDate != "" &&
        setCash.capital != ""
      ) {
        var months = monthDiff(setCash.startDate, setCash.endDate);
        var cap = setCash.capital;
        setCash.amortization = cap.replaceAll(",", "") / (months * 2);
        setCash.balance = cap.replaceAll(",", "");
        cpmBalRef.current.value = numberFormat(cap.replaceAll(",", ""));
        cpmAmorRef.current.value = numberFormat(
          cap.replaceAll(",", "") / (months * 2)
        );
        cpmAmorRef.current.style.color = "blue";
        cpmBalRef.current.style.color = "blue";
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

  const clearArr = () => {
    setArray = {
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
  };

  const save = (type) => {
    clearArr();
    var saveArr = setArray;
    var finalArr = setArray;
    saveArr =
      type === "SSS"
        ? SSSA
        : type === "PAGIBIG"
        ? pagA
        : type === "HOUSING"
        ? houA
        : type === "PROMISORY"
        ? proA
        : type === "EMERGENCY"
        ? emeA
        : type === "FAKE"
        ? fakA
        : type === "STORAGE"
        ? stoA
        : type === "CALAMITY"
        ? calA
        : type === "COOP"
        ? cooA
        : type === "PERSONAL"
        ? perA
        : type === "OTHER"
        ? othA
        : type === "HRM"
        ? hrmA
        : type === "CASH"
        ? casA
        : saveArr;
    if (saveArr) {
      finalArr.id = saveArr.id;
      finalArr.loanType = saveArr.loanType;
      finalArr.employeeNo = saveArr.employeeNo;
      finalArr.transactNo = saveArr.transactNo;
      finalArr.origEndDate = saveArr.origEndDate;
      // alert(setSSS.startDate === "");
      finalArr.startDate =
        finalArr.startDate === "" ? saveArr.startDate : finalArr.startDate;
      finalArr.endDate =
        finalArr.endDate === "" ? saveArr.endDate : finalArr.endDate;
      finalArr.capital =
        finalArr.capital === "" ? saveArr.capital : finalArr.capital;
      finalArr.amortization =
        finalArr.amortization === ""
          ? saveArr.amortization
          : finalArr.amortization;
      finalArr.balance =
        finalArr.balance === "" ? saveArr.balance : finalArr.balance;
    }
    var bal = 0;
    if (type === "SSS") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(sssCapRef.current.value);
        finalArr.amortization = removePesoComma(sssAmorRef.current.value);
        finalArr.balance = removePesoComma(sssBalRef.current.value);
        employee.loan[sssI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, sssI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setSSS.origEndDate = setSSS.endDate;
        setSSS.loanType = type;
        setSSS.employeeNo = employeeNoRef.current.value;
        setSSS.transactNo = 0;
        saveEmpLoan(setSSS);
      }
    }
    if (type === "PAGIBIG") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(pagCapRef.current.value);
        finalArr.amortization = removePesoComma(pagAmorRef.current.value);
        finalArr.balance = removePesoComma(pagBalRef.current.value);
        employee.loan[pagI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, pagI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setPagibig.origEndDate = setPagibig.endDate;
        setPagibig.loanType = type;
        setPagibig.employeeNo = employeeNoRef.current.value;
        setPagibig.transactNo = 0;
        saveEmpLoan(setPagibig);
      }
    }
    if (type === "HOUSING") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(spCapRef.current.value);
        finalArr.amortization = removePesoComma(spAmorRef.current.value);
        finalArr.balance = removePesoComma(spBalRef.current.value);
        employee.loan[houI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, houI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setHousing.origEndDate = setHousing.endDate;
        setHousing.loanType = type;
        setHousing.employeeNo = employeeNoRef.current.value;
        setHousing.transactNo = 0;
        saveEmpLoan(setHousing);
      }
    }
    if (type === "PROMISORY") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(plCapRef.current.value);
        finalArr.amortization = removePesoComma(plAmorRef.current.value);
        finalArr.balance = removePesoComma(plBalRef.current.value);
        employee.loan[proI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, proI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setPromisory.origEndDate = setPromisory.endDate;
        setPromisory.loanType = type;
        setPromisory.employeeNo = employeeNoRef.current.value;
        setPromisory.transactNo = 0;
        saveEmpLoan(setPromisory);
      }
    }
    if (type === "EMERGENCY") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(emerCapRef.current.value);
        finalArr.amortization = removePesoComma(emerAmorRef.current.value);
        finalArr.balance = removePesoComma(emerBalRef.current.value);
        employee.loan[emeI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, emeI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setEmergency.origEndDate = setEmergency.endDate;
        setEmergency.loanType = type;
        setEmergency.employeeNo = employeeNoRef.current.value;
        setEmergency.transactNo = 0;
        saveEmpLoan(setEmergency);
      }
    }
    if (type === "FAKE") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(foCapRef.current.value);
        finalArr.amortization = removePesoComma(foAmorRef.current.value);
        finalArr.balance = removePesoComma(foBalRef.current.value);
        employee.loan[fakI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, fakI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setFake.origEndDate = setFake.endDate;
        setFake.loanType = type;
        setFake.employeeNo = employeeNoRef.current.value;
        setFake.transactNo = 0;
        saveEmpLoan(setFake);
      }
    }
    if (type === "STORAGE") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(storCapRef.current.value);
        finalArr.amortization = removePesoComma(storAmorRef.current.value);
        finalArr.balance = removePesoComma(storBalRef.current.value);
        employee.loan[stoI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, stoI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setStorage.origEndDate = setStorage.endDate;
        setStorage.loanType = type;
        setStorage.employeeNo = employeeNoRef.current.value;
        setStorage.transactNo = 0;
        saveEmpLoan(setStorage);
      }
    }
    if (type === "CALAMITY") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(pnCapRef.current.value);
        finalArr.amortization = removePesoComma(pnAmorRef.current.value);
        finalArr.balance = removePesoComma(pnBalRef.current.value);
        employee.loan[calI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, calI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setCalamity.origEndDate = setCalamity.endDate;
        setCalamity.loanType = type;
        setCalamity.employeeNo = employeeNoRef.current.value;
        setCalamity.transactNo = 0;
        saveEmpLoan(setCalamity);
      }
    }
    if (type === "COOP") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(lapCapRef.current.value);
        finalArr.amortization = removePesoComma(lapAmorRef.current.value);
        finalArr.balance = removePesoComma(lapBalRef.current.value);
        employee.loan[cooI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, cooI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setCoop.origEndDate = setCoop.endDate;
        setCoop.loanType = type;
        setCoop.employeeNo = employeeNoRef.current.value;
        setCoop.transactNo = 0;
        saveEmpLoan(setCoop);
      }
    }
    if (type === "PERSONAL") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(perCapRef.current.value);
        finalArr.amortization = removePesoComma(perAmorRef.current.value);
        finalArr.balance = removePesoComma(perBalRef.current.value);
        employee.loan[perI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, perI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setPersonal.origEndDate = setPersonal.endDate;
        setPersonal.loanType = type;
        setPersonal.employeeNo = employeeNoRef.current.value;
        setPersonal.transactNo = 0;
        saveEmpLoan(setPersonal);
      }
    }
    if (type === "OTHER") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(liCapRef.current.value);
        finalArr.amortization = removePesoComma(liAmorRef.current.value);
        finalArr.balance = removePesoComma(liBalRef.current.value);
        employee.loan[othI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, othI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setOther.origEndDate = setOther.endDate;
        setOther.loanType = type;
        setOther.employeeNo = employeeNoRef.current.value;
        setOther.transactNo = 0;
        saveEmpLoan(setOther);
      }
    }
    if (type === "HRM") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(hmoCapRef.current.value);
        finalArr.amortization = removePesoComma(hmoAmorRef.current.value);
        finalArr.balance = removePesoComma(hmoBalRef.current.value);
        employee.loan[hrmI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, hrmI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setHRM.origEndDate = setHRM.endDate;
        setHRM.loanType = type;
        setHRM.employeeNo = employeeNoRef.current.value;
        setHRM.transactNo = 0;
        saveEmpLoan(setHRM);
      }
    }
    if (type === "CASH") {
      if (finalArr.id) {
        bal = finalArr.balance;
        finalArr.capital = removePesoComma(cpmCapRef.current.value);
        finalArr.amortization = removePesoComma(cpmAmorRef.current.value);
        finalArr.balance = removePesoComma(cpmBalRef.current.value);
        employee.loan[casI] = finalArr;
        if (finalArr.balance === 0 || finalArr.balance === "0.00") {
          lkpArr.loanNo = finalArr.id;
          lkpArr.payed = bal;
          lkpArr.transactDate = new Date();
          saveLkp(lkpArr, finalArr, casI);
        } else {
          saveEmpLoan(finalArr);
        }
      } else {
        setCash.origEndDate = setCash.endDate;
        setCash.loanType = type;
        setCash.employeeNo = employeeNoRef.current.value;
        setCash.transactNo = 0;
        saveEmpLoan(setCash);
      }
    }
    saveArr = [];
    finalArr = [];
  };

  const addYears = (period, yrs) => {
    var ret = 0;
    ret = parseInt(period.substring(0, 4)) + parseInt(yrs);
    return ret + period.substring(4);
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
          style={{ width: "84rem" }}
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
                  sm="1"
                  className="noWrapText"
                  style={{ paddingLeft: "15px" }}
                >
                  LOANS
                </FormLabel>
                <FormLabel
                  column
                  sm="2"
                  className="noWrapText textCenter"
                  style={{ marginRight: "0px" }}
                >
                  START DATE
                </FormLabel>
                <FormLabel
                  column
                  sm="1"
                  className="noWrapText"
                  style={{ marginRight: "0px" }}
                >
                  YEARS TO PAY
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
                  <FormLabel column sm="1" className="noWrapText">
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
                        sssEDRef.current.value = addYears(
                          sssSDRef.current.value,
                          5
                        );
                        setSSS.endDate = addYears(sssSDRef.current.value, 5);
                        sssEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    {/* <FormControl
                      value="5"
                      className="inpHeightXs"
                    ></FormControl> */}
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        sssEDRef.current.value = addYears(
                          sssSDRef.current.value,
                          value
                        );
                        setSSS.endDate = addYears(
                          sssSDRef.current.value,
                          value
                        );
                        sssEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(sssCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("SSS");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                  <FormLabel column sm="1" className="noWrapText">
                    Pagibig Loan
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={pagSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setPagibig.startDate = value;
                        pagSDRef.current.style.color = "blue";
                        pagEDRef.current.value = addYears(
                          pagSDRef.current.value,
                          5
                        );
                        setPagibig.endDate = addYears(
                          pagSDRef.current.value,
                          5
                        );
                        pagEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    {/* <FormControl
                      value="5"
                      className="inpHeightXs"
                    ></FormControl> */}
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        pagEDRef.current.value = addYears(
                          pagSDRef.current.value,
                          value
                        );
                        setPagibig.endDate = addYears(
                          pagSDRef.current.value,
                          value
                        );
                        pagEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(pagCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("PAGIBIG");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setPagibig.endDate = value;
                        pagEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setPagibig.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            pagCapRef.current.style.color = "blue";
                          } else {
                            pagCapRef.current.style.color = "gray";
                          }
                        } else {
                          setPagibig.capital = 0;
                          pagCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("PAGIBIG");
                      }}
                      onBlur={(event) => {
                        pagCapRef.current.value = checkChange(
                          pagCapRef.current.value,
                          setPagibig.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);

                        if (!isNaN(parseFloat(value))) {
                          setPagibig.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            pagAmorRef.current.style.color = "blue";
                          } else {
                            pagAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setPagibig.amortization = 0;
                          pagAmorRef.current.style.color = "gray";
                        }
                        //reComputeLoan(value);
                      }}
                      onBlur={(event) => {
                        pagAmorRef.current.value = checkChange(
                          pagAmorRef.current.value,
                          setPagibig.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);

                        if (!isNaN(parseFloat(value))) {
                          setPagibig.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            pagBalRef.current.style.color = "blue";
                          } else {
                            pagBalRef.current.style.color = "gray";
                          }
                        } else {
                          setPagibig.balance = 0;
                          pagBalRef.current.style.color = "gray";
                        }
                        //reComputeLoan(value);
                      }}
                      onBlur={(event) => {
                        pagBalRef.current.value = checkChange(
                          pagBalRef.current.value,
                          setPagibig.balance
                        );
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

                {/* ########### ST PETER LOAN *housing* ############# */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    St. Peter Loan
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={spSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setHousing.startDate = value;
                        spSDRef.current.style.color = "blue";
                        spEDRef.current.value = addYears(
                          spSDRef.current.value,
                          5
                        );
                        setHousing.endDate = addYears(spSDRef.current.value, 5);
                        spEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        spEDRef.current.value = addYears(
                          spSDRef.current.value,
                          value
                        );
                        setHousing.endDate = addYears(
                          spSDRef.current.value,
                          value
                        );
                        spEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(spCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("HOUSING");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setHousing.endDate = value;
                        spEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setHousing.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            spCapRef.current.style.color = "blue";
                          } else {
                            spCapRef.current.style.color = "gray";
                          }
                        } else {
                          setHousing.capital = 0;
                          spCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("HOUSING");
                      }}
                      onBlur={(event) => {
                        spCapRef.current.value = checkChange(
                          spCapRef.current.value,
                          setHousing.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setHousing.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            spAmorRef.current.style.color = "blue";
                          } else {
                            spAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setHousing.amortization = 0;
                          spAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("HOUSING");
                      }}
                      onBlur={(event) => {
                        spAmorRef.current.value = checkChange(
                          spAmorRef.current.value,
                          setHousing.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setHousing.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            spBalRef.current.style.color = "blue";
                          } else {
                            spBalRef.current.style.color = "gray";
                          }
                        } else {
                          setHousing.balance = 0;
                          spBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("HOUSING");
                      }}
                      onBlur={(event) => {
                        spBalRef.current.value = checkChange(
                          spBalRef.current.value,
                          setHousing.balance
                        );
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

                {/* ########## PROMISORY LOAN ########## */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Promisory Loan
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={plSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setPromisory.startDate = value;
                        plSDRef.current.style.color = "blue";
                        plEDRef.current.value = addYears(
                          plSDRef.current.value,
                          5
                        );
                        setPromisory.endDate = addYears(
                          plSDRef.current.value,
                          5
                        );
                        plEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        plEDRef.current.value = addYears(
                          plSDRef.current.value,
                          value
                        );
                        setPromisory.endDate = addYears(
                          plSDRef.current.value,
                          value
                        );
                        plEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(plCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("PROMISORY");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setPromisory.endDate = value;
                        plEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setPromisory.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            plCapRef.current.style.color = "blue";
                          } else {
                            plCapRef.current.style.color = "gray";
                          }
                        } else {
                          setPromisory.capital = 0;
                          plCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("PROMISORY");
                      }}
                      onBlur={(event) => {
                        plCapRef.current.value = checkChange(
                          plCapRef.current.value,
                          setPromisory.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setPromisory.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            plAmorRef.current.style.color = "blue";
                          } else {
                            plAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setPromisory.amortization = 0;
                          plAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("PROMISORY");
                      }}
                      onBlur={(event) => {
                        plAmorRef.current.value = checkChange(
                          plAmorRef.current.value,
                          setPromisory.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setPromisory.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            plBalRef.current.style.color = "blue";
                          } else {
                            plBalRef.current.style.color = "gray";
                          }
                        } else {
                          setPromisory.balance = 0;
                          plBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("PROMISORY");
                      }}
                      onBlur={(event) => {
                        plBalRef.current.value = checkChange(
                          plBalRef.current.value,
                          setPromisory.balance
                        );
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

                {/* ########## EMERGENCY ############# */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Emergency
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={emerSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setEmergency.startDate = value;
                        emerSDRef.current.style.color = "blue";
                        emerEDRef.current.value = addYears(
                          emerSDRef.current.value,
                          5
                        );
                        setEmergency.endDate = addYears(
                          emerSDRef.current.value,
                          5
                        );
                        emerEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        emerEDRef.current.value = addYears(
                          emerSDRef.current.value,
                          value
                        );
                        setEmergency.endDate = addYears(
                          emerSDRef.current.value,
                          value
                        );
                        emerEDRef.current.style.color = "blue";
                        if (
                          parseFloat(
                            removePesoComma(emerCapRef.current.value)
                          ) > 0
                        ) {
                          reComputeLoan("EMERGENCY");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setEmergency.endDate = value;
                        emerEDRef.current.style.color = "blue";
                        emerEDRef.current.value = addYears(
                          emerSDRef.current.value,
                          5
                        );
                        setEmergency.endDate = addYears(
                          emerSDRef.current.value,
                          5
                        );
                        emerEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setEmergency.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            emerCapRef.current.style.color = "blue";
                          } else {
                            emerCapRef.current.style.color = "gray";
                          }
                        } else {
                          setEmergency.capital = 0;
                          emerCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("EMERGENCY");
                      }}
                      onBlur={(event) => {
                        emerCapRef.current.value = checkChange(
                          emerCapRef.current.value,
                          setEmergency.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setEmergency.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            emerAmorRef.current.style.color = "blue";
                          } else {
                            emerAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setEmergency.amortization = 0;
                          emerAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("EMERGENCY");
                      }}
                      onBlur={(event) => {
                        emerAmorRef.current.value = checkChange(
                          emerAmorRef.current.value,
                          setEmergency.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setEmergency.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            emerBalRef.current.style.color = "blue";
                          } else {
                            emerBalRef.current.style.color = "gray";
                          }
                        } else {
                          setEmergency.balance = 0;
                          emerBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("EMERGENCY");
                      }}
                      onBlur={(event) => {
                        emerBalRef.current.value = checkChange(
                          emerBalRef.current.value,
                          setEmergency.balance
                        );
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

                {/* ########### FAKE OVER ############ */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Fake / Over
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={foSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setFake.startDate = value;
                        foSDRef.current.style.color = "blue";
                        foEDRef.current.value = addYears(
                          foSDRef.current.value,
                          5
                        );
                        setFake.endDate = addYears(foSDRef.current.value, 5);
                        foEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        foEDRef.current.value = addYears(
                          foSDRef.current.value,
                          value
                        );
                        setFake.endDate = addYears(
                          foSDRef.current.value,
                          value
                        );
                        foEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(foCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("FAKE");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setFake.endDate = value;
                        foEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setFake.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            foCapRef.current.style.color = "blue";
                          } else {
                            foCapRef.current.style.color = "gray";
                          }
                        } else {
                          setFake.capital = 0;
                          foCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("FAKE");
                      }}
                      onBlur={(event) => {
                        foCapRef.current.value = checkChange(
                          foCapRef.current.value,
                          setFake.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setFake.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            foAmorRef.current.style.color = "blue";
                          } else {
                            foAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setFake.amortization = 0;
                          foAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("EMERGENCY");
                      }}
                      onBlur={(event) => {
                        foAmorRef.current.value = checkChange(
                          foAmorRef.current.value,
                          setFake.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setFake.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            foBalRef.current.style.color = "blue";
                          } else {
                            foBalRef.current.style.color = "gray";
                          }
                        } else {
                          setFake.balance = 0;
                          foBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("EMERGENCY");
                      }}
                      onBlur={(event) => {
                        foBalRef.current.value = checkChange(
                          foBalRef.current.value,
                          setFake.balance
                        );
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

                {/* ########## STORAGE ########## */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Storage
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={storSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setStorage.startDate = value;
                        storSDRef.current.style.color = "blue";
                        storEDRef.current.value = addYears(
                          storSDRef.current.value,
                          5
                        );
                        setStorage.endDate = addYears(
                          storSDRef.current.value,
                          5
                        );
                        storEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        storEDRef.current.value = addYears(
                          storSDRef.current.value,
                          value
                        );
                        setStorage.endDate = addYears(
                          storSDRef.current.value,
                          value
                        );
                        storEDRef.current.style.color = "blue";
                        if (
                          parseFloat(
                            removePesoComma(storCapRef.current.value)
                          ) > 0
                        ) {
                          reComputeLoan("STORAGE");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setStorage.endDate = value;
                        storEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setStorage.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            storCapRef.current.style.color = "blue";
                          } else {
                            storCapRef.current.style.color = "gray";
                          }
                        } else {
                          setStorage.capital = 0;
                          storCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("STORAGE");
                      }}
                      onBlur={(event) => {
                        storCapRef.current.value = checkChange(
                          storCapRef.current.value,
                          setStorage.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setStorage.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            storAmorRef.current.style.color = "blue";
                          } else {
                            storAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setStorage.amortization = 0;
                          storAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("STORAGE");
                      }}
                      onBlur={(event) => {
                        storAmorRef.current.value = checkChange(
                          storAmorRef.current.value,
                          setStorage.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setStorage.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            storBalRef.current.style.color = "blue";
                          } else {
                            storBalRef.current.style.color = "gray";
                          }
                        } else {
                          setStorage.balance = 0;
                          storBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("STORAGE");
                      }}
                      onBlur={(event) => {
                        storBalRef.current.value = checkChange(
                          storBalRef.current.value,
                          setStorage.balance
                        );
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

                {/* ########## PROMISORY NOTE *calamity* ############*/}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Promisory Note
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={pnSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setCalamity.startDate = value;
                        pnSDRef.current.style.color = "blue";
                        pnEDRef.current.value = addYears(
                          pnSDRef.current.value,
                          5
                        );
                        setCalamity.endDate = addYears(
                          pnSDRef.current.value,
                          5
                        );
                        pnEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        pnEDRef.current.value = addYears(
                          pnSDRef.current.value,
                          value
                        );
                        setCalamity.endDate = addYears(
                          pnSDRef.current.value,
                          value
                        );
                        pnEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(pnCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("CALAMITY");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setCalamity.endDate = value;
                        pnEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCalamity.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            pnCapRef.current.style.color = "blue";
                          } else {
                            pnCapRef.current.style.color = "gray";
                          }
                        } else {
                          setCalamity.capital = 0;
                          pnCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("CALAMITY");
                      }}
                      onBlur={(event) => {
                        pnCapRef.current.value = checkChange(
                          pnCapRef.current.value,
                          setCalamity.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCalamity.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            pnAmorRef.current.style.color = "blue";
                          } else {
                            pnAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setCalamity.amortization = 0;
                          pnAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("CALAMITY");
                      }}
                      onBlur={(event) => {
                        pnAmorRef.current.value = checkChange(
                          pnAmorRef.current.value,
                          setCalamity.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCalamity.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            pnBalRef.current.style.color = "blue";
                          } else {
                            pnBalRef.current.style.color = "gray";
                          }
                        } else {
                          setCalamity.balance = 0;
                          pnBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("CALAMITY");
                      }}
                      onBlur={(event) => {
                        pnBalRef.current.value = checkChange(
                          pnBalRef.current.value,
                          setCalamity.balance
                        );
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

                {/* ########## LAY AWAY PLAN *coop*########### */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Lay Away Plan
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={lapSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setCoop.startDate = value;
                        lapSDRef.current.style.color = "blue";
                        lapEDRef.current.value = addYears(
                          lapSDRef.current.value,
                          5
                        );
                        setCoop.endDate = addYears(lapSDRef.current.value, 5);
                        lapEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        lapEDRef.current.value = addYears(
                          lapSDRef.current.value,
                          value
                        );
                        setCoop.endDate = addYears(
                          lapSDRef.current.value,
                          value
                        );
                        lapEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(lapCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("COOP");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setCoop.endDate = value;
                        lapEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCoop.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            lapCapRef.current.style.color = "blue";
                          } else {
                            lapCapRef.current.style.color = "gray";
                          }
                        } else {
                          setCoop.capital = 0;
                          lapCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("COOP");
                      }}
                      onBlur={(event) => {
                        lapCapRef.current.value = checkChange(
                          lapCapRef.current.value,
                          setCoop.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCoop.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            lapAmorRef.current.style.color = "blue";
                          } else {
                            lapAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setCoop.amortization = 0;
                          lapAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("COOP");
                      }}
                      onBlur={(event) => {
                        lapAmorRef.current.value = checkChange(
                          lapAmorRef.current.value,
                          setCoop.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCoop.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            lapBalRef.current.style.color = "blue";
                          } else {
                            lapBalRef.current.style.color = "gray";
                          }
                        } else {
                          setCoop.balance = 0;
                          lapBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("COOP");
                      }}
                      onBlur={(event) => {
                        lapBalRef.current.value = checkChange(
                          lapBalRef.current.value,
                          setCoop.balance
                        );
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

                {/* ########### PERSONAL ############# */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Personal
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={perSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setPersonal.startDate = value;
                        perSDRef.current.style.color = "blue";
                        perEDRef.current.value = addYears(
                          perSDRef.current.value,
                          5
                        );
                        setPersonal.endDate = addYears(
                          perSDRef.current.value,
                          5
                        );
                        perEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        perEDRef.current.value = addYears(
                          perSDRef.current.value,
                          value
                        );
                        setPersonal.endDate = addYears(
                          perSDRef.current.value,
                          value
                        );
                        perEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(perCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("PERSONAL");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setPersonal.endDate = value;
                        perEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setPersonal.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            perCapRef.current.style.color = "blue";
                          } else {
                            perCapRef.current.style.color = "gray";
                          }
                        } else {
                          setPersonal.capital = 0;
                          perCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("PERSONAL");
                      }}
                      onBlur={(event) => {
                        perCapRef.current.value = checkChange(
                          perCapRef.current.value,
                          setPersonal.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setPersonal.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            perAmorRef.current.style.color = "blue";
                          } else {
                            perAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setPersonal.amortization = 0;
                          perAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("PERSONAL");
                      }}
                      onBlur={(event) => {
                        perAmorRef.current.value = checkChange(
                          perAmorRef.current.value,
                          setPersonal.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setPersonal.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            perBalRef.current.style.color = "blue";
                          } else {
                            perBalRef.current.style.color = "gray";
                          }
                        } else {
                          setPersonal.balance = 0;
                          perBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("PERSONAL");
                      }}
                      onBlur={(event) => {
                        perBalRef.current.value = checkChange(
                          perBalRef.current.value,
                          setPersonal.balance
                        );
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

                {/* ########## LIFE INSURANCE *other* ############ */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    Life Insurance
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={liSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setOther.startDate = value;
                        liSDRef.current.style.color = "blue";
                        liEDRef.current.value = addYears(
                          liSDRef.current.value,
                          5
                        );
                        setOther.endDate = addYears(liSDRef.current.value, 5);
                        liEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    {/* <FormControl
                      value="5"
                      className="inpHeightXs"
                    ></FormControl> */}
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        liEDRef.current.value = addYears(
                          liSDRef.current.value,
                          value
                        );
                        setOther.endDate = addYears(
                          liSDRef.current.value,
                          value
                        );
                        liEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(liCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("OTHER");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setOther.endDate = value;
                        liEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setOther.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            liCapRef.current.style.color = "blue";
                          } else {
                            liCapRef.current.style.color = "gray";
                          }
                        } else {
                          setOther.capital = 0;
                          liCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("OTHER");
                      }}
                      onBlur={(event) => {
                        liCapRef.current.value = checkChange(
                          liCapRef.current.value,
                          setOther.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setOther.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            liAmorRef.current.style.color = "blue";
                          } else {
                            liAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setOther.amortization = 0;
                          liAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("OTHER");
                      }}
                      onBlur={(event) => {
                        liAmorRef.current.value = checkChange(
                          liAmorRef.current.value,
                          setOther.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setOther.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            liBalRef.current.style.color = "blue";
                          } else {
                            liBalRef.current.style.color = "gray";
                          }
                        } else {
                          setOther.balance = 0;
                          liBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("OTHER");
                      }}
                      onBlur={(event) => {
                        liBalRef.current.value = checkChange(
                          liBalRef.current.value,
                          setOther.balance
                        );
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

                {/* ########### HMO *HRM* ########### */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    HMO
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={hmoSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setHRM.startDate = value;
                        hmoSDRef.current.style.color = "blue";
                        hmoEDRef.current.value = addYears(
                          hmoSDRef.current.value,
                          5
                        );
                        setHRM.endDate = addYears(hmoSDRef.current.value, 5);
                        hmoEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        hmoEDRef.current.value = addYears(
                          hmoSDRef.current.value,
                          value
                        );
                        setHRM.endDate = addYears(
                          hmoSDRef.current.value,
                          value
                        );
                        hmoEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(hmoCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("HRM");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setHRM.endDate = value;
                        hmoEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setHRM.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            hmoCapRef.current.style.color = "blue";
                          } else {
                            hmoCapRef.current.style.color = "gray";
                          }
                        } else {
                          setHRM.capital = 0;
                          hmoCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("HRM");
                      }}
                      onBlur={(event) => {
                        hmoCapRef.current.value = checkChange(
                          hmoCapRef.current.value,
                          setHRM.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setHRM.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            hmoAmorRef.current.style.color = "blue";
                          } else {
                            hmoAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setHRM.amortization = 0;
                          hmoAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("HRM");
                      }}
                      onBlur={(event) => {
                        hmoAmorRef.current.value = checkChange(
                          hmoAmorRef.current.value,
                          setHRM.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setHRM.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            hmoBalRef.current.style.color = "blue";
                          } else {
                            hmoBalRef.current.style.color = "gray";
                          }
                        } else {
                          setHRM.balance = 0;
                          hmoBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("HRM");
                      }}
                      onBlur={(event) => {
                        hmoBalRef.current.value = checkChange(
                          hmoBalRef.current.value,
                          setHRM.balance
                        );
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    <Button
                      className="buttonLoanSave"
                      variant="success"
                      onClick={() => save("HRM")}
                    >
                      Save
                    </Button>
                  </Col>
                </FormGroup>
                <label className="separator3"></label>

                {/* ########### CS/PS/MS *cash* ########### */}

                <FormGroup as={Row}>
                  <FormLabel column sm="1" className="noWrapText">
                    CS/PS/MS
                  </FormLabel>
                  <Col sm="2">
                    <FormControl
                      ref={cpmSDRef}
                      className="inpHeightXs"
                      type="Date"
                      style={{
                        fontWeight: "bolder",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setCash.startDate = value;
                        cpmSDRef.current.style.color = "blue";
                        cpmEDRef.current.value = addYears(
                          cpmSDRef.current.value,
                          5
                        );
                        setCash.endDate = addYears(cpmSDRef.current.value, 5);
                        cpmEDRef.current.style.color = "blue";
                      }}
                    ></FormControl>
                  </Col>
                  <Col sm="1">
                    {/* <FormControl
                      value="5"
                      className="inpHeightXs"
                    ></FormControl> */}
                    <Form.Select
                      className="inpHeightXs"
                      defaultValue={"5"}
                      style={{
                        padding: "0px 0px 0px 15px",
                        fontSize: "14px",
                        fontWeight: "bolder",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.style.color = "blue";
                        cpmEDRef.current.value = addYears(
                          cpmSDRef.current.value,
                          value
                        );
                        setCash.endDate = addYears(
                          cpmSDRef.current.value,
                          value
                        );
                        cpmEDRef.current.style.color = "blue";
                        if (
                          parseFloat(removePesoComma(cpmCapRef.current.value)) >
                          0
                        ) {
                          reComputeLoan("CASH");
                        }
                      }}
                    >
                      <option></option>
                      {yearsPay.map((yr) => (
                        <option value={yr} key={yr}>
                          {yr}
                        </option>
                      ))}
                    </Form.Select>
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
                      onChange={(event) => {
                        const { value } = event.target;
                        setCash.endDate = value;
                        cpmEDRef.current.style.color = "blue";
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCash.capital = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            cpmCapRef.current.style.color = "blue";
                          } else {
                            cpmCapRef.current.style.color = "gray";
                          }
                        } else {
                          setCash.capital = 0;
                          cpmCapRef.current.style.color = "gray";
                        }
                        reComputeLoan("CASH");
                      }}
                      onBlur={(event) => {
                        cpmCapRef.current.value = checkChange(
                          cpmCapRef.current.value,
                          setCash.capital
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCash.amortization = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            cpmAmorRef.current.style.color = "blue";
                          } else {
                            cpmAmorRef.current.style.color = "gray";
                          }
                        } else {
                          setCash.amortization = 0;
                          cpmAmorRef.current.style.color = "gray";
                        }
                        // reComputeLoan("CASH");
                      }}
                      onBlur={(event) => {
                        cpmAmorRef.current.value = checkChange(
                          cpmAmorRef.current.value,
                          setCash.amortization
                        );
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
                      onFocus={(event) => event.target.select()}
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = normalizeCurrency(value);
                        if (!isNaN(parseFloat(value))) {
                          setCash.balance = value.replaceAll(",", "");
                          if (parseInt(value) > 0) {
                            cpmBalRef.current.style.color = "blue";
                          } else {
                            cpmBalRef.current.style.color = "gray";
                          }
                        } else {
                          setCash.balance = 0;
                          cpmBalRef.current.style.color = "gray";
                        }
                        // reComputeLoan("CASH");
                      }}
                      onBlur={(event) => {
                        cpmBalRef.current.value = checkChange(
                          cpmBalRef.current.value,
                          setCash.balance
                        );
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
        {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
      </div>
    </div>
  );
};
