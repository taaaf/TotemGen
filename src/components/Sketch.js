import React, { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import * as p5 from "p5";
import Modifiers from "./Modifiers";
import MyShape from "./MyShape";
import Export from "./Export";
import { ReactComponent as CameraIcon } from "../assets/camera.svg";

const sketch = (p) => {
  let switchMode = 0;
  let myShape = [];
  let axisRotation;
  let angle;
  let myShapeRows;
  let angleRadians = 0;
  let areModifiersSubmitted = false;
  let scale = 1;
  let color = "FFFFFF";

  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;
  let cameraFactor;

  let camRadius = 300;
  let camAngleX = 0;
  let camAngleY = 0;

  let cameraX;
  let cameraY;

  let exportStl;
  let shapeName = "MySculpture";
  let saveCanvas = false;
  let onSaveCanvasComplete;

  const divCanvas = document.getElementById("divCanvas");

  let myGeometry;

  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(
      divCanvas.clientWidth,
      window.innerHeight * 0.8,
      p.WEBGL
    );
  };

  p.windowResized = () => {
    p.resizeCanvas(divCanvas.clientWidth, window.innerHeight * 0.8, p.WEBGL);
  };

  p.updateWithProps = (props) => {
    if (
      areModifiersSubmitted === true &&
      props.areModifiersSubmitted === false
    ) {
      canvas.remove();
    }

    if (!exportStl) {
      canvas = p.createCanvas(
        divCanvas.clientWidth,
        window.innerHeight * 0.8,
        p.WEBGL
      );
    }

    myShape = props.myShape;

    axisRotation = props.axisRotation;
    angle = props.angle;
    myShapeRows = props.myShapeRows;
    angleRadians = props.angleRadians;

    if (areModifiersSubmitted !== props.areModifiersSubmitted) {
      p.camera(400, -300, 100, 0, 0, 0);
      p.resizeCanvas(divCanvas.clientWidth, window.innerHeight * 0.8, p.WEBGL);
    }

    areModifiersSubmitted = props.areModifiersSubmitted;

    switchMode = props.switchMode;

    scale = props.scale;

    color = props.color;

    exportStl = props.exportStl;
    shapeName = props.shapeName;
    saveCanvas = props.saveCanvas;

    if (props.onSaveCanvasComplete) {
      onSaveCanvasComplete = props.onSaveCanvasComplete;
    }

    maxY = 0;
    maxX = 0;
    maxZ = 0;

    for (let i = 0; i < myShape.length; i++) {
      if (Math.abs(myShape[i][0]) > maxX) {
        maxX = Math.abs(myShape[i][0]);
      }
      if (Math.abs(myShape[i][1]) > maxY) {
        maxY = Math.abs(myShape[i][1]);
      }
      if (myShape[i][2] > maxZ) {
        maxZ = Math.abs(myShape[i][2]);
      }
    }

    if (!axisRotation && angleRadians) {
      maxZ = maxZ * 2;
    }

    if (axisRotation && angleRadians) {
      maxY = maxY * 2;
    }

    cameraFactor = Math.max(maxX, maxY, maxZ);

    createModel();

    if (saveCanvas) {
      canvas = p.createCanvas(1920, 1920, p.WEBGL);
      cameraFactor /= 3;
    }
  };

  function createModel() {
    myGeometry = new p5.Geometry(
      1,
      1,

      function createGeometry() {
        let verticesPerRow = myShape.length / myShapeRows;

        for (let i = verticesPerRow; i + 1 < myShape.length; i++) {
          this.vertices.push(
            new p5.Vector(
              myShape[i - verticesPerRow][0],
              myShape[i - verticesPerRow][1],
              myShape[i - verticesPerRow][2]
            ),
            new p5.Vector(myShape[i][0], myShape[i][1], myShape[i][2]),
            new p5.Vector(
              myShape[i + 1][0],
              myShape[i + 1][1],
              myShape[i + 1][2]
            )
          );

          this.vertices.push(
            new p5.Vector(
              myShape[i - verticesPerRow][0],
              myShape[i - verticesPerRow][1],
              myShape[i - verticesPerRow][2]
            ),
            new p5.Vector(
              myShape[i + 1][0],
              myShape[i + 1][1],
              myShape[i + 1][2]
            ),
            new p5.Vector(
              myShape[i + 1 - verticesPerRow][0],
              myShape[i + 1 - verticesPerRow][1],
              myShape[i + 1 - verticesPerRow][2]
            )
          );

          if ((i + 2) % verticesPerRow === 0) {
            i = i + 1;

            this.vertices.push(
              new p5.Vector(
                myShape[i - verticesPerRow][0],
                myShape[i - verticesPerRow][1],
                myShape[i - verticesPerRow][2]
              ),
              new p5.Vector(
                myShape[i - verticesPerRow * 2 + 1][0],
                myShape[i - verticesPerRow * 2 + 1][1],
                myShape[i - verticesPerRow * 2 + 1][2]
              ),
              new p5.Vector(
                myShape[i - verticesPerRow + 1][0],
                myShape[i - verticesPerRow + 1][1],
                myShape[i - verticesPerRow + 1][2]
              )
            );

            this.vertices.push(
              new p5.Vector(
                myShape[i - verticesPerRow][0],
                myShape[i - verticesPerRow][1],
                myShape[i - verticesPerRow][2]
              ),
              new p5.Vector(myShape[i][0], myShape[i][1], myShape[i][2]),
              new p5.Vector(
                myShape[i - verticesPerRow + 1][0],
                myShape[i - verticesPerRow + 1][1],
                myShape[i - verticesPerRow + 1][2]
              )
            );
          }
        }

        // Wall 1

        if (axisRotation && switchMode) {
          for (let i = 1; i < verticesPerRow - 1; i++) {
            this.vertices.push(
              new p5.Vector([0, 0, myShape[i][2]]),
              new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
              new p5.Vector([0, 0, myShape[i + 1][2]])
            );

            this.vertices.push(
              new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
              new p5.Vector([
                myShape[i + 1][0],
                myShape[i + 1][1],
                myShape[i + 1][2],
              ]),
              new p5.Vector([0, 0, myShape[i + 1][2]])
            );
          }
        }
        for (let i = 1; i < verticesPerRow - 1; i++) {
          this.vertices.push(
            new p5.Vector([myShape[i][0], 0, myShape[i][2]]),
            new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
            new p5.Vector([myShape[i + 1][0], 0, myShape[i + 1][2]])
          );

          this.vertices.push(
            new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
            new p5.Vector([
              myShape[i + 1][0],
              myShape[i + 1][1],
              myShape[i + 1][2],
            ]),
            new p5.Vector([myShape[i + 1][0], 0, myShape[i + 1][2]])
          );
        }

        //end wall 1

        // Wall 2

        for (
          let i = myShape.length - 1;
          i > myShape.length - verticesPerRow;
          i--
        ) {
          if ((!axisRotation && !switchMode) || (!axisRotation && switchMode)) {
            this.vertices.push(
              new p5.Vector([myShape[i][0], 0, myShape[i][2]]),
              new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
              new p5.Vector([myShape[i - 1][0], 0, myShape[i - 1][2]])
            );

            this.vertices.push(
              new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
              new p5.Vector([
                myShape[i - 1][0],
                myShape[i - 1][1],
                myShape[i - 1][2],
              ]),
              new p5.Vector([myShape[i - 1][0], 0, myShape[i - 1][2]])
            );
          }

          if (axisRotation && !switchMode) {
            this.vertices.push(
              new p5.Vector([0, 0, myShape[i][2]]),
              new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
              new p5.Vector([0, 0, myShape[i - 1][2]])
            );

            this.vertices.push(
              new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
              new p5.Vector([
                myShape[i - 1][0],
                myShape[i - 1][1],
                myShape[i - 1][2],
              ]),
              new p5.Vector([0, 0, myShape[i - 1][2]])
            );
          }

          if (axisRotation && switchMode) {
            const y = Math.sin(angleRadians) * 0.5;

            this.vertices.push(
              new p5.Vector([myShape[myShape.length - 1][0], y, myShape[i][2]]),
              new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
              new p5.Vector([
                myShape[myShape.length - 1][0],
                y,
                myShape[i - 1][2],
              ])
            );

            this.vertices.push(
              new p5.Vector([myShape[i][0], myShape[i][1], myShape[i][2]]),
              new p5.Vector([
                myShape[i - 1][0],
                myShape[i - 1][1],
                myShape[i - 1][2],
              ]),
              new p5.Vector([
                myShape[myShape.length - 1][0],
                y,
                myShape[i - 1][2],
              ])
            );
          }
        }
      }
    );
  }

  function isMouseOverCanvas() {
    let overCanvasX = p.mouseX > 0 && p.mouseX < p.width;
    let overCanvasY = p.mouseY > 0 && p.mouseY < p.height;
    return overCanvasX && overCanvasY;
  }

  p.draw = () => {
    p.background(255);

    if (!areModifiersSubmitted) {
      if (p.mouseIsPressed && isMouseOverCanvas()) {
        camAngleX -= (p.mouseX - p.pmouseX) * 0.005;
        camAngleY -= (p.mouseY - p.pmouseY) * 0.005;

        camAngleX = camAngleX % (2 * Math.PI);
        camAngleY = p.constrain(camAngleY, -Math.PI / 2, Math.PI / 2); // Limit vertical rotation
      }

      let camX = camRadius * Math.sin(camAngleX) * Math.cos(camAngleY);
      let camY = camRadius * Math.sin(camAngleY);
      let camZ = camRadius * Math.cos(camAngleX) * Math.cos(camAngleY);

      p.camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
    } else {
      p.camera(1, 1, 0, 0, 0, 0);
      p.ortho(
        -p.width / 2,
        p.width / 2,
        p.height / 2,
        -p.height / 2,
        -1000,
        1000
      );
      p.rotateY(p.frameCount / 160);
      scale = -200 / cameraFactor;
    }

    if (!axisRotation && angle) {
      p.translate(0, 0, 0);
    } else {
      p.translate(0, 0, -maxZ * (scale / 2));
    }

    p.scale(scale);

    if (myShape) {
      p.push();
      p.fill(color);
      p.model(myGeometry);
      p.pop();

      p.push();
      p.noFill();
      p.stroke(0);
      p.beginShape(p.LINES);

      {
        let verticesPerRow = myShape.length / myShapeRows;

        for (let i = verticesPerRow; i + 1 < myShape.length; i++) {
          p.vertex(
            myShape[i - verticesPerRow][0],
            myShape[i - verticesPerRow][1],
            myShape[i - verticesPerRow][2]
          );
          p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
          p.vertex(myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]);

          p.vertex(
            myShape[i - verticesPerRow][0],
            myShape[i - verticesPerRow][1],
            myShape[i - verticesPerRow][2]
          );
          p.vertex(myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]);
          p.vertex(
            myShape[i + 1 - verticesPerRow][0],
            myShape[i + 1 - verticesPerRow][1],
            myShape[i + 1 - verticesPerRow][2]
          );

          if ((i + 2) % verticesPerRow === 0) {
            i = i + 1;

            p.vertex(
              myShape[i - verticesPerRow][0],
              myShape[i - verticesPerRow][1],
              myShape[i - verticesPerRow][2]
            );
            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(
              myShape[i - verticesPerRow + 1][0],
              myShape[i - verticesPerRow + 1][1],
              myShape[i - verticesPerRow + 1][2]
            );

            p.vertex(
              myShape[i - verticesPerRow][0],
              myShape[i - verticesPerRow][1],
              myShape[i - verticesPerRow][2]
            );
            p.vertex(
              myShape[i - verticesPerRow * 2 + 1][0],
              myShape[i - verticesPerRow * 2 + 1][1],
              myShape[i - verticesPerRow * 2 + 1][2]
            );
            p.vertex(
              myShape[i - verticesPerRow + 1][0],
              myShape[i - verticesPerRow + 1][1],
              myShape[i - verticesPerRow + 1][2]
            );
          }
        }

        p.endShape();
        p.pop();

        p.push();
        p.fill(color);
        p.beginShape(p.TRIANGLE_STRIP);

        //wall 1
        for (let i = 1; i < verticesPerRow - 1; i++) {
          p.vertex(myShape[i][0], 0, myShape[i][2]);
          p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
          p.vertex(myShape[i + 1][0], 0, myShape[i + 1][2]);

          p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
          p.vertex(myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]);
          p.vertex(myShape[i + 1][0], 0, myShape[i + 1][2]);
        }
        //end of wall 1

        p.endShape();
        p.pop();

        p.push();
        p.fill(color);
        p.beginShape(p.TRIANGLE_STRIP);
        //Wall 2
        for (
          let i = myShape.length - 1;
          i > myShape.length - verticesPerRow;
          i--
        ) {
          if ((!axisRotation && !switchMode) || (!axisRotation && switchMode)) {
            p.vertex(myShape[i][0], 0, myShape[i][2]);
            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(myShape[i - 1][0], 0, myShape[i - 1][2]);

            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(myShape[i - 1][0], myShape[i - 1][1], myShape[i - 1][2]);
            p.vertex(myShape[i - 1][0], 0, myShape[i - 1][2]);
          }

          if (axisRotation && !switchMode) {
            p.vertex(0, 0, myShape[i][2]);
            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(0, 0, myShape[i - 1][2]);

            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(myShape[i - 1][0], myShape[i - 1][1], myShape[i - 1][2]);
            p.vertex(0, 0, myShape[i - 1][2]);
          }

          if (axisRotation && switchMode) {
            const y = Math.sin(angleRadians) * 0.5;

            p.vertex(myShape[myShape.length - 1][0], y, myShape[i][2]);
            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(myShape[myShape.length - 1][0], y, myShape[i - 1][2]);

            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(myShape[i - 1][0], myShape[i - 1][1], myShape[i - 1][2]);
            p.vertex(myShape[myShape.length - 1][0], y, myShape[i - 1][2]);
          }
        }
        //end of wall 2

        p.endShape();
        p.pop();
      }

      if (saveCanvas) {
        p.saveCanvas("Render_Sculpture_" + shapeName, "jpg");
        canvas = p.createCanvas(
          divCanvas.clientWidth,
          window.innerHeight * 0.8,
          p.WEBGL
        );
        saveCanvas = false;
        if (onSaveCanvasComplete) {
          onSaveCanvasComplete();
        }
      }
    }
  };
};

const Sketch = ({
  dropZoneInfo,
  table,
  onMyShapeChange,
  areModifiersSubmitted,
  exportStl,
}) => {
  const [angle, setAngle] = useState(0);
  const [switchMode, setSwitchMode] = useState(0);
  const [qualityRotation, setQualityRotation] = useState(2);
  const [offsetValue, setOffsetValue] = useState(0);
  const [axisRotation, setAxisRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [xScale, setXScale] = useState(1);
  const [zScale, setZScale] = useState(1);
  const [color, setColor] = useState("#FFFFFF");

  const [shapeName, setShapeName] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [myShape, setMyShape] = useState([]);
  const [myShapeRows, setMyShapeRows] = useState();
  const [angleRadians, setAngleRadians] = useState();

  const handleAngle = (data) => {
    setAngle(data);
  };

  const handleSwitchMode = (data) => {
    setSwitchMode(data);
  };

  const handleQualityRotation = (data) => {
    setQualityRotation(data);
  };

  const handleOffsetValue = (data) => {
    setOffsetValue(data);
  };

  const handleAxisRotation = (data) => {
    setAxisRotation(data);
  };

  const handleScaleChange = (data) => {
    setScale(data);
  };

  const handleXScaleChange = (data) => {
    setXScale(data);
  };

  const handleZScaleChange = (data) => {
    setZScale(data);
  };

  const handleColorChange = (data) => {
    setColor(data);
  };

  const handleMyShapeChange = ({ myShape, myShapeRows, angleRadians }) => {
    setMyShape(myShape);
    setMyShapeRows(myShapeRows);
    setAngleRadians(angleRadians);
  };

  const handleShapeNameChange = (event) => {
    setShapeName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
  };

  const [saveCanvas, setSaveCanvas] = useState(false);

  const handleSaveCanvas = () => {
    setSaveCanvas(true);
  };

  const handleSaveCanvasComplete = () => {
    setSaveCanvas(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {areModifiersSubmitted ? (
            <>
              <h2 className="text-center pt-3">SAVE</h2>

              <div
                className="col p-0 m-0 d-flex justify-content-center"
                id="divCanvas"
              >
                <ReactP5Wrapper
                  sketch={sketch}
                  myShape={myShape}
                  axisRotation={axisRotation}
                  myShapeRows={myShapeRows}
                  angleRadians={angleRadians}
                  switchMode={switchMode}
                  angle={angle}
                  areModifiersSubmitted={areModifiersSubmitted}
                  scale={scale}
                  color={color}
                  exportStl={exportStl}
                  shapeName={shapeName}
                  saveCanvas={saveCanvas}
                  onSaveCanvasComplete={handleSaveCanvasComplete}
                />
                <MyShape
                  dropZoneInfo={dropZoneInfo}
                  table={table}
                  onMyShapeChange={handleMyShapeChange}
                  angle={angle}
                  switchMode={switchMode}
                  qualityRotation={qualityRotation}
                  offsetValue={offsetValue}
                  axisRotation={axisRotation}
                  xScale={xScale}
                  zScale={zScale}
                />

                <div className="export-name-camera row">
                  <input
                    className="shape-name-input col-8"
                    type="text"
                    value={shapeName}
                    onChange={handleShapeNameChange}
                    placeholder="Enter sculpture name"
                  />

                  <div className="col-1"> </div>

                  <button
                    className="col-3 camera-button"
                    onClick={handleSaveCanvas}
                  >
                    <CameraIcon
                      className="camera-icon"
                      style={{ width: "60%", padding: "10%", height: "100%" }}
                    />
                  </button>
                </div>

                {exportStl && (
                  <Export
                    myShape={myShape}
                    axisRotation={axisRotation}
                    myShapeRows={myShapeRows}
                    angleRadians={angleRadians}
                    switchMode={switchMode}
                    shapeName={shapeName}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center pt-3">CUSTOMIZE</h2>
              <div className="col-lg-7 col-xl-8 p-0 m-0" id="divCanvas">
                <ReactP5Wrapper
                  sketch={sketch}
                  myShape={myShape}
                  axisRotation={axisRotation}
                  myShapeRows={myShapeRows}
                  angleRadians={angleRadians}
                  switchMode={switchMode}
                  angle={angle}
                  areModifiersSubmitted={areModifiersSubmitted}
                  scale={scale}
                  color={color}
                  saveCanvas={saveCanvas}
                />
                <MyShape
                  dropZoneInfo={dropZoneInfo}
                  table={table}
                  onMyShapeChange={handleMyShapeChange}
                  angle={angle}
                  switchMode={switchMode}
                  qualityRotation={qualityRotation}
                  offsetValue={offsetValue}
                  axisRotation={axisRotation}
                  xScale={xScale}
                  zScale={zScale}
                />
              </div>

              <div className="col-sm-2 col-md-2 d-lg-none"> </div>

              <div className="col-sm-8 col-md-8 col-lg-4 col-xl-3 px-0 mx-0 my-5">
                <div className="modifiers mx-1">
                  <Modifiers
                    onAngleChange={handleAngle}
                    onSwitchModeChange={handleSwitchMode}
                    onQualityRotationChange={handleQualityRotation}
                    onOffsetValueChange={handleOffsetValue}
                    onAxisRotationChange={handleAxisRotation}
                    onScaleChange={handleScaleChange}
                    onXScaleChange={handleXScaleChange}
                    onZScaleChange={handleZScaleChange}
                    onColorChange={handleColorChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sketch;
