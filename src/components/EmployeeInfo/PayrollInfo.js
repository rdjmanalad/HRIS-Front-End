import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Card,
  Form,
  FormGroup,
  Row,
  Col,
  FormLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import ModalPromoTransferHist from "./ModalPromoTransferHist";
import { useRef } from "react";
import { setDefaultLocale } from "react-datepicker";

const normalizeCurrency = (value) => {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

function PayrollInfo({ empData }) {
  const [bcode, setBcode] = useState([]);
  const [ccode, setCcode] = useState([]);
  const [gcode, setGcode] = useState([]);
  const [nature, setNature] = useState([]);

  const payroll = {
    employeeNo: "",
    datePrepare: "",
    dateEffect: "",
    nature: "",
    ogroupCode: "",
    ocompanyCode: "",
    obranchCode: "",
    agroupCode: "",
    acompanyCode: "",
    abranchCode: "",
    rank: "",
    workPosition: "",
    basic: "",
    ecola: "",
    allowance1: "",
    allowance2: "",
    others: "",
    remarks: "",
  };

  const ogcRef = useRef();
  const agcRef = useRef();
  const occRef = useRef();
  const accRef = useRef();
  const obcRef = useRef();
  const abcRef = useRef();
  const natureRef = useRef();
  const datePrepareRef = useRef();
  const dateEffectRef = useRef();
  const rankRef = useRef();
  const taxRef = useRef();
  const exemptionRef = useRef();
  const basicRef = useRef();
  const ecolaRef = useRef();
  const allow1Ref = useRef();
  const allow2Ref = useRef();
  const coopRef = useRef();
  const jobRef = useRef();
  const remarksRef = useRef();

  useEffect(() => {
    getDropDown();
    // ogcRef.current.value = empData.ogroupCode;
    // occRef.current.value = empData.ocompanyCode;
    // obcRef.current.value = empData.obranchCode;
  }, []);

  useEffect(() => {
    ogcRef.current.value = empData.ogroupCode;
    occRef.current.value = empData.ocompanyCode;
    obcRef.current.value = empData.obranchCode;
    accRef.current.value = empData.acompanyCode;
    agcRef.current.value = empData.agroupCode;
    abcRef.current.value = empData.abranchCode;
  });

  useEffect(() => {
    ogcRef.current.value = empData.ogroupCode;
    occRef.current.value = empData.ocompanyCode;
    obcRef.current.value = empData.obranchCode;
    accRef.current.value = empData.acompanyCode;
    agcRef.current.value = empData.agroupCode;
    abcRef.current.value = empData.abranchCode;
    dateEffectRef.current.value = "";
    datePrepareRef.current.value = "";
    rankRef.current.value = empData.rank;
    taxRef.current.value = empData.taxCode;
    exemptionRef.current.value = numberFormat(empData.exemption);
    basicRef.current.value = numberFormat(empData.basicPay);
    ecolaRef.current.value = numberFormat(empData.cola);
    allow1Ref.current.value = numberFormat(empData.allowance1);
    allow2Ref.current.value = numberFormat(empData.allowance2);
    coopRef.current.value = "";
    jobRef.current.value = empData.workPosition;
    natureRef.current.value = "";
    remarksRef.current.value = empData.remarks;
  }, [empData]);

  const obj = [];
  const rows = [];

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  for (let i = 0; i < bcode.length; i++) {
    rows.push(<row key={i} value={bcode[i]} />);
  }

  const getDropDown = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get("http://localhost:8080/api/branches/bcode")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setBcode(data);
      })
      .catch((message) => {
        alert(message);
      });

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get("http://localhost:8080/api/company/ccode")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setCcode(data);
      })
      .catch((message) => {
        alert(message);
      });

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get("http://localhost:8080/api/group1/gcode")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setGcode(data);
      })
      .catch((message) => {
        alert(message);
      });

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get("http://localhost:8080/api/nature/listAll")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setNature(data);
      })
      .catch((message) => {
        alert(message);
      });
  };

  const checkChange = (val, val2) => {
    return val === numberFormat(val2)
      ? val
      : numberFormat(val.replaceAll(",", ""));
  };

  const saveChanges = () => {
    setCheckData();
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .post("http://localhost:8080/api/payroll/save", payroll, {
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
          saveEmp();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveEmp = () => {
    axios
      .post("http://localhost:8080/api/masemployeeSave", empData, {
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
          // success = true;
          alert("Data Saved!");
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const formatCurrency = (val) => {
    return val.replaceAll(",", "").replaceAll("₱", "");
  };

  const addZero = (empNo) => {
    var empString = String(empNo);
    var length = empString.length;
    for (let i = length; i < 4; i++) {
      empString = "0" + empString;
    }
    return empString;
  };

  const setCheckData = () => {
    payroll.employeeNo = addZero(empData.employeeNo);
    payroll.exemption = formatCurrency(exemptionRef.current.value);
    payroll.basic = formatCurrency(basicRef.current.value);
    payroll.ecola = formatCurrency(ecolaRef.current.value);
    payroll.allowance1 = formatCurrency(allow1Ref.current.value);
    payroll.allowance2 = formatCurrency(allow1Ref.current.value);
    payroll.agroupCode = agcRef.current.value;
    payroll.acompanyCode = accRef.current.value;
    payroll.abranchCode = abcRef.current.value;
    payroll.ogroupCode = ogcRef.current.value;
    payroll.ocompanyCode = occRef.current.value;
    payroll.obranchCode = obcRef.current.value;
    payroll.workPosition = jobRef.current.value;
    payroll.remarks = remarksRef.current.value;
    payroll.nature = natureRef.current.value;

    empData.agroupCode = agcRef.current.value;
    empData.acompanyCode = accRef.current.value;
    empData.abranchCode = abcRef.current.value;
    empData.ogroupCode = ogcRef.current.value;
    empData.ocompanyCode = occRef.current.value;
    empData.obranchCode = obcRef.current.value;
    empData.exemption = formatCurrency(exemptionRef.current.value);
    empData.basicPay = formatCurrency(basicRef.current.value);
    empData.cola = formatCurrency(ecolaRef.current.value);
    empData.allowance1 = formatCurrency(allow1Ref.current.value);
    empData.allowance2 = formatCurrency(allow1Ref.current.value);
    empData.workPosition = jobRef.current.value;
    empData.remarks = remarksRef.current.value;
    empData.taxCode = taxRef.current.value;
    empData.rank = rankRef.current.value;
  };

  return (
    <Card className={" border-dark bg-dark text-white"}>
      <Card.Body>
        <Form as={Row}>
          <FormGroup as={Row}>
            <FormGroup as={Col}>
              <label className="asHeader">Original Company</label>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Group Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={ogcRef}
                    onChange={(event) =>
                      (empData.ogroupCode = event.target.value)
                    }
                  >
                    <option></option>
                    {gcode.map((code) => (
                      <option value={code.groupCode} key={code.groupCode}>
                        {code.groupCode} - {code.groupName}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Company Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={occRef}
                    onChange={(event) =>
                      (empData.ocompanyCode = event.target.value)
                    }
                  >
                    <option></option>
                    {ccode.map((o, i) => (
                      <option
                        value={ccode[i].substring(0, ccode[i].indexOf(","))}
                        key={ccode[i].substring(0, ccode[i].indexOf(","))}
                      >
                        {ccode[i].substring(0, ccode[i].indexOf(",")) +
                          " - " +
                          ccode[i].substring(ccode[i].indexOf(",") + 1)}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Branch Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={obcRef}
                    onChange={(event) =>
                      (empData.obranchCode = event.target.value)
                    }
                  >
                    <option></option>
                    {bcode.map((o, i) => (
                      <option
                        value={bcode[i].substring(0, bcode[i].indexOf(","))}
                        key={bcode[i].substring(0, bcode[i].indexOf(","))}
                      >
                        {bcode[i].substring(0, bcode[i].indexOf(",")) +
                          " - " +
                          bcode[i].substring(bcode[i].indexOf(",") + 1)}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
            </FormGroup>
            <FormGroup as={Col} style={{ paddingRight: "0px" }}>
              <label className="asHeader">Actual Company</label>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Group Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={agcRef}
                  >
                    <option></option>
                    {gcode.map((code, i) => (
                      <option value={code.groupCode} key={code.groupCode}>
                        {code.groupCode} - {code.groupName}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Company Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={accRef}
                  >
                    <option></option>
                    {ccode.map((o, i) => (
                      <option
                        value={ccode[i].substring(0, ccode[i].indexOf(","))}
                        key={ccode[i].substring(0, ccode[i].indexOf(","))}
                      >
                        {ccode[i].substring(0, ccode[i].indexOf(",")) +
                          " - " +
                          ccode[i].substring(ccode[i].indexOf(",") + 1)}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Branch Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={abcRef}
                  >
                    <option></option>
                    {bcode.map((o, i) => (
                      <option
                        value={bcode[i].substring(0, bcode[i].indexOf(","))}
                        key={bcode[i].substring(0, bcode[i].indexOf(","))}
                      >
                        {bcode[i].substring(0, bcode[i].indexOf(",")) +
                          " - " +
                          bcode[i].substring(bcode[i].indexOf(",") + 1)}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
            </FormGroup>
          </FormGroup>
          <FormGroup as={Row}>
            <label
              className="asHeader"
              style={{
                marginTop: "5px",
                marginLeft: "6px",
                marginRight: "0px",
              }}
            >
              Present Payroll Information
            </label>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Prepare Date
                </FormLabel>
                <Col>
                  <FormControl
                    ref={datePrepareRef}
                    className={"inpHeightXs"}
                    type="date"
                    onChange={(event) =>
                      (payroll.datePrepare = event.target.value)
                    }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Date Effect
                </FormLabel>
                <Col>
                  <FormControl
                    ref={dateEffectRef}
                    className={"inpHeightXs"}
                    type="date"
                    onChange={(event) =>
                      (payroll.dateEffect = new Date(
                        event.target.value
                      ).toLocaleDateString("en-CA"))
                    }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Rank/Level
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs"
                    // value={empData.rank}
                    ref={rankRef}
                    onChange={(event) => (payroll.rank = event.target.value)}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Tax Code
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs"
                    // value={empData.taxCode}
                    ref={taxRef}
                    onChange={(event) => (payroll.tax = event.target.value)}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Exemption
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs currency"
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
                    onBlur={(event) => {
                      exemptionRef.current.value = checkChange(
                        exemptionRef.current.value,
                        empData.exemption
                      );
                    }}
                    ref={exemptionRef}
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* new column   ################################## */}
            <FormGroup as={Col} style={{ paddingRight: "0px" }}>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Basic Pay
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs currency"
                    ref={basicRef}
                    // value={empData.basicPay}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
                    onBlur={(event) => {
                      basicRef.current.value = checkChange(
                        basicRef.current.value,
                        empData.basicPay
                      );
                    }}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText ">
                  E-COLA
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs currency"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
                    onBlur={(event) => {
                      ecolaRef.current.value = checkChange(
                        ecolaRef.current.value,
                        empData.cola
                      );
                    }}
                    ref={ecolaRef}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Allow1-Meal
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs currency"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
                    onBlur={(event) => {
                      allow1Ref.current.value = checkChange(
                        allow1Ref.current.value,
                        empData.allowance1
                      );
                    }}
                    ref={allow1Ref}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Allow2-Night
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs currency"
                    onChange={(event) => {
                      const { value } = event.target;
                      event.target.value = normalizeCurrency(value);
                    }}
                    onBlur={(event) => {
                      allow2Ref.current.value = checkChange(
                        allow2Ref.current.value,
                        empData.allowance2
                      );
                    }}
                    ref={allow2Ref}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Coop Contr.
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs"
                    ref={coopRef}
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* new column   ################################## */}
            <FormGroup as={Col} style={{ paddingRight: "0px" }}>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Job Position
                </FormLabel>
                <Col>
                  <FormControl
                    className="inpHeightXs"
                    ref={jobRef}
                    onChange={(event) =>
                      (payroll.workPosition = event.target.value)
                    }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Act. Nature
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={natureRef}
                    onChange={(event) => (empData.nature = event.target.value)}
                  >
                    <option></option>
                    {nature.map((code) => (
                      <option value={code.natureName} key={code.id}>
                        {code.id} - {code.natureName}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Remarks
                </FormLabel>
                <Col>
                  <FormControl
                    as="textarea"
                    rows={2}
                    className="inpHeightXs"
                    style={{ height: "60px" }}
                    ref={remarksRef}
                    onChange={(event) => (payroll.remarks = event.target.value)}
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
          </FormGroup>
        </Form>
        <ModalPromoTransferHist empNo={empData.employeeNo} />
      </Card.Body>
      <Card.Footer>
        <div></div>
        <div style={{ display: "grid" }}>
          <button
            type="submit"
            className="btn btn-success btn-md buttonRight"
            style={{ width: "80px", "margin-top": "5px" }}
            onClick={() => saveChanges()}
          >
            Save
          </button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default PayrollInfo;
