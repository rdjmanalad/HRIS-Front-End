import React from "react";
import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import {
  BsFillExclamationCircleFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";

function ModalConfirm({ handleClose, action }) {
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
          <Modal.Title>
            {action === "DELETE" ? (
              <BsFillExclamationCircleFill className="deleteWarningIcon" />
            ) : (
              <a />
            )}
            {action === "EDIT" ? (
              <BsFillExclamationCircleFill className="infoWarningIcon" />
            ) : (
              <a />
            )}
            {action === "INFO" ? (
              <BsFillExclamationCircleFill className="infoWarningIcon" />
            ) : (
              <a />
            )}
            {action === "MASS COMPUTATION" ? (
              <BsFillExclamationCircleFill className="infoWarningIcon" />
            ) : (
              <a />
            )}
          </Modal.Title>
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
            <h3 style={{ textAlign: "center" }}>CONFIRM {action} ?</h3>
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
