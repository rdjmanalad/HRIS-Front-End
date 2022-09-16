import React from "react";
import { Button, ButtonGroup, Card, Form, Table } from "react-bootstrap";
import axios from "axios";
// import { FontAwesommeIcon } from "@fortawesome/react-fontawesome";
// import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

class ListUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    // alert(localStorage.getItem("jwt"));
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    // axios
    //   .get("http://localhost:8080/api/users", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("jwt"),
    //     },
    //   })
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ users: data });
      })
      .catch((message) => {
        alert(message);
      });
  }

  render() {
    return (
      <div style={{ "margin-top": "20px" }}>
        <Card className={" border-dark bg-dark text-white"}>
          <Card.Header>
            <Card.Title>User List</Card.Title>
          </Card.Header>
          <Form id="addUserId" onSubmit={this.listUser}>
            <Card.Body>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Password</th>
                    <th>Username</th>
                    <th>Roles</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.length === 0 ? (
                    <tr align="center">
                      <td colSpan={"5"}>No Users Found</td>
                    </tr>
                  ) : (
                    this.state.users.map((users) => (
                      <tr key={users.id}>
                        <td>{users.id}</td>
                        <td>{users.name}</td>
                        <td>{users.password}</td>
                        <td>{users.username}</td>
                        <td>{users.roles.map((roles) => roles.name + ", ")}</td>
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
            </Card.Body>
          </Form>
        </Card>
      </div>
    );
  }
}

export default ListUsers;
