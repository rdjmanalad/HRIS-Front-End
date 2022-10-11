import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table, ButtonGroup } from "react-bootstrap";

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
                </tr>
              </thead>
              <tbody>
                {payrolls.length === 0 ? (
                  <tr align="center">
                    <td colSpan={"15"}>No History Found</td>
                  </tr>
                ) : (
                  payrolls.map((payroll) => (
                    <tr key={payroll.id}>
                      <td>
                        {new Date(payroll.datePrepare).toLocaleDateString(
                          "en-CA"
                        )}
                      </td>
                      <td>
                        {new Date(payroll.dateEffect).toLocaleDateString(
                          "en-CA"
                        )}
                      </td>
                      <td>{payroll.ocompanyCode}</td>
                      <td>{payroll.obranchCode}</td>
                      <td>{payroll.acompanyCode}</td>
                      <td>{payroll.abranchCode}</td>
                      <td>{payroll.basic}</td>
                      <td>{payroll.ecola}</td>
                      <td>{payroll.allowance1}</td>
                      <td>{payroll.allowance2}</td>
                      <td>{payroll.others}</td>
                      <td>{payroll.nature}</td>
                      <td>{payroll.rank}</td>
                      <td>{payroll.workPosition}</td>
                      <td>{payroll.remarks}</td>
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
