import React from "react";
import { Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";
import logo from "../img/tambunting_logo.png";
import "../css/navi.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";

function NavigationBar() {
  const navi = useNavigate();
  const user = localStorage.getItem("user");

  function logout() {
    localStorage.setItem("jwt", "");
    navi("");
    window.location.reload();
  }
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      {/* <Container id="navbarContainer"> */}
      <div id="navbarContainer" className="container-xxl">
        <Link to={""} className="navbar-brand">
          <img className="tLogo" src={logo} alt="" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={"me-auto"}>
            <NavDropdown
              className="fs-med"
              title="Link"
              id="basic-nav-dropdown"
              style={{ fontWeight: "bold" }}
            >
              <NavDropdown.Item href="EmployeeList">
                Emloyee List
              </NavDropdown.Item>
              <NavDropdown.Item href="ListUsers">GBC List</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="fs-med"
              title="Maintenance"
              id="basic-nav-dropdown"
              style={{ fontWeight: "bold" }}
            >
              <NavDropdown.Item href="AddUser">Add User</NavDropdown.Item>
              <NavDropdown.Item href="ListUsers">List Users</NavDropdown.Item>
              <NavDropdown.Item href="UserMaintenance">
                User Maintenance
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="EmployeeTopList">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              href={"EmployeeDetails"}
              style={{ fontWeight: "bold", fontSize: "medium" }}
            >
              Reports
            </Nav.Link>
          </Nav>
          <Nav>
            <label
              className={"text-gray no-margin fs-med"}
              style={{
                width: "4rem",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              User :
            </label>
            <label
              className="text-red no-margin fs-med"
              style={{ fontWeight: "bold" }}
            >
              {user}
            </label>
            <Nav.Link
              style={{ fontWeight: "bold", width: "4rem" }}
              className={"nav-link text-gray"}
              to={""}
              onClick={() => logout()}
            >
              Logout
            </Nav.Link>
            <BsBoxArrowRight
              className="iconLogout"
              style={{
                width: "32px",
                //filter: "invert(80%)",
                height: "32px",
                marginLeft: "5px",
                stroke: "red",
                strokeWidth: "0.5",
              }}
              onClick={() => logout()}
            />
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </div>
    </Navbar>
  );
}

export default NavigationBar;
