import React, { useState } from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import Modifiers from './Modifiers';
import MyShape from './MyShape';
import Export from "./Export";



const sketch = (p) => {

  let angle = 0;
  let switchMode = 0;
  let myShape = [];
  let axisRotation;
  let myShapeRows;
  let angleRadians = 0;
  let areModifiersSubmitted = false;
  let scale = 1;
  let color = "FFFFFF";

  let transZ = 0;
  let transX = 0;
  let maxY = 0;

  let camRadius = 300;
  let camAngleX = 0;
  let camAngleY = 0;


  let cameraX;
  let cameraY;


  const divCanvas = document.getElementById('divCanvas');


  p.setup = () => {
    p.createCanvas(divCanvas.clientWidth, window.innerHeight*0.9, p.WEBGL);
    //p.debugMode();
  };

  p.windowResized = () => {
    p.resizeCanvas(divCanvas.clientWidth, window.innerHeight*0.9, p.WEBGL);
  }


  p.updateWithProps = props => {

      myShape = props.myShape;

      axisRotation = props.axisRotation;

      myShapeRows = props.myShapeRows;
      angleRadians = props.angleRadians;

      if(areModifiersSubmitted !== props.areModifiersSubmitted){
        p.camera(400,-300,100,0,0,0);
        p.resizeCanvas(divCanvas.clientWidth, window.innerHeight*0.9, p.WEBGL);
      }

      areModifiersSubmitted = props.areModifiersSubmitted;

      switchMode = props.switchMode;

      scale = props.scale;

      color = props.color;

  };

  function isMouseOverCanvas() {
          let overCanvasX = p.mouseX > 0 && p.mouseX < p.width;
          let overCanvasY = p.mouseY > 0 && p.mouseY < p.height;
          return overCanvasX && overCanvasY;
      }


  p.draw = () => {
    p.background(255);

    if(!switchMode){
      transZ = -((myShape.length / myShapeRows)-2)*(scale/2) -(scale/2);
      transX = -(myShapeRows-1)*20;
    }else{
      transZ = -((myShape.length / (myShapeRows*2)))*(scale/2) -(scale/2);
      transX = -(myShapeRows/2-1)*20;
    };


    for(let i = 0; i < myShape.length; i++){
      if(myShape[i][1] < maxY){
        maxY = myShape[i][1];
      }
    }
    maxY = -maxY;


    if(!switchMode){
      cameraX= 500 + (30*maxY);
      cameraY= -cameraX/2;
    }else{
      cameraX= ((myShape.length / myShapeRows)/2)*15*maxY;
      cameraY=-cameraX/2;
    }

    if(angleRadians){
      cameraX = cameraX*1.5;
      cameraY = cameraY*1.5;
    }

    if(!areModifiersSubmitted){
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

    }else{
      p.camera(cameraX,cameraY,0,0,0,0);
      p.rotateY(p.frameCount/160);
      scale=20;
    }

    if(!angleRadians){
          p.translate(transX,0,transZ);
    }

    if(angleRadians && axisRotation){

          p.translate(0,0,transZ);
    }else{
      p.translate(0,(maxY*scale/2),0);
    }



    p.scale(scale);


    p.fill(color);


    if (myShape) {
      drawModel();
    }

  };


  function drawModel() {

    let verticesPerRow = myShape.length / myShapeRows;


    // Wall 1
    p.beginShape(p.TRIANGLE_STRIP);

        for (let i = 1; i < verticesPerRow - 1; i++) {
            p.vertex(myShape[i][0], 0, myShape[i][2]);
            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(myShape[i + 1][0], 0, myShape[i + 1][2]);

            p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
            p.vertex(myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]);
            p.vertex(myShape[i + 1][0], 0, myShape[i + 1][2]);
        }



    p.endShape();

    //end of wall 1


    p.beginShape(p.TRIANGLE_STRIP);
    for (let i = verticesPerRow; i + 1 < myShape.length; i++) {

      p.vertex(myShape[i - verticesPerRow][0], myShape[i - verticesPerRow][1], myShape[i - verticesPerRow][2]);
      p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
      p.vertex(myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]);

      p.vertex(myShape[i - verticesPerRow][0], myShape[i - verticesPerRow][1], myShape[i - verticesPerRow][2]);
      p.vertex(myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]);
      p.vertex(myShape[i + 1 - verticesPerRow][0], myShape[i + 1 - verticesPerRow][1], myShape[i + 1 - verticesPerRow][2]);


      if ((i + 2) % (verticesPerRow) === 0) {

        i  = i + 1;

        p.vertex(myShape[i - verticesPerRow][0], myShape[i - verticesPerRow][1], myShape[i - verticesPerRow][2]);
        p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
        p.vertex(myShape[i - verticesPerRow + 1][0], myShape[i - verticesPerRow + 1][1], myShape[i - verticesPerRow + 1][2]);

        p.vertex(myShape[i - verticesPerRow][0], myShape[i - verticesPerRow][1], myShape[i - verticesPerRow][2]);
        p.vertex(myShape[i - (verticesPerRow * 2) + 1][0], myShape[i - (verticesPerRow * 2) + 1][1], myShape[i - (verticesPerRow * 2) + 1][2]);
        p.vertex(myShape[i - verticesPerRow + 1][0], myShape[i - verticesPerRow + 1][1], myShape[i - verticesPerRow + 1][2]);

      }


    }

    p.endShape();



    //Wall 2

    p.beginShape(p.TRIANGLE_STRIP);

    for (let i = myShape.length - 1; i > myShape.length - verticesPerRow; i--) {

      if (!axisRotation && !switchMode || !axisRotation && switchMode) {

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
        const y = Math.sin(angleRadians) * (0.5);

        p.vertex(myShape[myShape.length - 1][0], y, myShape[i][2]);
        p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
        p.vertex(myShape[myShape.length - 1][0], y, myShape[i - 1][2]);

        p.vertex(myShape[i][0], myShape[i][1], myShape[i][2]);
        p.vertex(myShape[i - 1][0], myShape[i - 1][1], myShape[i - 1][2]);
        p.vertex(myShape[myShape.length - 1][0], y, myShape[i - 1][2]);

      }

    }


    p.endShape();

    //end of wall 2


  }


};





const Sketch = ( { dropZoneInfo, table, onMyShapeChange, areModifiersSubmitted, exportStl } ) => {

  const [angle, setAngle] = useState(0);
  const [switchMode, setSwitchMode] = useState(0);
  const [qualityRotation, setQualityRotation] = useState(2);
  const [offsetValue, setOffsetValue] = useState(0);
  const [axisRotation, setAxisRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState('#FFFFFF');

  const [shapeName, setShapeName] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);


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

  const handleColorChange = (data) => {
         setColor(data);
     };


    const [myShape, setMyShape] = useState([]);
    const [myShapeRows, setMyShapeRows] = useState();
    const [angleRadians, setAngleRadians] = useState();


    const handleMyShapeChange = ( { myShape, myShapeRows, angleRadians } ) => {
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



  return (

    <>

    <div className="container-fluid">
     <div className="row" >

     {areModifiersSubmitted ? (

       <div className="col p-0 m-0 d-flex justify-content-center" id="divCanvas">

        <ReactP5Wrapper
          sketch={sketch}
          myShape={myShape}
          axisRotation={axisRotation}
          myShapeRows={myShapeRows}
          angleRadians={angleRadians}
          switchMode={switchMode}
          areModifiersSubmitted={areModifiersSubmitted}
          scale={scale}
          color={color}
        />
        <MyShape
          dropZoneInfo={dropZoneInfo}
          table={table}
          onMyShapeChange={handleMyShapeChange}
          angle={angle}
          switchMode={switchMode}
          qualityRotation={qualityRotation}
          offsetValue ={offsetValue}
          axisRotation ={axisRotation}
        />

        <input
        className="shape-name-input"
        type="text"
        value={shapeName}
        onChange={handleShapeNameChange}
        placeholder="Enter sculpture name"
        />

        {exportStl && (<Export

          myShape={myShape}
          axisRotation={axisRotation}
          myShapeRows={myShapeRows}
          angleRadians={angleRadians}
          switchMode={switchMode}
          shapeName={shapeName}
          />)}

      </div>


    ) : (

      <>

      <div className="col-lg-7 col-xl-8 p-0 m-0" id="divCanvas">
          <ReactP5Wrapper
            sketch={sketch}
            myShape={myShape}
            axisRotation={axisRotation}
            myShapeRows={myShapeRows}
            angleRadians={angleRadians}
            switchMode={switchMode}
            areModifiersSubmitted={areModifiersSubmitted}
            scale={scale}
            color={color}
          />
          <MyShape
            dropZoneInfo={dropZoneInfo}
            table={table}
            onMyShapeChange={handleMyShapeChange}
            angle={angle}
            switchMode={switchMode}
            qualityRotation={qualityRotation}
            offsetValue ={offsetValue}
            axisRotation ={axisRotation}
          />
          </div>


        <div className="col-sm-2 col-md-2 d-lg-none"> </div>

        <div className="col-sm-8 col-md-8 col-lg-4 col-xl-3 px-0 mx-0 my-5" >
             <div className = "modifiers mx-1">
                  <Modifiers
                    onAngleChange={handleAngle}
                    onSwitchModeChange={handleSwitchMode}
                    onQualityRotationChange={handleQualityRotation}
                    onOffsetValueChange={handleOffsetValue}
                    onAxisRotationChange={handleAxisRotation}
                    onScaleChange={handleScaleChange}
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
