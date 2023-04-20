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
  Form,
  FormGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";

export const GroupList = () => {
  const groupCodeRef = useRef();
  const groupNameRef = useRef();
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState([]);
  var setArray = { groupCode: "", groupName: "" };
  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  var [delId, setDelId] = useState("");

  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
  const baseURL = localStorage.getItem("baseURL");

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/group1/gcode").then((response) => {
      setGroups(response.data);
      console.log(response.data);
    });
  };

  const validateFirst = () => {
    if (
      groupCodeRef.current.value === "" ||
      groupNameRef.current.value === ""
    ) {
      setMessage("Fill All Details");
      setShowMsg(true);
    } else {
      saveNew();
    }
  };

  const saveGroup = () => {
    axios
      .post(baseURL + "/api/group1/save", setArray, {
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

  const delData = () => {
    axios
      .delete(baseURL + "/api/group1/delete/" + delId, {
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

  function setRowGroup(row) {
    setGroup(row);
    groupCodeRef.current.value = row.groupCode;
    groupNameRef.current.value = row.groupName;
  }

  const saveNew = () => {
    setArray.groupCode = groupCodeRef.current.value.toUpperCase();
    setArray.groupName = groupNameRef.current.value.toUpperCase();
    console.log(setArray);
    saveGroup();
  };

  const deleteGroup = () => {
    setAction("DELETE");
    setShowMod(true);
    //delAttainment(roww);
  };

  const handleClose = (deleteAtt) => {
    if (deleteAtt) {
      delData();
      setShowMod(false);
    } else {
      setShowMod(false);
    }
  };

  const clearFields = () => {
    groupCodeRef.current.value = "";
    groupNameRef.current.value = "";
  };

  const handleChange = (event) => {
    event.target.value.toUpperCase();
  };

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setRowGroup(row);
      // setId(row.employeeNo);
      setDelId(row.groupCode);
      return true;
    },
    style: { width: "20px" },
  };
  const columns = [
    {
      // dataField: "username",
      dataField: "groupCode",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group list",
      }),
      style: { width: "100px", textAlign: "center" },
    },
    {
      // dataField: "currentGroup",
      dataField: "groupName",
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Group name",
      }),
      style: { paddingLeft: "10px" },
    },
  ];

  return (
    <div>
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body style={{ paddingTop: "0px" }}>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            Group Information
          </label>
          <FormGroup
            as={Row}
            style={{ paddingRight: "0px", justifyContent: "center" }}
          >
            <FormGroup as={Row}>
              <FormLabel column sm="1" className="noWrapText">
                Group Code
              </FormLabel>
              <Col sm="2">
                <FormControl
                  ref={groupCodeRef}
                  className="inpHeightXs"
                  style={{ textTransform: "uppercase" }}
                  // onChange={(event) =>
                  //   (empData.paddress = event.target.value)
                  // }
                ></FormControl>
              </Col>
              <FormLabel column sm="1" className="noWrapText">
                Group Name
              </FormLabel>
              <Col>
                <FormControl
                  ref={groupNameRef}
                  className="inpHeightXs"
                  style={{ textTransform: "uppercase" }}
                ></FormControl>
              </Col>
            </FormGroup>
          </FormGroup>
          <label className="asHeader" style={{ paddingLeft: "5px" }}>
            Group List
          </label>
          <Container style={{ width: "500px" }}>
            <BootstrapTable
              id="bsTable2"
              keyField="groupCode"
              data={groups}
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
                    value: 5,
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
        </Card.Body>
        <Card.Footer>
          <div style={{ display: "flex" }}>
            <button
              type="submit"
              className="btn btn-danger btn-md buttonRight"
              style={{ width: "80px", marginTop: "0px", marginRight: "5px" }}
              onClick={() => deleteGroup()}
            >
              Delete
            </button>
            <button
              type="submit"
              className="btn btn-success btn-md "
              style={{ width: "80px", marginTop: "0px" }}
              onClick={() => validateFirst()}
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
