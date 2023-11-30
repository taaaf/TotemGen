import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react';


const sketch = (p) => {

  let myShape = [];
  let myShapeRows;
  let axisRotation;
  let switchMode;
  let angleRadians;
  let shapeName = "myShape";

  p.updateWithProps = props => {

    myShape = props.myShape;
    myShapeRows = props.myShapeRows;
    axisRotation = props.axisRotation;
    switchMode = props.switchMode;
    angleRadians  = props.angleRadians;

    if(props.shapeName){
      shapeName = props.shapeName;
    }

    if(myShape){
    exportSTL();
    }

  }

  function exportSTL() {


    let vertices = prepModelForExport();
    let stlContent = 'solid MyShape\n';

    // Iterate through the vertices to create triangles
    for (let i = 0; i + 2 < vertices.length; i += 3) {
      const normal = calculateNormal(vertices[i], vertices[i + 1], vertices[i + 2]);
      stlContent += `  facet normal ${normal.x} ${normal.y} ${normal.z}\n`;
      stlContent += '    outer loop\n';

      for (let j = 0; j < 3; j++) {
        const v = vertices[i + j];
        stlContent += `      vertex ${v[0]} ${v[1]} ${v[2]}\n`;
      }

      stlContent += '    endloop\n';
      stlContent += '  endfacet\n';
    }

    stlContent += 'endsolid MyShape\n';

    // Create a Blob and a download link
    const blob = new Blob([stlContent], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = shapeName + '.stl';

    // Trigger a click event to download the STL file
    link.click();

    // Clean up
    URL.revokeObjectURL(url);

  }


  function prepModelForExport() {

    let myShapeExport = [];

    let verticesPerRow = myShape.length / myShapeRows;

    if (myShapeRows !== 1) {


      for (let i = verticesPerRow; i + 1 < myShape.length; i++) {

        let v1 = [myShape[i - verticesPerRow][0], myShape[i - verticesPerRow][1], myShape[i - verticesPerRow][2]];
        let v2 = [myShape[i][0], myShape[i][1], myShape[i][2]];
        let v3 = [myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]];

        myShapeExport.push(v1);
        myShapeExport.push(v2);
        myShapeExport.push(v3);

        let v4 = [myShape[i - verticesPerRow][0], myShape[i - verticesPerRow][1], myShape[i - verticesPerRow][2]];
        let v5 = [myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]];
        let v6 = [myShape[i + 1 - verticesPerRow][0], myShape[i + 1 - verticesPerRow][1], myShape[i + 1 - verticesPerRow][2]];

        myShapeExport.push(v4);
        myShapeExport.push(v5);
        myShapeExport.push(v6);

        if ((i + 2) % (verticesPerRow) === 0) {

          i = (i + 1);

          let v1 = [myShape[i - verticesPerRow][0], myShape[i - verticesPerRow][1], myShape[i - verticesPerRow][2]];
          let v2 = [myShape[i - (verticesPerRow * 2) + 1][0], myShape[i - (verticesPerRow * 2) + 1][1], myShape[i - (verticesPerRow * 2) + 1][2]];
          let v3 = [myShape[i - verticesPerRow + 1][0], myShape[i - verticesPerRow + 1][1], myShape[i - verticesPerRow + 1][2]];

          myShapeExport.push(v1);
          myShapeExport.push(v2);
          myShapeExport.push(v3);

          let v4 = [myShape[i - verticesPerRow][0], myShape[i - verticesPerRow][1], myShape[i - verticesPerRow][2]];
          let v5 = [myShape[i][0], myShape[i][1], myShape[i][2]];
          let v6 = [myShape[i - verticesPerRow + 1][0], myShape[i - verticesPerRow + 1][1], myShape[i - verticesPerRow + 1][2]];

          myShapeExport.push(v4);
          myShapeExport.push(v5);
          myShapeExport.push(v6);


        }

      }


      // Wall 1

        if (axisRotation && switchMode) {

            for (let i = 1; i < verticesPerRow - 1; i++) {

          myShapeExport.push([0, 0, myShape[i][2]]);
          myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
          myShapeExport.push([0, 0, myShape[i + 1][2]]);

          myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
          myShapeExport.push([myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]]);
          myShapeExport.push([0, 0, myShape[i + 1][2]]);
          }

        }
      for (let i = 1; i < verticesPerRow - 1; i++) {


            myShapeExport.push([myShape[i][0], 0, myShape[i][2]]);
            myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
            myShapeExport.push([myShape[i + 1][0], 0, myShape[i + 1][2]]);

            myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
            myShapeExport.push([myShape[i + 1][0], myShape[i + 1][1], myShape[i + 1][2]]);
            myShapeExport.push([myShape[i + 1][0], 0, myShape[i + 1][2]]);



      }

      //end wall 1



      // Wall 2

      for (let i = myShape.length - 1; i > myShape.length - verticesPerRow; i--) {

        if (!axisRotation && !switchMode || !axisRotation && switchMode) {

            myShapeExport.push([myShape[i][0], 0, myShape[i][2]]);
            myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
            myShapeExport.push([myShape[i - 1][0], 0, myShape[i - 1][2]]);

            myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
            myShapeExport.push([myShape[i - 1][0], myShape[i - 1][1], myShape[i - 1][2]]);
            myShapeExport.push([myShape[i - 1][0], 0, myShape[i - 1][2]]);

        }

        if (axisRotation && !switchMode) {

            myShapeExport.push([0, 0, myShape[i][2]]);
            myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
            myShapeExport.push([0, 0, myShape[i - 1][2]]);

            myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
            myShapeExport.push([myShape[i - 1][0], myShape[i - 1][1], myShape[i - 1][2]]);
            myShapeExport.push([0, 0, myShape[i - 1][2]]);

        }

        if (axisRotation && switchMode) {
          const y = Math.sin(angleRadians) * (0.5);

            myShapeExport.push([myShape[myShape.length - 1][0], y, myShape[i][2]]);
            myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
            myShapeExport.push([myShape[myShape.length - 1][0], y, myShape[i - 1][2]]);

            myShapeExport.push([myShape[i][0], myShape[i][1], myShape[i][2]]);
            myShapeExport.push([myShape[i - 1][0], myShape[i - 1][1], myShape[i - 1][2]]);
            myShapeExport.push([myShape[myShape.length - 1][0], y, myShape[i - 1][2]]);
        }

      }


    }

    return (myShapeExport);

  }


  function calculateNormal(vertex1, vertex2, vertex3) {

    const v1 = p.createVector(vertex2[0] - vertex1[0], vertex2[1] - vertex1[1], vertex2[2] - vertex1[2]);
    const v2 = p.createVector(vertex3[0] - vertex1[0], vertex3[1] - vertex1[1], vertex3[2] - vertex1[2]);
    const normal = {
          x: v1.y * v2.z - v1.z * v2.y,
          y: v1.z * v2.x - v1.x * v2.z,
          z: v1.x * v2.y - v1.y * v2.x
      };

      const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
     normal.x /= length;
     normal.y /= length;
     normal.z /= length;

    return normal;
  }




}


const Export = ( { myShape, axisRotation, myShapeRows, angleRadians, switchMode, shapeName }) => {


  return  (

    <ReactP5Wrapper
      sketch={sketch}
      myShape={myShape}
      axisRotation={axisRotation}
      myShapeRows={myShapeRows}
      angleRadians={angleRadians}
      switchMode={switchMode}
      shapeName={shapeName}
    />

  )
};


export default Export;
