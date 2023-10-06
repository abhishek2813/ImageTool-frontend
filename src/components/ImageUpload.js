import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const ImageUpload = ({ onAddImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      onAddImage(selectedImage);
      setSelectedImage(null);
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={handleUploadImage}>Add Image</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageUpload;
