import React, { useEffect, useState } from "react";
import Canvas from "../Canvas";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TextBox from "../TextBox";
import ImageUpload from "../ImageUpload";
import { savedImg, uploadImg } from "../actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import canvasToImage from "canvas-to-image";

function Home() {
  const [canvasObj, setCanvasObj] = useState([]);
  const [stageDataURL, setStageDataURL] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //check user exit or not
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (!auth) {
      navigate("/login");
    }
    setUser(auth);
  }, [navigate]);
  const addText = ({ text, fontSize, textColor }) => {
    if (!text.trim()) {
      toast.error("Please enter some text.");
      return;
    }
    const newText = {
      x: 150,
      y: 150,
      text: text,
      fontSize: fontSize,
      fill: textColor,
      type: "text",
    };
    setCanvasObj([...canvasObj, newText]);
  };

  const addImage = async (uploadedImage) => {
    const imageUrl = URL.createObjectURL(uploadedImage);
    const newImage = new window.Image();
    newImage.src = imageUrl;
    newImage.onload = () => {
      const imageToAdd = {
        x: 250,
        y: 250,
        image: newImage,
        width: newImage.naturalWidth,
        height: newImage.naturalHeight,
        type: "image",
      };
      setCanvasObj([...canvasObj, imageToAdd]);
    };
    const uploadFile = await uploadImg(uploadedImage, user.id);
    if (uploadFile.status === 201) {
      toast.success(uploadFile.message);
    } else {
      toast.error(uploadFile.error);
    }
  };

  const handleDownload = () => {
    if (stageDataURL) {
      const a = document.createElement("a");
      a.href = stageDataURL;
      a.download = "canvas_image.png";
      a.click();
      toast.success("Download.");
    }
  };

  const handleSave = async () => {
    if (stageDataURL) {
      // Convert the canvas data to an image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = stageDataURL;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Convert canvas to a data URL
        const canvasDataUrl = canvas.toDataURL("image/png");

        // Create a Blob object from the data URL
        const blob = dataURLtoBlob(canvasDataUrl);

        // Create a File object from the Blob
        const canvasFile = new File([blob], "canvas_image.png", {
          type: "image/png",
        });

        // Upload the canvas image to the server
        uploadCanvasImage(canvasFile);
      };
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const uploadCanvasImage = async (canvasFile) => {
    try {
      const uploadFile = await savedImg(canvasFile, user.id);
      if (uploadFile.status === 201) {
        toast.success(uploadFile.message);
      } else {
        toast.error(uploadFile.error);
      }
    } catch (error) {
      toast.error("An error occurred while uploading the canvas image.");
    }
  };

  useEffect(() => {
    setStageDataURL(null); // Reset the previous dataURL
  }, [canvasObj]);
  return (
    <div>
      <Container>
        <Row>
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="my-3 shadow p-3 mb-5 bg-white rounded">
              <Card>
                <Card.Body>
                  <Card.Title>Editor Tools</Card.Title>
                  <Card.Text>
                    <div>
                      <ImageUpload onAddImage={addImage} />
                    </div>
                    <div>
                      <TextBox onAddText={addText} />
                    </div>
                  </Card.Text>
                  <Button
                    className="mx-3"
                    variant="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button variant="success" onClick={handleDownload}>
                    Download
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="my-3 shadow p-3 mb-5 bg-white rounded">
              <Card>
                <Card.Body>
                  <Card.Title>Preview</Card.Title>
                  <Card.Text>
                    <Canvas
                      canvasObj={canvasObj}
                      onCanvasRender={(dataURL) => setStageDataURL(dataURL)}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
