import React, { useState } from "react";
import { Card } from "react-bootstrap";
import EducatiionTable from "./EducationTable";
import EmpCompanyTable from "./EmpCompanyTable";

function EmployeeBackground(empNo) {
  const [empNum, setEmpNo] = useState("");
  setEmpNo(empNo);
  alert(empNum);
  return (
    <div className={"floatTop"}>
      <Card
        className={" border-dark bg-dark text-white floatTop"}
        style={{ padding: "12px" }}
      >
        <label className="asHeader" style={{ "padding-left": "5px" }}>
          Education Information
        </label>
        <EducatiionTable empNo={empNo}></EducatiionTable>
      </Card>
      <Card
        className={" border-dark bg-dark text-white"}
        style={{ padding: "12px" }}
      >
        <label className="asHeader" style={{ "padding-left": "5px" }}>
          Employment History
        </label>
        <EmpCompanyTable empNo={empNo}></EmpCompanyTable>
      </Card>
    </div>
  );
}

export default EmployeeBackground;
