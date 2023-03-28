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
import { useRef, useEffect, useState } from "react";
import AutoLogout from "./AutoLogout";

function NavigationBar() {
  const navi = useNavigate();
  const user = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function logout() {
    localStorage.setItem("jwt", "");
    navi("");
    window.location.reload();
  }

  function onLogout() {
    localStorage.setItem("jwt", "");
    navi("");
    window.location.reload();
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    onLogout();
    setIsLoggedIn(false);
  };

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
              <NavDropdown.Divider />
              <NavDropdown.Item href="CompanyMasterFile">
                Company Master File
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="ChangePayrollPeriod">
                Change Payroll Period
              </NavDropdown.Item>
              {/* <NavDropdown.Item>Filter Actual Group</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item href="UserManagement">
                User Accounts
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="fs-med"
              title="Payroll"
              id="basic-nav-dropdown"
              style={{ fontWeight: "bold" }}
            >
              <NavDropdown.Item href="PaySlipDataEntry">
                Payroll Register
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="EmployeeLoans">
                Employee Loans
              </NavDropdown.Item>
              <NavDropdown.Item href="DirectPrint">
                Employee Leaves
              </NavDropdown.Item>
              <NavDropdown.Item href="EmployersDeduction">
                Employers Deduction
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="APCDataEntry">
                APC Data Entry
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="BankUploadReport">
                Bank Upload Report
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="MassCompute">
                Mass Computation
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              href={"Reports"}
              style={{ fontWeight: "bold", fontSize: "medium" }}
            >
              Reports
            </Nav.Link>
            {/* <NavDropdown
              className="fs-med"
              title="Test"
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
            </NavDropdown> */}
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
      <AutoLogout onLogout={handleLogout} timeoutInHours={10} />
    </Navbar>
  );
}

export default NavigationBar;
