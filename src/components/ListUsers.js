import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Form, Table, Modal } from "react-bootstrap";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import {
  BsFileEarmarkPlusFill,
  BsFileEarmarkMinusFill,
  BsFileEarmarkFontFill,
} from "react-icons/bs";

// import { FontAwesommeIcon } from "@fortawesome/react-fontawesome";
// import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [tooltip, showTooltip] = useState(true);
  const [roles, setRoles] = useState([]);
  const baseURL = localStorage.getItem("baseURL");

  const [show, setShow] = useState(false);

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  const getUsers = () => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get(baseURL + "/api/users")
      .then((response) => response.data)
      .then((data) => {
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
        console.log(data);
        setRoles(data);
      })
      .catch((message) => {
        alert(message);
      });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
        className={" border-dark bg-dark text-white"}
        style={{ width: "40rem" }}
      >
        <Card.Header>
          <Card.Title>User List</Card.Title>
        </Card.Header>
        <Form id="addUserId">
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Username</th>
                  <th>Roles</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr align="center">
                    <td colSpan={"4"}>No Users Found</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.roles.map((roles) => roles.name + ", ")}</td>
                      <td>
                        {/* <ButtonGroup>
                            <Button size="sm" variant="primary">
                              Edit
                            </Button>
                            {"  "}
                            <Button size="sm" variant="outline-danger">
                              Delete
                            </Button>
                          </ButtonGroup> */}
                        <div className="centerDiv">
                          {tooltip && <ReactTooltip effect="solid" />}
                          <BsFileEarmarkFontFill
                            className="editIcon"
                            data-tip="EDIT"
                            data-type="info"
                            data-effect="solid"
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
                            onClick={handleShow}
                            onMouseEnter={() => showTooltip(true)}
                            onMouseLeave={() => {
                              showTooltip(false);
                              setTimeout(() => showTooltip(true), 5);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Form>
        <form action="/action_page.php">
          <select>
            <option></option>
            {roles.map((role) => (
              <option value={role.name}>{role.name}</option>
            ))}
          </select>
        </form>
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
                "max-width": "25rem",
                "min-width": "25rem",
                height: "auto",
              }}
              className={" border-dark bg-dark text-white"}
            ></Card>
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
      </Card>
    </div>
  );
}

export default ListUsers;
