import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Welcome from "./Welcome";
import Footer from "./Footer";
import Maintenance from "./Maintenance";
import About from "./About";
import UserMaintenance from "./UserMaintenance";
import AddUser from "./AddUser";
import ListUsers from "./ListUsers";
import EmployeeList from "./EmployeeInfo/EmployeeList";
import Login from "./Login";
import EmployeeTopList from "./EmployeeInfo/EmployeeTopList";
import EmployeeDetails from "./EmployeeInfo/EmployeeDetails";
import { CompanyMasterFile } from "./CompanyMasterFile/CompanyMasterFile";

function App() {
  if (window.sessionStorage.getItem("jwt") == null) {
    localStorage.setItem("jwt", "");
  }

  let logged = false;
  if (localStorage.getItem("jwt") != null) {
    if (localStorage.getItem("jwt").length > 5) {
      logged = true;
    } else {
      logged = false;
    }
  }

  return (
    <div>
      <Router>
        {logged ? (
          <div className="bodyClass">
            <NavigationBar />
            <div className="container-xxl">
              <Row>
                <Col>
                  <Routes>
                    {/* <Route path="/" element={<Login />} /> */}
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/" element={<Welcome />} />
                    <Route path="/aaa" element={<About />} />
                    <Route
                      path="/EmployeeDetails"
                      element={<EmployeeDetails />}
                    />
                    <Route path="/AddUser" element={<AddUser />} />
                    <Route
                      path="/UserMaintenance"
                      element={<UserMaintenance />}
                    />
                    <Route
                      path="/EmployeeTopList"
                      element={<EmployeeTopList />}
                    />

                    <Route
                      path="/CompanyMasterFile"
                      element={<CompanyMasterFile />}
                    />
                    <Route path="/ListUsers" element={<ListUsers />} />
                    <Route path="/EmployeeList" element={<EmployeeList />} />
                  </Routes>
                </Col>
              </Row>
            </div>
            <Footer />
          </div>
        ) : (
          <Login></Login>
        )}
      </Router>
    </div>
  );
}

export default App;
