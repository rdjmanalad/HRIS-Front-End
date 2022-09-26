// @flow
import React from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import { BranchList } from "./BranchList";
import { CompanyList } from "./CompanyList";
import { GroupList } from "./GroupList";
import "../../css/CompanyMasterFile.css";

export const CompanyMasterFile = () => {
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
        style={{ marginLeft: "10px", width: "80rem" }}
      >
        <Tabs
          defaultActiveKey="home"
          id="justify-tab-example"
          className="mb-3 bg-dark text-white"
          justify
        >
          <Tab eventKey="home" title="GROUP LIST" className="redThemeTab">
            <GroupList />
          </Tab>

          <Tab eventKey="tab2" title="COMPANY LIST">
            <CompanyList />
          </Tab>

          <Tab eventKey="tab3" title="BRANCH LIST">
            <BranchList />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};
