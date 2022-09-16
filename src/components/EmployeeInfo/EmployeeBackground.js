import React from "react";
import { Card } from "react-bootstrap";
import EducatiionTable from "./EducationTable";
import EmpCompanyTable from "./EmpCompanyTable";

class EmployeeBackground extends React.Component {
  render() {
    return (
      <div>
        <Card
          className={" border-dark bg-dark text-white"}
          style={{ padding: "12px" }}
        >
          <label className="asHeader" style={{ "padding-left": "5px" }}>
            Education Information
          </label>
          <EducatiionTable></EducatiionTable>
        </Card>
        <Card
          className={" border-dark bg-dark text-white"}
          style={{ padding: "12px" }}
        >
          <label className="asHeader" style={{ "padding-left": "5px" }}>
            Employment History
          </label>
          <EmpCompanyTable></EmpCompanyTable>
        </Card>
      </div>
    );
  }
}

export default EmployeeBackground;
