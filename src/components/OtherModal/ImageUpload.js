import React, { useState } from "react";
import { Image, Modal, Button, Card } from "react-bootstrap";
import NoImage from "../../img/NoImage.png";

function ImageUpload({ closeUpload, fileURL }) {
  const [file, setFile] = useState(NoImage);
  const [fileOnly, setFileOnly] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    fileURL = URL.createObjectURL(e.target.files[0]);
    setFileOnly(e.target.files);
  }

  return (
    <div>
      <Modal
        show={true}
        onHide={() => closeUpload()}
        dialogClassName="my-modal"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-dark bg-dark text-white">
          <Modal.Title>Upload Image</Modal.Title>
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
            <div style={{ display: "flex", margin: "auto" }}>
              <Image
                fluid
                src={file}
                alt="Missing Image"
                className={("borderWhite", "imageSize2")}
              ></Image>
            </div>
            <br />
            <div style={{ backgroundColor: "gray" }}>
              <input type="file" onChange={handleChange} />
            </div>
          </Card>
        </Modal.Body>
        <Modal.Footer className={" border-dark bg-dark text-white"}>
          <Button variant="primary" onClick={() => closeUpload(file, fileOnly)}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => closeUpload()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ImageUpload;
