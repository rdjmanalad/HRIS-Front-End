import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";

export const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState([]);

  const companyCodeRef = useRef();
  const groupCodeRef = useRef();
  const companyNameRef = useRef();
  const companyAddressRef = useRef();
  const philSignatoryRef = useRef();
  const philPositionRef = useRef();
  const tinRef = useRef();
  const sssnoRef = useRef();
  const philhealthNoRef = useRef();
  const dateOpenRef = useRef();
  const pagibigNoRef = useRef();
  const pagibigBranchRef = useRef();
  const locIDRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/company").then((response) => {
      setCompanies(response.data);
      console.log(response.data);
    });
  };

  function setRowCompany(row) {
    setCompany(row);
    companyCodeRef.current.value = row.companyCode;
    groupCodeRef.current.value = row.groupCode;
    companyNameRef.current.value = row.companyName;
    companyAddressRef.current.value = row.companyAddress;
    tinRef.current.value = row.tin;
    sssnoRef.current.value = row.sssnumber;
    pagibigNoRef.current.value = row.pagibigNumber;
    dateOpenRef.current.value = row.dateOpen;
  }

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowCompany(row);
      // setId(row.employeeNo);
      return true;
    },
    // style: { width: "20px" },
  };
  const columns = [
    {
      // dataField: "username",
      dataField: "companyCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px", width: "80px" },
        placeholder: "Comp. Code",
      }),
      style: { width: "100px", textAlign: "center", padding: "0px" },
    },
    {
      // dataField: "username",
      dataField: "groupCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px", width: "80px" },
        placeholder: "Grp. Code",
      }),
      style: { width: "100px", textAlign: "center", padding: "0px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "companyName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group name",
      }),
      style: { padding: "0px 0px 0px 5px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "companyAddress",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Comp. Address",
      }),
      style: { padding: "0px 0px 0px 5px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "tin",
      text: "TIN",
      sort: true,
      style: { padding: "0px 0px 0px 5px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "sssnumber",
      text: "SSS",
      sort: true,
      style: { padding: "0px 0px 0px 5px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "dateOpen",
      text: "Philhealth SPA",
      sort: true,
      style: { padding: "0px 0px 0px 5px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "pagibigNumber",
      text: "Pagibig",
      sort: true,
      style: { padding: "0px 0px 0px 5px" },
    },
  ];

  return (
    <div>
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body style={{ paddingTop: "0px" }}>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            COMPANY INFORMATION
          </label>
          <FormGroup as={Row}>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="2" className="noWrapText">
                  Company Code
                </FormLabel>
                <Col sm="3">
                  <FormControl
                    ref={companyCodeRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="2" className="noWrapText">
                  Group Code
                </FormLabel>
                <Col sm="3">
                  <FormControl
                    ref={groupCodeRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="2" className="noWrapText">
                  Company Name
                </FormLabel>
                <Col>
                  <FormControl
                    ref={companyNameRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="2" className="noWrapText">
                  Address
                </FormLabel>
                <Col>
                  <FormControl
                    ref={companyAddressRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="2" className="noWrapText">
                  Phil. Signatory
                </FormLabel>
                <Col>
                  <FormControl
                    ref={philSignatoryRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="2" className="noWrapText">
                  Phil. Position
                </FormLabel>
                <Col>
                  <FormControl
                    ref={philPositionRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* <FormGroup as={Col} xs="1"></FormGroup> */}
            <FormGroup as={Col} sm="3">
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="4">
                  Tin No.
                </FormLabel>
                <Col sm="">
                  <FormControl
                    ref={tinRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="4">
                  SSS No.
                </FormLabel>
                <Col>
                  <FormControl
                    ref={sssnoRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="4">
                  Philhealth No.
                </FormLabel>
                <Col>
                  <FormControl
                    ref={philhealthNoRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>

              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="4">
                  Philhealth SPA
                </FormLabel>
                <Col>
                  <FormControl
                    ref={dateOpenRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="4">
                  Pagibig No.
                </FormLabel>
                <Col>
                  <FormControl
                    ref={pagibigNoRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="4">
                  Pagibig Branch
                </FormLabel>
                <Col>
                  <FormControl
                    ref={pagibigBranchRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="4">
                  SSS Locator
                </FormLabel>
                <Col>
                  <FormControl
                    ref={locIDRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
          </FormGroup>

          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            COMPANY LIST
          </label>
          <Container>
            <BootstrapTable
              id="bsTable"
              // keyField="userId"
              keyField="companyCode"
              data={companies}
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
                    value: 3,
                  },
                  {
                    text: "15",
                    value: 10,
                  },
                ],
              })}
              filter={filterFactory()}
              rowStyle={{ padding: "1px" }}
              // rowClasses="text-nowrap"
              headerClasses="empTableHeader"
              selectRow={selectRowProp}
              // rowEvents={ rowEvents }
            ></BootstrapTable>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};
