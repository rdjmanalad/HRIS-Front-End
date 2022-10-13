import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import ModalConfirm from "../ModalAlerts/ModalConfirm";
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
  const [delId, setDelId] = useState("");

  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");

  var setArray = {
    branchCode: "",
    groupCode: "",
    companyCode: "",
    branchName: "",
    branchAddress: "",
  };

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

  const saveBranch = () => {
    axios
      .post("http://localhost:8080/api/branches/save", setArray, {
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
          getData();
          clearFields();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const deleteBranch = () => {
    axios
      .delete("http://localhost:8080/api/branches/delete/" + delId, {
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
          alert("Delete Success!");
          clearFields();
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveData = () => {
    setArray.branchCode = branchCodeRef.current.value;
    setArray.groupCode = groupCodeRef.current.value;
    setArray.companyCode = companyCodeRef.current.value;
    setArray.branchName = branchNameRef.current.value;
    setArray.branchAddress = addressRef.current.value;
    saveBranch();
  };

  const clearFields = () => {
    branchCodeRef.current.value = "";
    groupCodeRef.current.value = "";
    companyCodeRef.current.value = "";
    addressRef.current.value = "";
    branchNameRef.current.value = "";
  };

  const deleteData = () => {
    setAction("DELETE");
    setShowMod(true);
    //delAttainment(roww);
  };

  const handleClose = (deleteAtt) => {
    if (deleteAtt) {
      deleteBranch();
      setShowMod(false);
    } else {
      setShowMod(false);
    }
  };

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowCompany(row);
      setDelId(row.branchCode);
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
      style: { padding: "0px ", textAlign: "center", width: "100px" },
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
      style: { padding: "0px", textAlign: "center", width: "100px" },
    },
  ];

  return (
    <div>
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body style={{ paddingBottom: "0px" }}>
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
          <Container style={{ width: "700px" }}>
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
          </Container>
        </Card.Body>
        <Card.Footer>
          <div style={{ display: "flex" }}>
            <button
              type="submit"
              className="btn btn-danger btn-md buttonRight"
              style={{ width: "80px", marginTop: "0px", marginRight: "5px" }}
              onClick={() => deleteData()}
            >
              Delete
            </button>
            <button
              type="submit"
              className="btn btn-success btn-md "
              style={{ width: "80px", marginTop: "0px" }}
              onClick={() => saveData()}
            >
              Save
            </button>
          </div>
        </Card.Footer>
      </Card>
      {showMod ? (
        <ModalConfirm handleClose={handleClose} action={action}></ModalConfirm>
      ) : (
        <a></a>
      )}
    </div>
  );
};
