import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import ModalConfirm from "../ModalAlerts/ModalConfirm";
import PopUpMsg from "../ModalAlerts/PopUpMsg";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Container,
  FormSelect,
} from "react-bootstrap";

export const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState([]);
  const [ccode, setCcode] = useState([]);
  const [gcode, setGcode] = useState([]);

  const branchCodeRef = useRef();
  const groupCodeRef = useRef();
  const companyCodeRef = useRef();
  const addressRef = useRef();
  const branchNameRef = useRef();
  const [delId, setDelId] = useState("");
  const baseURL = localStorage.getItem("baseURL");

  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");

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

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  useEffect(() => {
    getData();
    getDropDown();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/branches").then((response) => {
      setBranches(response.data);
      console.log(response.data);
    });
  };

  const saveBranch = () => {
    axios
      .post(baseURL + "/api/branches/save", setArray, {
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
          setMessage("Data Saved");
          setShowMsg(true);
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
      .delete(baseURL + "/api/branches/delete/" + delId, {
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
          // alert("Delete Success!");
          setMessage("Data Deleted");
          setShowMsg(true);
          clearFields();
          getData();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const getDropDown = () => {
    axios
      .get(baseURL + "/api/group1/gcode")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setGcode(data);
      })
      .catch((message) => {
        alert(message);
      });

    axios
      .get(baseURL + "/api/company/ccode")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setCcode(data);
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
    if (
      branchCodeRef.current.value === "" ||
      groupCodeRef.current.value === "" ||
      companyCodeRef.current.value === "" ||
      branchNameRef.current.value === "" ||
      addressRef.current.value === ""
    ) {
      setMessage("Please Fill All Fields");
      setShowMsg(true);
    } else {
      saveBranch();
    }
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
      style: { padding: "0px 0px 0px 5px", width: "300px" },
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
                    maxLength="4"
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
                {/* <Col>
                  <FormControl
                    ref={groupCodeRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col> */}
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={groupCodeRef}
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
                {/* <Col>
                  <FormControl
                    ref={companyCodeRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (group.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col> */}
                <Col>
                  <FormSelect
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    ref={companyCodeRef}
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
                    maxLength="30"
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
                    maxLength="3"
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
          <Container style={{ width: "900px" }}>
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
              className="btn btn-primary"
              style={{ width: "80px", marginTop: "0px", marginRight: "5px" }}
              onClick={() => clearFields()}
            >
              Clear
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
      {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
      {showMod ? (
        <ModalConfirm handleClose={handleClose} action={action}></ModalConfirm>
      ) : (
        <a></a>
      )}
    </div>
  );
};
