import React from "react";
import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import {
  BsFillExclamationCircleFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";

function ShowMsg({ closeMsg, message }) {
  //   const [showMod, setShowMod] = useState(true);

  //   const handleClose1 = () => {
  //     setShowMod(false);
  //   };

  //   const handleXButton = () => {
  //     setShowMod(false);
  //   };

  return (
    <div>
      <Modal
        // show={showModals.showModals}  {() => handleClose(false)}
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
              maxWidth: "25rem",
              minWidth: "25rem",
              height: "auto",
            }}
            className={" border-dark bg-dark text-white"}
          >
            {message === "Data Saved" ? (
              <h3 style={{ textAlign: "center" }}>{message} !</h3>
            ) : (
              <h3 style={{ textAlign: "center" }}>SAVING {message} !</h3>
            )}
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <Button variant="primary" onClick={() => closeMsg(true)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShowMsg;
