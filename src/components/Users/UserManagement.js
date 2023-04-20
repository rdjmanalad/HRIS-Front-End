import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Button,
  Modal,
  Container,
  FormSelect,
} from "react-bootstrap";
import {
  BsFileEarmarkPlusFill,
  BsFileEarmarkMinusFill,
  BsFileEarmarkFontFill,
} from "react-icons/bs";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { textFilter } from "react-bootstrap-table2-filter";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { shouldForwardProp } from "@mui/styled-engine";
import PopUpMsg from "../ModalAlerts/PopUpMsg";

export const UserManagement = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const userTypeRef = useRef();
  const newPassRef = useRef();
  const confirmPassdRef = useRef();

  const nusernameRef = useRef();
  const npasswordRef = useRef();
  const nuserTypeRef = useRef();
  const nconfirmPassdRef = useRef();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [nuser, setNuser] = useState([]);
  const [tooltip, showTooltip] = useState(true);
  const [roles, setRoles] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  var [displayAdd, setDisplayAdd] = useState(false);
  const baseURL = localStorage.getItem("baseURL");

  const [show, setShow] = useState(false);
  const [showDel, setShowDel] = useState(false);

  const [rowInd, setRowInd] = useState(0);
  const [haveDel, setHaveDel] = useState(false);

  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [enable, setEnable] = useState(true);
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");

  useEffect(() => {
    getUsers();
    getRoles();
    setShow(true);
  }, []);

  useEffect(() => {
    getUsers();
  }, [haveDel]);

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  const getUsers = () => {
    if (userRole === "ROLE_USER") {
      setEnable(false);
    }
    console.log(userRole);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get(baseURL + "/api/users")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((message) => {
        alert(message);
      });
  };

  const getRoles = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get(baseURL + "/api/roles")
      .then((response) => response.data)
      .then((data) => {
        setRoles(data);
      })
      .catch((message) => {
        alert(message);
      });
  };

  const handleClose = () => {
    setShow(false);
    passwordRef.current.value = "";
    usernameRef.current.value = "";
  };
  const handleShow = () => {
    getUsers();
    setShow(true);
    setDisplayAdd(false);
    setAddMode(false);
    setEditMode(false);
  };

  const handleCloseDel = () => {
    setShow(false);
    setShowDel(true);
  };

  const handleXButton = () => {
    setShowDel(false);
    handleShow();
  };

  const handleCloseConfirmDel = () => {
    deleteUser();
    setShowDel(false);
    handleShow();
  };

  const clearE = () => {
    passwordRef.current.value = "";
    usernameRef.current.value = "";
    newPassRef.current.value = "";
    confirmPassdRef.current.value = "";
    userTypeRef.current.value = 0;
  };

  useEffect(() => {
    if (displayAdd) {
      npasswordRef.current.value = "";
      nusernameRef.current.value = "";
      nconfirmPassdRef.current.value = "";
      nuserTypeRef.current.value = 0;

      user.id = "";
      user.name = "";
      user.username = "";
      user.password = "";
    }
  }, [displayAdd]);

  const handleAdd = () => {
    setUser(users[0]);
    // user.roles = roles;

    setDisplayAdd(true);
    setAddMode(true);
    setEditMode(false);
    setShow(false);
  };

  const handleEdit = () => {
    setAddMode(false);
    setEditMode(true);
    setDisplayAdd(false);
    setShow(false);

    // newPassRef.current.value = "";
    // usernameRef.current.value = "";
    // confirmPassdRef.current.value = "";

    usernameRef.current.value = user.username;
    passwordRef.current.value = user.password;
    userTypeRef.current.value = user.roles[0].id;
  };

  const handleReset = () => {
    user.password = "1234";
    validSaveEdit();
  };

  function validSaveEdit() {
    // alert(userTypeRef.current.value);
    // user.username = usernameRef.current.value;
    // user.roles[0].id = user.role;
    axios
      .post(baseURL + "/api/saveUsers", user, {
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
          // alert("Edit Success!");
          setMessage("Edited Data Saved");
          setShowMsg(true);
          clearE();
          // handleShow();
        }
      });
  }

  function validSave() {
    user.roles[0].id = user.role;
    axios
      .post(baseURL + "/api/saveUsers", user, {
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // alert("Save Success!");
          setMessage("Data Saved");
          setShowMsg(true);
          handleShow();
        }
      });
  }

  function nsave() {
    let info = checkFields();
    if (info === "ok") {
      validSave();
    } else {
      // alert(info);
      setMessage(info);
      setShowMsg(true);
    }
  }

  function save() {
    let info = checkFieldsEdit();
    if (info === "ok") {
      saveEdit();
    } else if (info === "oldPass") {
      saveEdit2();
    } else {
      // alert(info);
      setMessage(info);
      setShowMsg(true);
    }
  }

  function deleteUser() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .delete(baseURL + "/api/userDelete/" + user.id, {
        // header: { employeeNo: selectedId },
      })
      .then((response) => {
        if (response.status === 200) {
          // alert("Delete Success!");
          setMessage("Data Deleted");
          setShowMsg(true);
          setHaveDel(true);
          setUsers(users.splice(rowInd, 1));
        }
      });
  }

  function saveEdit() {
    axios
      .get(
        baseURL + "/api/checkPass/" + user.id + "/" + passwordRef.current.value,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          user.username = usernameRef.current.value;
          validSaveEdit();
          clearE();
          // saveEdit2();
        } else {
          // alert("Wrong Password!");
          setMessage("Incorrect Password");
          setShowMsg(true);
        }
      });
  }

  function saveEdit2() {
    user.username = usernameRef.current.value;
    user.roles[0].id = user.role;

    for (let i = 0; i < roles.length; i++) {
      // alert(roles[i].id);
      // alert(user.role);
      if (String(user.role) === String(roles[i].id)) {
        user.roles[0].name = roles[i].name;
      }
    }
    axios
      .put(baseURL + "/api/updateUser", user, {
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
          // alert("Edit Success!");
          setMessage("Edited Data Saved");
          setShowMsg(true);
          // handleShow();
        }
      });
  }

  function checkFields() {
    if (addMode) {
      if (nusernameRef.current.value === "") {
        return "Username must not be null";
      }
      if (npasswordRef.current.value === "") {
        return "Password must not be null";
      }
      if (nuserTypeRef.current.value === "") {
        return "User type must not be null";
      }
      if (npasswordRef.current.value !== nconfirmPassdRef.current.value) {
        return "Password did not match";
      }
    }
    return "ok";
  }

  function checkFieldsEdit() {
    if (editMode) {
      if (usernameRef.current.value === "") {
        return "Username must not be null";
      }
      if (userTypeRef.current.value === "") {
        return "User type must not be null";
      }
      if (passwordRef.current.value !== user.password) {
        if (passwordRef.current.value === "") {
          return "Password must not be null";
        }

        if (newPassRef.current.value === "") {
          return "New password must not be null";
        }
        if (newPassRef.current.value !== confirmPassdRef.current.value) {
          return "Password did not match";
        }
      } else {
        return "oldPass";
      }
    }
    user.password = newPassRef.current.value;
    return "ok";
  }

  const selectRowProp = {
    mode: "radio",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setUser(row);
      setRowInd(rowIndex);
      // setRoles(row.roles);
      return true;
    },
  };

  const nameFormatter = (data, row) => {
    return <span>{row.roles.map((roles) => roles.name + "  ")}</span>;
  };

  const columns = [
    {
      // dataField: "username",
      dataField: "username",
      //formatter: nameFormatter,
      text: "Filter",
      sort: true,
      // filterValue: (cell, row) => nameFilterFormatter(cell, row),
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Username...",
      }),
    },
    {
      // dataField: "currentGroup",
      dataField: "user",
      formatter: nameFormatter,
      text: "Filter",
      sort: true,
      filter: textFilter({
        style: { padding: "1px" },
        placeholder: "Role...",
      }),
      style: { width: "75px", textAlign: "center" },
    },
  ];

  return (
    <div
      style={{
        marginTop: "15px",
        marginBottom: "10px",
        paddingBottom: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card className={" border-dark bg-dark text-white floatTop"}>
        <Card.Body>
          <label
            className="asHeader"
            style={{ paddingLeft: "5px", backgroundColor: "red" }}
            onClick={handleShow}
          >
            CLICK TO SHOW USER LIST ▲
          </label>
          {!addMode ? (
            <div>
              <label className="asHeader" style={{ paddingLeft: "5px" }}>
                EDIT USER ACCOUNT
              </label>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Username
                </FormLabel>
                <Col>
                  <FormControl
                    ref={usernameRef}
                    className="inpHeightXs"
                    onChange={(event) => (user.username = event.target.value)}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Password
                </FormLabel>
                <Col>
                  <FormControl
                    type="password"
                    ref={passwordRef}
                    className="inpHeightXs"
                    onFocus={(e) => e.target.select()}
                    // onChange={(event) => (user.password = event.target.value)}
                  ></FormControl>
                </Col>
              </FormGroup>
              <label className="separator"> </label>

              <div>
                <FormGroup as={Row}>
                  <FormLabel column sm="4" className="noWrapText">
                    New Password
                  </FormLabel>
                  <Col>
                    <FormControl
                      type="password"
                      ref={newPassRef}
                      className="inpHeightXs"
                      // onChange={(event) =>
                      //   (empData.paddress = event.target.value)
                      // }
                    ></FormControl>
                  </Col>
                </FormGroup>
              </div>

              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Confirm Password
                </FormLabel>
                <Col>
                  <FormControl
                    ref={confirmPassdRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (empData.paddress = event.target.value)
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  User Type
                </FormLabel>
                <Col>
                  <FormSelect
                    ref={userTypeRef}
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    disabled={!enable}
                    onChange={(event) => (user.role = event.target.value)}
                  >
                    <option></option>
                    {roles.map((role) => (
                      <option value={role.id} key={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
            </div>
          ) : (
            <div>
              <label className="asHeader" style={{ paddingLeft: "5px" }}>
                NEW USER ACCOUNT
              </label>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Username
                </FormLabel>
                <Col>
                  <FormControl
                    ref={nusernameRef}
                    className="inpHeightXs"
                    onChange={(event) => (user.username = event.target.value)}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Password
                </FormLabel>
                <Col>
                  <FormControl
                    type="password"
                    ref={npasswordRef}
                    className="inpHeightXs"
                    onChange={(event) => (user.password = event.target.value)}
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  Confirm Password
                </FormLabel>
                <Col>
                  <FormControl
                    ref={nconfirmPassdRef}
                    className="inpHeightXs"
                    // onChange={(event) =>
                    //   (setConfirmPass(event.target.value))
                    // }
                  ></FormControl>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <FormLabel column sm="4" className="noWrapText">
                  User Type
                </FormLabel>
                <Col>
                  <FormSelect
                    ref={nuserTypeRef}
                    className="dropDownList"
                    style={{ padding: "0px 0px 0px 5px" }}
                    onChange={(event) => (user.role = event.target.value)}
                  >
                    <option></option>
                    {roles.map((role) => (
                      <option value={role.id} key={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
              </FormGroup>
            </div>
          )}

          <label className="separator"> </label>

          <FormGroup as={Row}>
            <Col sm="9"></Col>
            {/* <Col sm="3">
              <Button
                className="setButtonMargin"
                variant="success"
                onClick={() => checkPass()}
              >
                check
              </Button>
            </Col> */}
            <Col sm="1">
              <Button
                className="setButtonMargin"
                variant="success"
                onClick={() => (addMode ? nsave() : save())}
              >
                Save
              </Button>
            </Col>
          </FormGroup>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>Users List</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-dark bg-dark text-white">
          <Card
            style={{
              maxWidth: "25rem",
              minWidth: "25rem",
              height: "auto",
            }}
            className={" border-dark bg-dark text-white"}
          ></Card>
          <Container>
            <BootstrapTable
              id="bsTable"
              // keyField="userId"
              keyField="id"
              data={users}
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
              // rowEvents={ rowEvents }
            ></BootstrapTable>
          </Container>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <div className="centerDiv">
            {tooltip && <ReactTooltip effect="solid" />}

            {/* <BsFileEarmarkFontFill
              className="editIcon"
              data-tip="EDIT"
              data-type="info"
              onClick={handleEdit}
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 5);
              }}
            />

            <BsFileEarmarkMinusFill
              className="deleteIcon"
              data-tip="DELETE"
              data-type="info"
              data-effect="solid"
              onClick={handleCloseDel}
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 5);
              }}
            />

            <BsFileEarmarkPlusFill
              className="addIcon"
              data-tip="NEW"
              data-type="info"
              onClick={handleAdd}
              onMouseEnter={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 5);
              }}
            /> */}
            {enable && (
              <button
                type="submit"
                className="btn btn-warning btn-md buttonRight"
                style={{ width: "60px", marginTop: "0px", marginRight: "5px" }}
                onClick={() => handleReset()}
              >
                Reset
              </button>
            )}
            <button
              type="submit"
              className="btn btn-warning btn-md buttonRight"
              style={{ width: "60px", marginTop: "0px", marginRight: "5px" }}
              onClick={() => handleEdit()}
            >
              Edit
            </button>
            {enable && (
              <button
                type="submit"
                className="btn btn-danger btn-md buttonRight"
                style={{ width: "60px", marginTop: "0px", marginRight: "5px" }}
                onClick={() => handleCloseDel()}
              >
                Delete
              </button>
            )}
            {enable && (
              <button
                type="submit"
                className="btn btn-success btn-md buttonRight"
                style={{ width: "60px", marginTop: "0px" }}
                onClick={() => handleAdd()}
              >
                New
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDel}
        onHide={handleXButton}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>Delete User</Modal.Title>
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
            <label>Delete {user.username}?</label>
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <Button variant="primary" onClick={handleCloseConfirmDel}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
    </div>
  );
};
