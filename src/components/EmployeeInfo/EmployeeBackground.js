import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import EducatiionTable from "./EducationTable";
import EmpCompanyTable from "./EmpCompanyTable";

function EmployeeBackground({ empData }) {
  return (
    <div className={"floatTop"}>
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ padding: "12px" }}
      >
        <label className="asHeader" style={{ paddingLeft: "5px" }}>
          Education Information
        </label>
        <EducatiionTable empNo={empData.employeeNo}></EducatiionTable>
      </Card>
      <Card
        className={" border-dark bg-dark text-white"}
        style={{ padding: "12px" }}
      >
        <label className="asHeader" style={{ paddingLeft: "5px" }}>
          Employment History
        </label>
        <EmpCompanyTable empNo={empData.employeeNo}></EmpCompanyTable>
      </Card>
    </div>
  );
}

export default EmployeeBackground;
