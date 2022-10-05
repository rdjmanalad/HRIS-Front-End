import React from "react";
import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

function ModalConfirm({ handleClose }) {
  const [showMod, setShowMod] = useState(true);

  const handleClose1 = () => {
    setShowMod(false);
  };

  const handleXButton = () => {
    setShowMod(false);
  };

  return (
    <div>
      <Modal
        // show={showModals.showModals}  {() => handleClose(false)}
        show={true}
        onHide={() => handleClose(false)}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-dark bg-dark text-white">
          <Card
            style={{
              "max-width": "25rem",
              "min-width": "25rem",
              height: "auto",
            }}
            className={" border-dark bg-dark text-white"}
          >
            <label>aaaaaaaaaaaaaaaaaa</label>
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <Button variant="primary" onClick={() => handleClose(true)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalConfirm;
