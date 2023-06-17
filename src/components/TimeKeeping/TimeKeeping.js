// @flow
import React from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import { BranchList } from "../CompanyMasterFile/BranchList";
import { CompanyList } from "../CompanyMasterFile/CompanyList";
// import { BranchList } from "./BranchList";
// import { CompanyList } from "./CompanyList";
import "../../css/CompanyMasterFile.css";
import { TimeEmployees } from "./TimeEmployees";
import { Attendance } from "./Attendance";
import { Leave } from "./Leave";

export const TimeKeeping = () => {
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
      <Card
        className={" border-dark bg-dark text-white "}
        style={{ marginLeft: "10px", width: "90rem" }}
      >
        <Tabs
          defaultActiveKey="home"
          id="justify-tab-example"
          className="mb-3 bg-dark text-white"
          justify
        >
          <Tab eventKey="home" title="EMPLOYEES" className="redThemeTab">
            <TimeEmployees />
          </Tab>

          <Tab eventKey="tab2" title="ATTENDANCE">
            <Attendance />
          </Tab>

          <Tab eventKey="tab3" title="LEAVES/OFF">
            <Leave />
          </Tab>

          <Tab eventKey="tab4" title="REPORTS">
            <BranchList />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};
