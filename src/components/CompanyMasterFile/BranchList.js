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

export const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState([]);

  const branchCodeRef = useRef();
  const groupCodeRef = useRef();
  const companyCodeRef = useRef();
  const addressRef = useRef();
  const branchNameRef = useRef();

  function setRowCompany(row) {
    setBranch(row);
    branchCodeRef.current.value = row.branchCode;
    groupCodeRef.current.value = row.groupCode;
    companyCodeRef.current.value = row.companyCode;
    addressRef.current.value = row.branchAddress;
    branchNameRef.current.value = row.branchName;
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get("http://localhost:8080/api/branches").then((response) => {
      setBranches(response.data);
      console.log(response.data);
    });
  };

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowCompany(row);
      return true;
    },
  };
  const columns = [
    {
      dataField: "branchCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Branch Code",
      }),
      style: { width: "100px", textAlign: "center", padding: "0px" },
    },
    {
      // dataField: "username",
      dataField: "groupCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Grp. Code",
      }),
      style: { width: "100px", textAlign: "center", padding: "0px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "companyCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Comp. Code",
      }),
      style: { padding: "0px 0px 0px 5px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "branchName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Branch Name",
      }),
      style: { padding: "0px 0px 0px 5px" },
    },
    {
      // dataField: "currentGroup",
      dataField: "branchAddress",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Address",
      }),
      style: { padding: "0px 0px 0px 5px" },
    },
  ];

  return (
    <div>
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            BRANCH INFORMATION
          </label>
          <FormGroup as={Row}>
            <FormGroup as={Col}>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Branch Code
                </FormLabel>
                <Col>
                  <FormControl
                    ref={branchCodeRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="3" className="noWrapText">
                  Group Code
                </FormLabel>
                <Col>
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
                <FormLabel column sm="3" className="noWrapText">
                  Company Code
                </FormLabel>
                <Col>
                  <FormControl
                    ref={companyCodeRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
            </FormGroup>
            {/* <FormGroup as={Col} xs="1"></FormGroup> */}
            <FormGroup as={Col} sm="8">
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="2">
                  Branch Name
                </FormLabel>
                <Col sm="">
                  <FormControl
                    ref={branchNameRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column className="noWrapText" sm="2">
                  Address
                </FormLabel>
                <Col>
                  <FormControl
                    ref={addressRef}
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
            BRANCH LIST
          </label>
          <BootstrapTable
            id="bsTable"
            // keyField="userId"
            keyField="branchCode"
            data={branches}
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
                  value: 8,
                },
                {
                  text: "15",
                  value: 10,
                },
              ],
            })}
            filter={filterFactory()}
            rowStyle={{ padding: "1px" }}
            headerClasses="empTableHeader"
            selectRow={selectRowProp}
          ></BootstrapTable>
        </Card.Body>
      </Card>
    </div>
  );
};
