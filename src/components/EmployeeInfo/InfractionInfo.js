import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  Form,
  FormGroup,
  Row,
  Col,
  FormLabel,
  FormControl,
  Button,
  ButtonGroup,
  Table,
  FormSelect,
} from "react-bootstrap";

function InfractionInfo({ empNo }) {
  const [infractions, setInfractions] = useState([]);
  const [infraction, setInfraction] = useState([]);
  const transDateRef = useRef();
  const suspesionRef = useRef();
  const infractionRef = useRef();
  const sanctionRef = useRef();
  var setArray = {
    id: "",
    employeeNo: "",
    transactDate: "",
    suspend: "",
    infraction: "",
    sanction: "",
  };

  const addNew = () => {};

  const deleteInfra = () => {};

  const saveInfra = () => {};

  const saveNew = () => {
    setArray.employeeNo = addZero(empNo);
    setArray.transactDate = transDateRef.current.value;
    setArray.suspend = suspesionRef.current.value;
    setArray.infraction = infractionRef.current.value;
    setArray.sanction = sanctionRef.current.value;
    console.log(setArray);
    saveInfraction();
  };

  const clearFields = () => {
    transDateRef.current.value = "";
    suspesionRef.current.value = "";
    infractionRef.current.value = "";
    sanctionRef.current.value = "";
  };

  useEffect(() => {
    getData();
  }, [empNo]);

  const getData = () => {
    axios
      .get("http://localhost:8080/api/infraction/getby/" + addZero(empNo), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setInfractions(data);
      });
  };

  const addZero = (empNo) => {
    var empString = String(empNo);
    var length = empString.length;
    for (let i = length; i < 4; i++) {
      empString = "0" + empString;
    }
    return empString;
  };

  const saveInfraction = () => {
    axios
      .post("http://localhost:8080/api/infraction/save", setArray, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Saved Successfully!");
          getData();
          clearFields();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  return (
    <div>
      <Card className={" border-dark bg-dark text-white"}>
        <Card.Body style={{ paddingBottom: "0px" }}>
          <Form as={Row}>
            <FormGroup as={Row}>
              <label
                className="asHeader"
                style={{
                  "margin-top": "5px",
                  "margin-left": "6px",
                  "padding-right": "0px",
                }}
              >
                Infraction Information
              </label>

              {/* new column   ################################## */}
              <FormGroup as={Col} style={{ "padding-right": "0px" }}>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Prepare Date
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      type="date"
                      ref={transDateRef}
                      onChange={(event) =>
                        (setArray.prepareDate = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Infraction
                  </FormLabel>
                  <Col>
                    <FormControl
                      as="textarea"
                      rows={2}
                      className="inpHeightXs"
                      style={{ height: "70px" }}
                      ref={infractionRef}
                      onChange={(event) =>
                        (setArray.infraction = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
              {/* new column   ################################## */}
              <FormGroup as={Col} style={{ "padding-right": "0px" }}>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Suspension (Days)
                  </FormLabel>
                  <Col>
                    <FormControl
                      className="inpHeightXs"
                      ref={suspesionRef}
                      onChange={(event) =>
                        (setArray.suspend = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <FormLabel column sm="3" className="noWrapText">
                    Sanction Details
                  </FormLabel>
                  <Col>
                    <FormControl
                      as="textarea"
                      rows={2}
                      className="inpHeightXs"
                      style={{ height: "70px" }}
                      ref={sanctionRef}
                      onChange={(event) =>
                        (setArray.sanction = event.target.value)
                      }
                    ></FormControl>
                  </Col>
                </FormGroup>
              </FormGroup>
            </FormGroup>
            <FormGroup as={Row}>
              <label
                className="asHeader"
                style={{
                  "margin-top": "10px",
                  "margin-left": "6px",
                  "padding-right": "0px",
                }}
              >
                Infraction History
              </label>
            </FormGroup>
            <FormGroup>
              <Table
                striped
                bordered
                hover
                variant="dark"
                Table-sm
                style={{ height: "15rem" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "8rem" }}>Prepare Date</th>
                    <th style={{ width: "8rem" }}>Suspension</th>
                    <th>Infraction</th>
                    <th>Sanction</th>
                    {/* <th style={{ width: "10rem", textAlign: "center" }}>
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {infractions.length === 0 ? (
                    <tr align="center">
                      <td colSpan={"5"}>No Infractions Found</td>
                    </tr>
                  ) : (
                    infractions.map((infra) => (
                      <tr key={infra.id}>
                        <td
                        // contentEditable="true"
                        // onBlur={(e) =>
                        //   (infra.prepareDate = e.target.textContent)
                        // }
                        >
                          {new Date(infra.transactDate).toLocaleDateString()}
                        </td>
                        <td
                        // contentEditable="true"
                        // onBlur={(e) => (infra.endYear = e.target.textContent)}
                        >
                          {infra.suspend}
                        </td>
                        <td
                        // contentEditable="true"
                        // onBlur={(e) => (infra.place = e.target.textContent)}
                        >
                          {infra.infraction}
                        </td>
                        <td
                        // contentEditable="true"
                        // onBlur={(event) =>
                        //   (infra.remarks = event.target.textContent)
                        // }
                        >
                          {infra.sanction}
                        </td>
                        {/* <td>
                          <div className="centerDiv">
                            <ButtonGroup>
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => saveInfra(infra)}
                              >
                                Save
                              </Button>
                              {"  "}
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => deleteInfra(infra.id)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </div>
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </FormGroup>
          </Form>
        </Card.Body>
        <Card.Footer>
          <div></div>
          <div style={{ display: "grid" }}>
            <button
              type="submit"
              className="btn btn-success btn-md buttonRight"
              style={{ width: "80px", "margin-top": "0px" }}
              onClick={() => saveNew()}
            >
              Save
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default InfractionInfo;
