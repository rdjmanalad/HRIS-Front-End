import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";

class EmpCompanyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/company")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ company: data });
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
              <th>Company Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {this.state.company.length === 0 ? (
              <tr align="center">
                <td colSpan={"5"}>No Company Found</td>
              </tr>
            ) : (
              this.state.company.map((company) => (
                <tr key={company.id}>
                  <td>{company.from}</td>
                  <td>{company.to}</td>
                  <td>{company.companyName}</td>
                  <td>{company.position}</td>
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

export default EmpCompanyTable;
