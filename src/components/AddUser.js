import React from "react";
import { Card } from "react-bootstrap";
import { Button, Form, Col, Row } from "react-bootstrap";

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", password: "", username: "" };
    this.nameChange = this.nameChange.bind(this);
    this.submitAddUser = this.submitAddUser.bind(this);
  }

  submitAddUser(event) {
    alert(
      "name:" +
        this.state.name +
        ", password:" +
        this.state.password +
        ", username:" +
        this.state.username
    );
    event.preventDefault();
  }

  nameChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div style={{ "margin-top": "20px" }}>
        <Card className={" border-dark bg-dark text-white"}>
          <Card.Header>
            <Card.Title>Add User</Card.Title>
          </Card.Header>
          <Form id="addUserId" onSubmit={this.submitAddUser}>
            <Card.Body>
              <Form as={Row}>
                <Form.Group as={Col} className="mb-1" controlId="formCIDName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    size="sm"
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.nameChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-1" controlId="formCIDPass">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    size="sm"
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.nameChange}
                    required
                  />
                </Form.Group>
              </Form>
              <Form as={Row}>
                <Form.Group
                  as={Col}
                  className={"mb-2"}
                  controlId="formCIDUserName"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    size="sm"
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.nameChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-2" controlId=""></Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button size="sm" variant="success" type="submit">
                Save
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AddUser;
