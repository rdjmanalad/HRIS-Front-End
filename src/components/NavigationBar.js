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
import axios from "axios";
import useLocalState from "./Hooks/useLocalState";
import { useReducer } from "react";

function NavigationBar() {
  const navi = useNavigate();
  const user = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // var userRoleDis = localStorage.getItem("userRole").substring(5);
  var [userRoleDis, setURD] = useState(
    localStorage.getItem("userRole").substring(5)
  );
  const [userId, setUserId] = useLocalState("userId", "");
  const [userRole, setUserRole] = useLocalState("userRole", "");
  const userRef = useRef();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const baseURL = localStorage.getItem("baseURL");

  const [m1Visible, setm1Vi] = useState("block");
  const [m2Visible, setm2Vi] = useState("block");
  const [m3Visible, setm3Vi] = useState("block");
  const [m4Visible, setm4Vi] = useState("block");

  useEffect(() => {
    getId();
  }, []);

  // useEffect(() => {
  //   getId();
  //   userRoleDis = userRole.substring(5);
  //   alert(userRoleDis);
  //   alert(userRole);
  //   // userRef.current.value = userRoleDis;
  // }, [userRoleDis]);

  const getId = () => {
    // alert(user);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .get(baseURL + "/api/getUserId/" + user)
      .then((response) => {
        setUserId(response.data);
        setRole(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navi("");
          localStorage.setItem("jwt", "");
          window.history.go("");
        }
      });
  };

  const setRole = (uId) => {
    // alert(userId);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios.get(baseURL + "/api/getRole/" + uId).then((response) => {
      setUserRole(response.data[0].name);
      userRoleDis = userRole.substring(5);
      allowedMenu(userRole);
      forceUpdate();
    });
  };

  const allowedMenu = (uRole) => {
    if (uRole === "ROLE_SUPERVISOR") {
      setm1Vi("none");
      setm2Vi("none");
      setm3Vi("none");
    }
  };

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
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      style={{ position: "fixed", top: "0", width: "100%", zIndex: "99" }}
    >
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
              title="Maintenance"
              id="basic-nav-dropdown"
              style={{ fontWeight: "bold", display: m1Visible }}
            >
              <NavDropdown.Item href="EmployeeList">
                Emloyee List
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: "gray" }} />
              <NavDropdown.Item href="CompanyMasterFile">
                Company Master File
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: "gray" }} />

              <NavDropdown.Item href="UserManagement">
                User Accounts
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="fs-med"
              title="Payroll"
              id="basic-nav-dropdown"
              style={{ fontWeight: "bold", display: m2Visible }}
            >
              <NavDropdown.Item href="ChangePayrollPeriod">
                Change Payroll Period
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: "gray" }} />
              <NavDropdown.Item href="PaySlipDataEntry">
                Payroll Register
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: "gray" }} />
              <NavDropdown.Item href="EmployeeLoans">
                Employee Loans
              </NavDropdown.Item>
              <NavDropdown.Item href="DirectPrint">
                Employee Leaves
              </NavDropdown.Item>
              <NavDropdown.Item href="EmployersDeduction">
                Employers Deduction
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: "gray" }} />
              <NavDropdown.Item href="APCDataEntry">
                APC Data Entry
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: "gray" }} />
              <NavDropdown.Item href="BankUploadReport">
                Bank Upload Report
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ borderColor: "gray" }} />
              <NavDropdown.Item href="MassCompute">
                Mass Computation
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              href={"Reports"}
              style={{
                fontWeight: "bold",
                fontSize: "medium",
                display: m3Visible,
              }}
            >
              Reports
            </Nav.Link>

            <Nav.Link
              href={"TimeKeeping"}
              style={{
                fontWeight: "bold",
                fontSize: "medium",
                display: m4Visible,
              }}
            >
              Time Keeping
            </Nav.Link>
          </Nav>
          <Nav>
            <label
              className={"text-gray no-margin fs-med"}
              style={{
                width: "10rem",
                fontWeight: "bold",
                marginRight: "15px",
              }}
              ref={userRef}
            >
              {userRoleDis}
            </label>
            <label
              className="text-red no-margin-l fs-med"
              style={{ fontWeight: "bold", width: "10rem" }}
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
            <label
              // className="text-red no-margin-l fs-med"
              className="text-gray no-margin-l"
              style={{ width: "5rem" }}
            >
              Ver 0.0
            </label>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </div>
      <AutoLogout onLogout={handleLogout} timeoutInHours={10} />
    </Navbar>
  );
}

export default NavigationBar;
