import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const TextBox = ({ onAddText }) => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("black");

  const handleAddText = () => {
    if (text.trim() === "") {
      toast.error("Please enter some text.");
      return;
    }
    onAddText({ text, fontSize, textColor });
    setText("");
    toast.success("Text Added");
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={4}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Text On Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Text on Image"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group className="mb-3">
              <Form.Label>Font Size:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Font Size:"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col xs={5}>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Text Color:</Form.Label>
                  <Form.Control
                    type="color"
                    id="exampleColorInput"
                    defaultValue="#563d7c"
                    title="Choose your color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button className="my-3" onClick={handleAddText}>
                    Add Text
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TextBox;
