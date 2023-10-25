import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PopUpMsg from "../ModalAlerts/PopUpMsg";
import ModalConfirm from "../ModalAlerts/ModalConfirm";
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
import { render } from "@testing-library/react";

function InfractionInfo({ empNo }) {
  const [infractions, setInfractions] = useState([]);
  const [infraction, setInfraction] = useState([]);
  const transDateRef = useRef();
  const suspesionRef = useRef();
  const infractionRef = useRef();
  const sanctionRef = useRef();
  var [showSPA, setShowSPA] = useState(false);
  var [showMsg, setShowMsg] = useState(false);
  var [message, setMessage] = useState("");
  var [showMod, setShowMod] = useState(false);
  var [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [rndr, setRndr] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const baseURL = localStorage.getItem("baseURL");

  var setArray = {
    id: "",
    employeeNo: "",
    transactDate: "",
    suspend: "",
    infraction: "",
    sanction: "",
  };

  const closeMsg = (close) => {
    setShowMsg(false);
  };

  const addNew = () => {};

  const saveInfra = (infrac) => {
    console.log(infrac);
    editInfraction(infrac);
  };

  const saveNew = () => {
    var isOk = true;
    setArray.employeeNo = addZero(empNo);
    setArray.transactDate = transDateRef.current.value;
    setArray.suspend = suspesionRef.current.value;
    setArray.infraction = infractionRef.current.value;
    setArray.sanction = sanctionRef.current.value;
    console.log(setArray);
    if (setArray.employeeNo === "") {
      setMessage("Choose Employee First");
      isOk = false;
    }
    if (
      setArray.transactDate === "" ||
      setArray.suspend === "" ||
      setArray.infraction === "" ||
      setArray.sanction === ""
    ) {
      setMessage("Please Fill All Infraction Information Fields");
      isOk = false;
    }
    if (isOk) {
      saveInfraction();
    } else {
      setShowMsg(true);
    }
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

  useEffect(() => {
    getData();
  }, [rndr]);

  const getData = () => {
    axios
      .get(baseURL + "/api/infraction/getby/" + addZero(empNo), {
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

  const editInfraction = (data) => {
    console.log(data);
    axios
      .post(baseURL + "/api/infraction/save", data, {
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
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const saveInfraction = () => {
    console.log(setArray);
    axios
      .post(baseURL + "/api/infraction/save", setArray, {
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
          // alert("Saved Successfully!");
          setMessage("Saved Successfully");
          setShowMsg(true);
          getData();
          clearFields();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const confirmDelete = (delId) => {
    setAction("DELETE");
    setRowId(delId);
    setShowMod(true);
  };

  const deleteInfra = (delId) => {
    axios
      .delete(baseURL + "/api/infraction/delete/" + delId, {
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
          // alert("Delete Success!");
          setMessage("Deleted Successfully");
          setShowMsg(true);
          getData();
          clearFields();
          setRndr(true);
          forceUpdate();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const handleClose = (deleteAtt) => {
    if (deleteAtt) {
      deleteInfra(rowId);
      setShowMod(false);
    } else {
      setShowMod(false);
    }
  };

  const numbersOnly = (value) => {
    return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
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
                  marginTop: "5px",
                  marginLeft: "6px",
                  marginRight: "0px",
                }}
              >
                Infraction Information
              </label>

              {/* new column   ################################## */}
              <FormGroup as={Col} style={{ paddingRight: "0px" }}>
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
                      maxLength="100"
                      style={{ height: "70px", textTransform: "uppercase" }}
                      ref={infractionRef}
                      onChange={(event) => {
                        setArray.infraction = event.target.value;
                      }}
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
                      maxLength="2"
                      onChange={(event) => {
                        const { value } = event.target;
                        event.target.value = numbersOnly(value);
                        setArray.suspend = event.target.value;
                      }}
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
                      maxLength="250"
                      style={{ height: "70px", textTransform: "uppercase" }}
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
                  marginTop: "10px",
                  marginLeft: "6px",
                  marginRight: "0px",
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
                size="sm"
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
                      <tr key={infra.id} style={{ verticalAlign: "middle" }}>
                        <td>
                          <FormControl
                            className="inpHeightXs"
                            type="date"
                            ref={transDateRef}
                            defaultValue={new Date(
                              infra.transactDate
                            ).toLocaleDateString("en-CA")}
                            onChange={(event) =>
                              (infra.transactDate = event.target.value)
                            }
                          ></FormControl>
                          {/* {new Date(infra.transactDate).toLocaleDateString()} */}
                        </td>
                        {/* <td
                          contentEditable="true"
                          onBlur={(event) =>
                            (infra.suspend = event.target.textContent)
                          }
                        >
                          {infra.suspend}
                        </td> */}
                        <td>
                          <input
                            className="editTable"
                            maxLength="2"
                            defaultValue={infra.suspend}
                            style={{
                              width: "7rem",
                            }}
                            onChange={(event) => {
                              const { value } = event.target;
                              event.target.value = numbersOnly(value);
                            }}
                            onBlur={(e) => (infra.suspend = e.target.value)}
                          ></input>
                        </td>
                        {/* <td
                          contentEditable="true"
                          onBlur={(event) =>
                            (infra.infraction = event.target.textContent)
                          }
                        >
                          {infra.infraction}
                        </td> */}
                        <td>
                          <input
                            className="editTable"
                            maxLength="100"
                            defaultValue={infra.infraction}
                            style={{
                              width: "100%",
                              textTransform: "uppercase",
                            }}
                            onBlur={(e) => (infra.infraction = e.target.value)}
                          ></input>
                        </td>
                        {/* <td
                          contentEditable="true"
                          onBlur={(event) =>
                            (infra.sanction = event.target.textContent)
                          }
                        >
                          {infra.sanction}
                        </td> */}
                        <td>
                          <input
                            className="editTable"
                            maxLength="250"
                            defaultValue={infra.sanction}
                            style={{
                              width: "100%",
                              textTransform: "uppercase",
                            }}
                            onBlur={(e) => (infra.sanction = e.target.value)}
                          ></input>
                        </td>
                        <td>
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
                                onClick={() => confirmDelete(infra.id)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </div>
                        </td>
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
              style={{ width: "80px", marginTop: "0px" }}
              onClick={() => saveNew()}
            >
              Save
            </button>
          </div>
        </Card.Footer>
      </Card>
      {showMsg && <PopUpMsg closeMsg={closeMsg} message={message}></PopUpMsg>}
      {showMod && (
        <ModalConfirm handleClose={handleClose} action={action}></ModalConfirm>
      )}
    </div>
  );
}

export default InfractionInfo;
