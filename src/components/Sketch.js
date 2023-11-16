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
  let angleRadians;
  let areModifiersSubmitted = false;


  let transZ = 0;
  let transX = 0;
  let maxY = 0;


  let cameraX;
  let cameraY;


  const divCanvas = document.getElementById('divCanvas');


  p.setup = () => {
    p.createCanvas(divCanvas.clientWidth, window.innerHeight, p.WEBGL);
    // p.debugMode();




  };

  p.windowResized = () => {

    p.resizeCanvas(divCanvas.clientWidth, window.innerHeight, p.WEBGL);

  }


  p.updateWithProps = props => {

      myShape = props.myShape;

      axisRotation = props.axisRotation;

      myShapeRows = props.myShapeRows;
      angleRadians = props.angleRadians;
      areModifiersSubmitted = props.areModifiersSubmitted;

      switchMode = props.switchMode;

      if(!switchMode){
        transZ = -((myShape.length / myShapeRows)-2)*20 -20;
        transX = -(myShapeRows-1)*20;
      }else{
        transZ = -((myShape.length / (myShapeRows*2)))*20 -20;
        transX = -(myShapeRows/2-1)*20;
      };


      if(!switchMode){
        cameraX= ((myShape.length / myShapeRows)-1)*15*maxY;
        cameraY= -cameraX/2;
      }else{
        cameraX= ((myShape.length / myShapeRows)/2)*15*maxY;
        cameraY=-cameraX/2;
      }

      if(angleRadians){
        cameraX = cameraX*1.5;
        cameraY = cameraY*1.5;
      }


      for(let i = 0; i < myShape.length; i++){
        if(myShape[i][1] < maxY){
          maxY = myShape[i][1];
        }
      }
      maxY = -maxY;


  };




  p.draw = () => {
    p.background(255);


    if(!areModifiersSubmitted){
      p.orbitControl();
    }else{
      p.camera(cameraX,cameraY,0,0,0,0);
      p.rotateY(p.frameCount/160);
    }


    if(!angleRadians){
          p.translate(transX,0,transZ);
    }

    if(angleRadians && axisRotation){
          p.translate(0,0,transZ);
    }




    p.scale(40);


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

        let drawnVertices = (i + 1);

        p.vertex(myShape[drawnVertices - verticesPerRow][0], myShape[drawnVertices - verticesPerRow][1], myShape[drawnVertices - verticesPerRow][2]);
        p.vertex(myShape[drawnVertices - (verticesPerRow * 2) + 1][0], myShape[drawnVertices - (verticesPerRow * 2) + 1][1], myShape[drawnVertices - (verticesPerRow * 2) + 1][2]);
        p.vertex(myShape[drawnVertices - verticesPerRow + 1][0], myShape[drawnVertices - verticesPerRow + 1][1], myShape[drawnVertices - verticesPerRow + 1][2]);

        p.vertex(myShape[drawnVertices - verticesPerRow][0], myShape[drawnVertices - verticesPerRow][1], myShape[drawnVertices - verticesPerRow][2]);
        p.vertex(myShape[drawnVertices][0], myShape[drawnVertices][1], myShape[drawnVertices][2]);
        p.vertex(myShape[drawnVertices - verticesPerRow + 1][0], myShape[drawnVertices - verticesPerRow + 1][1], myShape[drawnVertices - verticesPerRow + 1][2]);

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





const Sketch = ( { dropZoneInfo, table, onMyShapeChange, areModifiersSubmitted } ) => {

  const [angle, setAngle] = useState(0);
  const [switchMode, setSwitchMode] = useState(0);
  const [qualityRotation, setQualityRotation] = useState(2);
  const [offsetValue, setOffsetValue] = useState(0);
  const [axisRotation, setAxisRotation] = useState(0);



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



    const [myShape, setMyShape] = useState([]);
    const [myShapeRows, setMyShapeRows] = useState();
    const [angleRadians, setAngleRadians] = useState();


    const handleMyShapeChange = ( { myShape, myShapeRows, angleRadians } ) => {
       setMyShape(myShape);
       setMyShapeRows(myShapeRows);
       setAngleRadians(angleRadians);
     };


  return (

    <>

    <div className="container-fluid">
     <div className="row" >

     {areModifiersSubmitted ? (

        <div className="col-12 p-0 m-0 d-flex justify-content-center" id="divCanvas">

        <ReactP5Wrapper
          sketch={sketch}
          myShape={myShape}
          axisRotation={axisRotation}
          myShapeRows={myShapeRows}
          angleRadians={angleRadians}
          switchMode={switchMode}
          areModifiersSubmitted={areModifiersSubmitted}
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



    ) : (

      <>

      <div className="col-md-8 p-0 m-0" id="divCanvas">
          <ReactP5Wrapper
            sketch={sketch}
            myShape={myShape}
            axisRotation={axisRotation}
            myShapeRows={myShapeRows}
            angleRadians={angleRadians}
            switchMode={switchMode}
            areModifiersSubmitted={areModifiersSubmitted}
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

        <div className="col-md-4 px-0 mx-0 mt-5" >
         <div className = "modifiers p-3 m-2">

          <Modifiers
            onAngleChange={handleAngle}
            onSwitchModeChange={handleSwitchMode}
            onQualityRotationChange={handleQualityRotation}
            onOffsetValueChange={handleOffsetValue}
            onAxisRotationChange={handleAxisRotation}
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
