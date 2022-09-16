import React from "react";
import { Card, Nav, Form, FormGroup, Col, Row } from "react-bootstrap";
import "../../css/EmployeeList.css";
import EmployeeBackground from "./EmployeeBackground";
import EmployeeSideList from "./EmployeeSideList";
import EmpMasterFile from "./EmpMasterFile";
import PayrollInfo from "./PayrollInfo";
import InfractionInfo from "./InfractionInfo";

class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      showTab1: true,
      showTab2: false,
      showTab3: false,
      showTab4: false,
      employee: [],
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {
      case "showTab1":
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
    var empp = [];
    // var empData = [];

    const childToParent = (childdata) => {
      this.setState({ employee: childdata });
      empp = childdata;
      // parentToChild();
      //alert(childdata.userId);
      // alert(empp.userId);
    };

    // function parentToChild() {
    //   empData = empp;
    //   alert("empData:" + empData.userId);
    // }
    return (
      <div style={{ "padding-bottom": "50px" }}>
        <div
          style={{
            "margin-top": "15px",
            "margin-bot": "20px",
          }}
          className="cardVertAlign"
        >
          <EmployeeSideList childToParent={childToParent} />

          {/* <EmployeeTopList></EmployeeTopList> */}
          <Card
            className={" border-dark bg-dark text-white"}
            style={{ "margin-left": "10px", width: "85rem" }}
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
                    value={employee.employeeNo}
                    type="text"
                    className="inpHeightXs"
                  ></Form.Control>
                </FormGroup>
                <FormGroup as={Col} className="mb-1">
                  <Form.Label className="noWrapText">First Name</Form.Label>
                  <Form.Control
                    value={employee.firstName}
                    type="text"
                    className="inpHeightXs"
                  ></Form.Control>
                </FormGroup>
                <FormGroup as={Col} className="mb-1">
                  <Form.Label className="noWrapText">Middle Name</Form.Label>
                  <Form.Control
                    value={employee.middleName}
                    type="text"
                    className="inpHeightXs"
                  ></Form.Control>
                </FormGroup>
                <FormGroup as={Col} className="mb-1">
                  <Form.Label className="noWrapText">Last Name</Form.Label>
                  <Form.Control
                    value={employee.lastName}
                    type="text"
                    className="inpHeightXs"
                  ></Form.Control>
                </FormGroup>
              </Form>
            </Card.Body>
            {showTab1 && (
              // <EmpMasterFile></EmpMasterFile>
              <EmpMasterFile empData={employee}></EmpMasterFile>
            )}
            {showTab2 && <EmployeeBackground></EmployeeBackground>}
            {showTab3 && <PayrollInfo empData={employee}></PayrollInfo>}
            {showTab4 && <InfractionInfo></InfractionInfo>}
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
