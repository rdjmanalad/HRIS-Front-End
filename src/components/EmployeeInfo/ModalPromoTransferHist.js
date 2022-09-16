import React, { useState } from "react";
import { Modal, Button, Table, ButtonGroup } from "react-bootstrap";

function ModalPromoTransferHist(company) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ "margin-top": "5px" }}
      >
        Show Promotions and Transfer History
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Promotions and Transfer History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalPromoTransferHist;
