import React, { useRef, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
// import { PDFView } from "react.pdf.stream";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  Container,
  Modal,
  FormSelect,
} from "react-bootstrap";
// import { jsPDF } from "jspdf-react";

export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState([]);
  const [data, setData] = useState("");
  const [fileURL, setFileUrl] = useState("");
  const [show, setShow] = useState(false);
  const [bcode, setBcode] = useState([]);
  const [ccode, setCcode] = useState([]);
  const [gcode, setGcode] = useState([]);
  const [disCcode, setDisCcode] = useState(true);
  const [disBcode, setDisBcode] = useState(true);
  const [disGcode, setDisGcode] = useState(true);
  const [disPayPeriod, setDisPayPeriod] = useState(true);
  const [disPeriod2, setDisPeriod2] = useState(true);
  const [repName, setRepName] = useState("");
  const [loading, setL] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [selectedId, setId] = useState("");
  const [byEmp, setByEmp] = useState(false);

  const agcRef = useRef();
  const accRef = useRef();
  const abcRef = useRef();
  const payPeriodFromRef = useRef();
  const payPeriodToRef = useRef();

  useEffect(() => {
    getData();
    getDropDown();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/reports").then((response) => {
      setReports(response.data);
      console.log(response.data);
    });
  };

  // const printReport = () => {
  //   alert(agcRef.current.value);
  //   axios.defaults.headers.common["Authorization"] =
  //     "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
  //   axios
  //     .get("http://localhost:8080/api/reports/sample", {
  //       headers: {
  //         contentType: "application/json",
  //         accept: "application/pdf",
  //       },
  //       responseType: "blob",
  //       // responseType: "arraybuffer",
  //     })
  //     .then((response) => {
  //       const file = new Blob([response.data], { type: "application/pdf" });
  //       setFileUrl(window.URL.createObjectURL(file));
  //       window.open(fileURL);
  //       setShow(false);
  //     });
  // };

  const printReport = () => {
    var codeFilter =
      agcRef.current.value +
      "" +
      accRef.current.value +
      "" +
      abcRef.current.value +
      "" +
      selectedId;
    var per1 = payPeriodFromRef.current.value
      ? payPeriodFromRef.current.value
      : new Date().toLocaleDateString("en-CA");
    var per2 = payPeriodToRef.current.value
      ? payPeriodToRef.current.value
      : new Date().toLocaleDateString("en-CA");
    var reportName = report.jrxml;
    var printBy = report.reportName;
    codeFilter = codeFilter ? codeFilter : " ";

    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get(
        "http://localhost:8080/api/reports/print/" +
          reportName +
          "/" +
          codeFilter +
          "/" +
          printBy +
          "/" +
          per1 +
          "/" +
          per2,
        {
          headers: {
            contentType: "application/json",
            accept: "application/pdf",
          },
          responseType: "blob",
          // responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        // setFileUrl(window.URL.createObjectURL(file));
        window.open(window.URL.createObjectURL(file));
        setShow(false);
        disableFields();
      });
  };

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
  };

  const getEmp = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/masemployees").then((response) => {
      setEmployee(response.data);
      setL(false);
      console.log(response.data);
    });
  };

  const disableFields = () => {
    setDisBcode(true);
    setDisCcode(true);
    setDisGcode(true);
    setDisPayPeriod(true);
    setDisPeriod2(true);
    setByEmp(false);
  };

  const computeDates = () => {};

  const handleClose = () => {
    setByEmp(false);
    setShow(false);
    setDisPayPeriod(true);
    setDisPeriod2(true);
    setDisCcode(true);
    setDisBcode(true);
    setDisGcode(true);
    setId("");
  };
  const handleShow = () => {
    setShow(true);
  };

  const showFilter = () => {
    setId("");
    if (
      report.reportName === "By Actual Group" ||
      report.reportName === "Birthday List" ||
      report.reportName === "Active Employee List" ||
      report.reportName === "Employees Masterlist" ||
      report.reportName === "Maternity List" ||
      report.reportName === "Employees Information" ||
      report.reportName === "Company Master File" ||
      report.reportName === "Branch Master File"
    ) {
      setDisGcode(false);
    }
    if (report.reportName === "By Actual Company") {
      setDisCcode(false);
    }
    if (report.reportName === "By Actual Branch") {
      setDisBcode(false);
    }
    if (report.reportName === "By Employee") {
      setByEmp(true);
      getEmp();
    }
    if (
      report.reportName === "Hiring List" ||
      report.reportName === "Probationary List" ||
      report.reportName === "Terminated List"
    ) {
      setDisPayPeriod(false);
      setDisPeriod2(false);
    }
    setShow(true);
  };

  const addZero = (empNo) => {
    var empString = String(empNo);
    var length = empString.length;
    for (let i = length; i < 4; i++) {
      empString = "0" + empString;
    }
    return empString;
  };

  const nameFormatterEmp = (data, row) => {
    return (
      <span>
        {row.lastName}, {row.firstName}{" "}
        <a style={{ color: "blue" }}>{addZero(row.employeeNo)}</a>
      </span>
    );
  };

  const nameFormatter = (data, row) => {
    return (
      <span>
        {row.reportGroupCode} - {row.reportGroupName}
      </span>
    );
  };
  function nameFilterFormatter(cell, row) {
    return row.reportGroupCode + row.reportGroupName;
  }

  const selectRowPropEmp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      // setRowEmp(row);
      setId(row.employeeNo);
      return true;
    },
  };

  function nameFilterFormatterEMP(cell, row) {
    return row.lastName + row.firstName + addZero(row.employeeNo);
  }

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setReport(row);
      console.log(row);
      return true;
    },
  };

  const columnsEmp = [
    {
      // dataField: "username",
      dataField: "lastName",
      formatter: nameFormatterEmp,
      text: "Filter",
      sort: true,
      filterValue: (cell, row) => nameFilterFormatterEMP(cell, row),
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

  const columns = [
    {
      // dataField: "username",
      dataField: "reportGroupName",
      formatter: nameFormatter,
      text: "Filter",
      sort: true,
      filterValue: (cell, row) => nameFilterFormatter(cell, row),
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Name...",
      }),
      style: { paddingLeft: "5px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "reportName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group...",
      }),
      style: { paddingLeft: "5px" },
    },
  ];

  return (
    <div
      style={{
        marginTop: "15px",
        marginBottom: "10px",
        paddingBottom: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ width: "40rem" }}
      >
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            PRINT REPORTS
          </label>

          <label className="separator"> </label>
          <Container>
            <BootstrapTable
              id="bsTable"
              // keyField="userId"
              keyField="reportID"
              data={reports}
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
                    value: 12,
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

          {/* <label className="separator"> </label>   */}
        </Card.Body>
        <Card.Footer>
          <FormGroup as={Row}>
            <Col sm="9"></Col>
            <Col sm="2">
              <Button
                className="setButtonMargin"
                variant="primary"
                onClick={() => showFilter()}
              >
                Continue
              </Button>
            </Col>
            {/* <Col sm="3">
              <Button
                className="setButtonMargin"
                variant="danger"
                onClick={() => deleteUser()}
              >
                Remove
              </Button>
            </Col> */}
            <Col sm="3"></Col>
          </FormGroup>
        </Card.Footer>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>Print By</Modal.Title>
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
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Group Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    autoFocus
                    ref={agcRef}
                    disabled={disGcode}
                    // onChange={(event) =>
                    //   (empData.ogroupCode = event.target.value)
                    // }
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
                <FormLabel column sm="4" className="noWrapText">
                  Company Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={accRef}
                    autoFocus
                    disabled={disCcode}
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
                <FormLabel column sm="4" className="noWrapText">
                  Branch Code
                </FormLabel>
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={abcRef}
                    disabled={disBcode}
                    autoFocus
                    // onChange={(event) =>
                    //   (empData.obranchCode = event.target.value)
                    // }
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
              <label className="separator"></label>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Payroll Period From
                </FormLabel>
                <Col>
                  <FormControl
                    ref={payPeriodFromRef}
                    className="inpHeightXs"
                    disabled={disPayPeriod}
                    type="date"
                    autoFocus
                    onChange={(e) => computeDates(e)}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="4">
                  Payroll Period To
                </FormLabel>
                <Col>
                  <FormControl
                    ref={payPeriodToRef}
                    className="inpHeightXs"
                    type="Date"
                    disabled={disPeriod2}
                  ></FormControl>
                </Col>
              </FormGroup>
            </Container>
            {byEmp ? (
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
                    data={employee}
                    columns={columnsEmp}
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
                          value: 5,
                        },
                        {
                          text: "15",
                          value: 10,
                        },
                      ],
                    })}
                    filter={filterFactory()}
                    rowStyle={{ padding: "1px" }}
                    rowClasses="empTableRow"
                    headerClasses="empTableHeader"
                    selectRow={selectRowPropEmp}
                    // rowEvents={rowEvents}
                    // rowEvents={ rowEvents }
                  ></BootstrapTable>
                )}
              </Container>
            ) : (
              <a></a>
            )}
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={printReport}>
            Print
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
