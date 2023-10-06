import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { Stage, Layer, Text, Image } from "react-konva";

const Canvas = ({ canvasObj, onCanvasRender }) => {
  const stageRef = useRef(null);
  const handleDragEnd = (index, event) => {
    const updatedObjects = [...canvasObj];
    updatedObjects[index] = {
      ...updatedObjects[index],
      x: event.target.x(),
      y: event.target.y(),
    };
  };
  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current.getStage();
      if (stage) {
        stage.toDataURL({
          callback: (dataURL) => {
            onCanvasRender(dataURL);
          },
        });
      }
    }
  }, [canvasObj, onCanvasRender]);
  return (
    <Container>
      <Stage width={550} height={800} ref={stageRef}>
        <Layer>
          {canvasObj.map((object, index) => {
            if (object.type === "text") {
              return (
                <Text
                  key={index}
                  {...object}
                  draggable
                  onDragEnd={(event) => handleDragEnd(index, event)}
                />
              );
            } else if (object.type === "image") {
              return (
                <Image
                  key={index}
                  {...object}
                  draggable
                  onDragEnd={(event) => handleDragEnd(index, event)}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </Container>
  );
};

export default Canvas;
