import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { toast } from "react-toastify";

function ImageCard({ data }) {
  const handleDownload = async () => {
    const blob = new Blob();
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "canvas_image.png";
    a.click();
    window.URL.revokeObjectURL(a.href);
    toast.success("Download");
  };
  return (
    <div>
      <Col>
        <Card>
          <Card.Img
            variant="top"
            src={`${process.env.REACT_APP_API_URL}/Images/${data.image}`}
          />
          <Card.Body>
            <Button variant="primary" onClick={handleDownload}>
              Download
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default ImageCard;
