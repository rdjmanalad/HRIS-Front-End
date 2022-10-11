import React from "react";
import { Card, Nav, Form, FormGroup, Col, Row } from "react-bootstrap";
import "../../css/EmployeeList.css";
import EmployeeBackground from "./EmployeeBackground";
import EmployeeSideList from "./EmployeeSideList";
import EmpMasterFile from "./EmpMasterFile";
import PayrollInfo from "./PayrollInfo";
import InfractionInfo from "./InfractionInfo";
// import { useReducer } from "react";

class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      showTab1: true,
      showTab2: false,
      showTab3: false,
      showTab4: false,
      employee: [],
      mountEmp: [],
      preEmp: [],
    };
    this.hideComponent = this.hideComponent.bind(this);
    this.child = React.createRef();
    this.empNoRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.middleNameRef = React.createRef();
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {
      case "showTab1":
        // alert("here tab1");
        this.setState({ showTab1: true });
        this.setState({ showTab2: false });
        this.setState({ showTab3: false });
        this.setState({ showTab4: false });
        // this.setState({ employee: [] });
        break;
      case "showTab2":
        this.setState({ showTab2: true });
        this.setState({ showTab1: false });
        this.setState({ showTab3: false });
        this.setState({ showTab4: false });
        // this.setState({ employee: [] });
        break;
      case "showTab3":
        this.setState({ showTab3: true });
        this.setState({ showTab1: false });
        this.setState({ showTab2: false });
        this.setState({ showTab4: false });
        // this.setState({ employee: [] });
        break;
      case "showTab4":
        this.setState({ showTab4: true });
        this.setState({ showTab1: false });
        this.setState({ showTab3: false });
        this.setState({ showTab2: false });
        // this.setState({ employee: [] });
        break;
    }
  }

  render() {
    const { showTab1, showTab2, showTab3, showTab4 } = this.state;
    const { employee } = this.state;
    const { mountEmp } = this.state;
    const { empNoRef } = this.state;
    const { preEmp } = this.state;

    var empp = [];

    const childToParent = (childdata) => {
      empp = childdata;
      // alert(childdata.length);
      if (childdata.length !== 0) {
        this.empNoRef.current.value = empp.employeeNo;
        this.firstNameRef.current.value = empp.firstName;
        this.lastNameRef.current.value = empp.lastName;
        this.middleNameRef.current.value = empp.middleName;
      }

      this.setState({ employee: childdata });
      this.setState({ mountEmp: empp });
      // parentToChild();
    };

    const childToParent2 = (childdata2) => {
      empp = childdata2;
      this.setState({ employee: childdata2 });
      this.setState({ mountEmp: empp });
      // clearDetails();
    };

    function refreshPage() {
      showTab1 = false;
      this.setState({ employee: [] });
    }

    return (
      <div style={{ paddingBottom: "50px" }}>
        <div
          style={{
            marginTop: "15px",
            marginBottom: "10px",
          }}
          className="cardVertAlign"
        >
          <EmployeeSideList
            childToParent={childToParent}
            refreshPage={refreshPage}
            childToParent2={childToParent2}
          />

          {/* <EmployeeTopList></EmployeeTopList> */}
          <Card
            className={" border-dark bg-dark text-white "}
            style={{ marginLeft: "10px", width: "85rem" }}
          >
            <Card.Header className="reducePadding">
              <Nav fill variant="pills" defaultActiveKey="#first">
                <Nav.Item onClick={() => this.hideComponent("showTab1")}>
                  <Nav.Link href="#first" className={"reducePadding"}>
                    Employee Master File
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => this.hideComponent("showTab2")}>
                  <Nav.Link href="#link" className="reducePadding">
                    Emlpoyee Background
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => this.hideComponent("showTab3")}>
                  <Nav.Link href="#disabled" className="reducePadding">
                    Payroll Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => this.hideComponent("showTab4")}>
                  <Nav.Link href="#d" className="reducePadding">
                    Infraction History
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body className="reducePadding">
              <Form as={Row}>
                <FormGroup as={Col} className="mb-1">
                  <Form.Label className="noWrapText">
                    Employee Number
                  </Form.Label>
                  <Form.Control
                    // defaultValue={employee.employeeNo}
                    ref={this.empNoRef}
                    type="text"
                    className="inpHeightXs"
                    // disabled
                    onChange={(event) =>
                      (employee.employeeNo = event.target.value)
                    }
                    // placeholder="Auto Generated"
                    // onChange={(event) => setPassword(event.target.value)}
                  ></Form.Control>
                </FormGroup>
                <FormGroup as={Col} className="mb-1">
                  <Form.Label className="noWrapText">First Name</Form.Label>
                  <Form.Control
                    ref={this.firstNameRef}
                    type="text"
                    className="inpHeightXs"
                    onChange={(event) =>
                      (employee.firstName = event.target.value)
                    }
                  ></Form.Control>
                </FormGroup>
                <FormGroup as={Col} className="mb-1">
                  <Form.Label className="noWrapText">Middle Name</Form.Label>
                  <Form.Control
                    ref={this.middleNameRef}
                    type="text"
                    className="inpHeightXs"
                    onChange={(event) =>
                      (employee.middleName = event.target.value)
                    }
                  ></Form.Control>
                </FormGroup>
                <FormGroup as={Col} className="mb-1">
                  <Form.Label className="noWrapText">Last Name</Form.Label>
                  <Form.Control
                    ref={this.lastNameRef}
                    type="text"
                    className="inpHeightXs"
                    onChange={(event) =>
                      (employee.lastName = event.target.value)
                    }
                  ></Form.Control>
                </FormGroup>
              </Form>
            </Card.Body>
            {showTab1 && (
              // <EmpMasterFile></EmpMasterFile>
              <EmpMasterFile
                empData={mountEmp}
                // ref={this.child}
              ></EmpMasterFile>
            )}
            {showTab2 && <EmployeeBackground empData={mountEmp} />}
            {showTab3 && <PayrollInfo empData={employee} />}
            {showTab4 && (
              <InfractionInfo empNo={mountEmp.employeeNo}></InfractionInfo>
            )}
          </Card>
        </div>
        {/* <Card style={{ "margin-top": "60px" }}>
          <CardHeader style={{ height: "30px" }}>END</CardHeader>
        </Card> */}
      </div>
    );
  }
}

export default EmployeeList;
