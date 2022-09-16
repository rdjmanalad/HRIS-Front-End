import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";

class EducationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/school")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ school: data });
      });
  }
  render() {
    return (
      <div>
        <Table
          striped
          bordered
          hover
          variant="dark"
          Table-sm
          style={{ height: "10rem" }}
        >
          <thead>
            <tr>
              <th>From Date</th>
              <th>To Date</th>
              <th>School</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {this.state.school.length === 0 ? (
              <tr align="center">
                <td colSpan={"5"}>No School Found</td>
              </tr>
            ) : (
              this.state.school.map((school) => (
                <tr key={school.id}>
                  <td>{school.from}</td>
                  <td>{school.to}</td>
                  <td>{school.schoolName}</td>
                  <td>{school.course}</td>
                  <td>
                    <ButtonGroup>
                      <Button size="sm" variant="primary">
                        Edit
                      </Button>
                      {"  "}
                      <Button size="sm" variant="outline-danger">
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default EducationTable;
