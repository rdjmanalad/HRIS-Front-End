import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table, ButtonGroup } from "react-bootstrap";

function ModalAddress() {
  const [show, setShow] = useState(false);
  const [payrolls, setPayrolls] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   useEffect(() => {
  //     getPayroll();
  //   }, [show]);

  //   const getPayroll = () => {
  //     addZero();
  //     axios.defaults.headers.common["Authorization"] =
  //       "Bearer " + localStorage.getItem("jwt").replace(/^"(.+(?="$))"$/, "$1");
  //     axios
  //       .get("http://localhost:8080/api/payroll/listbyempno/" + stringEmpno)
  //       .then((response) => response.data)
  //       .then((data) => {
  //         console.log(data);
  //         setPayrolls(data);
  //       })
  //       .catch((message) => {
  //         alert(message);
  //       });
  //   };

  return (
    <div style={{ marginTop: "10px" }}>
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
        <Modal.Body className="border-dark bg-dark text-white"></Modal.Body>
        <Modal.Footer className="border-dark bg-dark text-white">
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddress;
