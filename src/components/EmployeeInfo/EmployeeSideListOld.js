import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import axios from "axios";

class EmployeeSideList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");

    axios
      .get("http://localhost:8080/api/employees")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ employees: data });
      });
  }

  render() {
    return (
      <Card
        style={{ "max-width": "17rem", "min-width": "17rem", height: "auto" }}
        className={" border-dark bg-dark text-white"}
      >
        <Card.Body scroll>
          <Card.Title>Employee List</Card.Title>
          {/* <Table striped bordered hover variant="dark">
            <thead>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
              <tr>Employee Name</tr>
            </thead>
          </Table> */}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.length === 0 ? (
                <tr align="center">
                  <td colSpan={"2"}>No Users Found</td>
                </tr>
              ) : (
                this.state.employees.map((employees) => (
                  <tr key={employees.id}>
                    <td>{employees.username}</td>
                    <td style={{ width: "1rem" }}>{employees.currentGroup}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <div className={"allCenter"}>
            <Button variant="success" size="sm">
              New
            </Button>
            <Button variant="danger" size="sm" className="buttonMargin">
              Remove
            </Button>
            <Button variant="warning" size="sm">
              Edit
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default EmployeeSideList;
