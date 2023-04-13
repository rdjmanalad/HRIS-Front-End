import React from "react";
import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import {
  BsFillExclamationCircleFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";

function PopUpMsg({ closeMsg, message }) {
  return (
    <div>
      <Modal
        // show={showModals.showModals}  {() => handleClose(false)}
        // size="sm"
        show={true}
        onHide={() => closeMsg(false)}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>
            {message === "ERROR" ? (
              <BsFillExclamationCircleFill className="deleteWarningIcon" />
            ) : (
              <a />
            )}
            {message === "SUCCESS" ? (
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
            <div style={{ whiteSpace: "pre-wrap" }}>
              <h4 style={{ textAlign: "center" }}> {message} !</h4>
            </div>
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <Button variant="primary" onClick={() => closeMsg(true)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PopUpMsg;
