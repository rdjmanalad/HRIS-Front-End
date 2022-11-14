import React, { useRef, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import axios from "axios";
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
} from "react-bootstrap";
// import { jsPDF } from "jspdf-react";

export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/reports").then((response) => {
      setReports(response.data);
      console.log(response.data);
    });
  };

  const printReport = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .post("http://localhost:8080/api/reports/sample", {
        headers: {
          contentType: "application/json",
          accept: "application/pdf",
        },
        responseType: "arraybuffer",
      })
      .then((response) => {
        setData(response.data);
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        // var doc = new jsPDF();
        // doc.output(response.data);
        window.open(fileURL);

        // const arr = new Uint8Array(response.data);
        // console.log(arr);
        // const file = new Blob([arr], { type: "application/pdf" });
        // console.log(file);
        // const fileURL = URL.createObjectURL(file);
        // window.open(fileURL);
        // new File([response.data], fileName);
        console.log(response.data);
      });
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

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setReport(row);
      return true;
    },
  };

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
                onClick={() => printReport()}
              >
                Print
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
    </div>
  );
};
