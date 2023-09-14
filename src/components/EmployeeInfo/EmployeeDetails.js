import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EmployeeBackground from "./EmployeeBackground";
import InfractionInfo from "./InfractionInfo";
import { Card, Nav, Form, FormGroup, Col, Row } from "react-bootstrap";
import { useState } from "react";
import EmployeeSideList from "./EmployeeSideList";
import EmpMasterFile from "./EmpMasterFile";
import PayrollInfo from "./PayrollInfo";
import { useReducer } from "react";

function EmployeeDetails() {
  const [employee, setEmployee] = useState([]);
  const childToParent = (childdata) => {
    setEmployee(childdata);
    // forceUpdate();
    // forceUpdate();
  };

  function refreshPage() {
    console.log("console");
  }

  // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <div style={{ paddingBottom: "50px" }}>
      <div
        style={{
          marginTop: "15px",
          marginBottom: "20px",
        }}
        // className="cardVertAlign"
      >
        <EmployeeSideList
          childToParent={childToParent}
          refreshPage={refreshPage}
        />

        {/* <EmployeeTopList></EmployeeTopList> */}
        <Card
          className={" border-dark bg-dark text-white "}
          style={{ "margin-left": "10px", width: "85rem" }}
        >
          <Card.Header className="reducePadding">
            <Tabs
              defaultActiveKey="home"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="home" title="EMPLOYEE MASTER FILE">
                <EmpMasterFile empData={employee} />
              </Tab>
              <Tab eventKey="tab2" title="EMPLOYEE BACKGROUND">
                <EmployeeBackground />
              </Tab>
              <Tab eventKey="tab3" title="PAYROLL INFORMATION">
                <PayrollInfo empData={employee} />
              </Tab>
              <Tab eventKey="tab4" title="INFRACTION HISTORY">
                <InfractionInfo />
              </Tab>
            </Tabs>
          </Card.Header>
          <Card.Body className="reducePadding">
            <Form as={Row}>
              <FormGroup as={Col} className="mb-1">
                <Form.Label className="noWrapText">Employee Number</Form.Label>
                <Form.Control
                  defaultValue={employee.employeeNo}
                  type="text"
                  className="inpHeightXs"
                  // disabled
                  onChange={(event) =>
                    (employee.employeeNo = event.target.value)
                  }
                ></Form.Control>
              </FormGroup>
              <FormGroup as={Col} className="mb-1">
                <Form.Label className="noWrapText">First Name</Form.Label>
                <Form.Control
                  defaultValue={employee.firstName}
                  type="text"
                  maxLength="30"
                  className="inpHeightXs"
                  onChange={(event) =>
                    (employee.firstName = event.target.value)
                  }
                ></Form.Control>
              </FormGroup>
              <FormGroup as={Col} className="mb-1">
                <Form.Label className="noWrapText">Middle Name</Form.Label>
                <Form.Control
                  value={employee.middleName}
                  type="text"
                  maxLength="30"
                  className="inpHeightXs"
                ></Form.Control>
              </FormGroup>
              <FormGroup as={Col} className="mb-1">
                <Form.Label className="noWrapText">Last Name</Form.Label>
                <Form.Control
                  value={employee.lastName}
                  type="text"
                  maxLength="30"
                  className="inpHeightXs"
                ></Form.Control>
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default EmployeeDetails;
