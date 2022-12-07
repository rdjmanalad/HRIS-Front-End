import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Table,
  ButtonGroup,
  FormControl,
} from "react-bootstrap";

function ModalPromoTransferHist({ empNo }) {
  const [show, setShow] = useState(false);
  const [payrolls, setPayrolls] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var stringEmpno = String(empNo);

  useEffect(() => {
    getPayroll();
  }, [show]);

  const addZero = () => {
    var length = stringEmpno.length;
    for (let i = length; i < 4; i++) {
      stringEmpno = "0" + stringEmpno;
    }
  };

  const getPayroll = () => {
    addZero();
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .get("http://localhost:8080/api/payroll/listbyempno/" + stringEmpno)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setPayrolls(data);
      })
      .catch((message) => {
        alert(message);
      });
  };

  const savePayroll = (payroll) => {
    // setCheckData();
    console.log(payroll);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
    axios
      .post("http://localhost:8080/api/payroll/save", payroll, {
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
          // setSuccess(true);
          alert("Data Saved!");
          getPayroll();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  const deletePayroll = (delId) => {
    axios
      .delete("http://localhost:8080/api/payroll/delete/" + delId, {
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
          alert("Delete Success!");
          getPayroll();
        }
      })
      .catch((message) => {
        alert(message);
      });
  };

  // const savePayroll = () => {};
  // const deletePayroll = (id) => {
  //   alert(id);
  // };
  return (
    <div style={{ marginTop: "10px" }}>
      {/* <Button
        variant="primary"
        onClick={handleShow}
        style={{ "margin-top": "5px" }}
      >
        Show Promotions and Transfer History
      </Button> */}
      <label
        className="asHeaderClicable"
        style={{ paddingLeft: "5px" }}
        onClick={handleShow}
      >
        Click to Show Promotions and Transfer History ▲
      </label>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-xl"
        variant="dark"
        centered
        fullscreen
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>Promotions and Transfer History</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-dark bg-dark text-white">
          <div className="table-responsive" style={{ maxHeight: "350px" }}>
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
                  <th>Date Prepare</th>
                  <th>Date Effect</th>
                  <th>OCcode</th>
                  <th>OBcode</th>
                  <th>ACcode</th>
                  <th>ABcode</th>
                  <th>Basic</th>
                  <th>ECOLA</th>
                  <th>Allow1</th>
                  <th>Allow2</th>
                  <th>Others</th>
                  <th>Nature</th>
                  <th>Rank</th>
                  <th>Position</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.length === 0 ? (
                  <tr align="center">
                    <td colSpan={"15"}>No History Found</td>
                  </tr>
                ) : (
                  payrolls.map((payroll) => (
                    <tr key={payroll.id} style={{ verticalAlign: "middle" }}>
                      <td
                        style={{
                          width: "100px",
                        }}
                      >
                        <FormControl
                          className="inpHeightXs"
                          type="date"
                          style={{
                            margin: "0px",
                            width: "100px",
                            padding: "0px",
                          }}
                          // ref={transDateRef}
                          defaultValue={new Date(
                            payroll.datePrepare
                          ).toLocaleDateString("en-CA")}
                          onChange={(event) =>
                            (payroll.datePrepare = event.target.value)
                          }
                        ></FormControl>
                        {/* {new Date(payroll.datePrepare).toLocaleDateString(
                          "en-CA"
                        )} */}
                      </td>
                      <td
                        style={{
                          width: "100px",
                        }}
                      >
                        <FormControl
                          className="inpHeightXs"
                          type="date"
                          style={{
                            margin: "0px",
                            width: "100px",
                            padding: "0px",
                          }}
                          // ref={transDateRef}
                          defaultValue={new Date(
                            payroll.dateEffect
                          ).toLocaleDateString("en-CA")}
                          onChange={(event) =>
                            (payroll.dateEffect = event.target.value)
                          }
                        ></FormControl>
                        {/* {new Date(payroll.dateEffect).toLocaleDateString(
                          "en-CA"
                        )} */}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.ocompanyCode = event.target.textContent)
                        }
                      >
                        {payroll.ocompanyCode}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.obranchCode = event.target.textContent)
                        }
                      >
                        {payroll.obranchCode}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.acompanyCode = event.target.textContent)
                        }
                      >
                        {payroll.acompanyCode}
                      </td>
                      <td
                        style={{ verticalAlign: "middle" }}
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.abranchCode = event.target.textContent)
                        }
                      >
                        {payroll.abranchCode}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.basic = event.target.textContent)
                        }
                      >
                        {payroll.basic}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.ecola = event.target.textContent)
                        }
                      >
                        {payroll.ecola}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.allowance1 = event.target.textContent)
                        }
                      >
                        {payroll.allowance1}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.allowance2 = event.target.textContent)
                        }
                      >
                        {payroll.allowance2}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.others = event.target.textContent)
                        }
                      >
                        {payroll.others}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.nature = event.target.textContent)
                        }
                      >
                        {payroll.nature}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.rank = event.target.textContent)
                        }
                      >
                        {payroll.rank}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.workPosition = event.target.textContent)
                        }
                      >
                        {payroll.workPosition}
                      </td>
                      <td
                        contentEditable="true"
                        onBlur={(event) =>
                          (payroll.remarks = event.target.textContent)
                        }
                      >
                        {payroll.remarks}
                      </td>
                      <td>
                        <div className="centerDiv">
                          <ButtonGroup>
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => savePayroll(payroll)}
                            >
                              Save
                            </Button>
                            {"  "}
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => deletePayroll(payroll.id)}
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
          </div>
        </Modal.Body>
        <Modal.Footer className="border-dark bg-dark text-white">
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalPromoTransferHist;
