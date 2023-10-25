import React from "react";
import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import {
  BsFillExclamationCircleFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";

function LoadingScreen({ handleEnd }) {
  const [showLoading, setShowLoading] = useState(true);
  const [loading, setL] = useState(true);

  const handleClose1 = () => {
    setShowLoading(false);
  };

  const handleXButton = () => {
    setShowLoading(false);
  };

  return (
    <div>
      <Modal
        // show={showModals.showModals}  {() => handleClose(false)}
        show={true}
        onHide={() => handleEnd(false)}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>COMPUTING...</Modal.Title>
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
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              // wrapperStyle={{ marginTop: "180px", marginLeft: "120px" }}
              wrapperStyle={{ margin: "auto" }}
              wrapperClass="blocks-wrapper, centerLoading"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
            {/* <h3 style={{ textAlign: "center" }}>LOADING</h3> */}
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          {/* <Button variant="primary" onClick={() => handleEnd(true)}>
            Confirm
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoadingScreen;
