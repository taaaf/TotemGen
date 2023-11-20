import React, { useEffect, useMemo } from 'react';

const MyShape = ({
  dropZoneInfo,
  table,
  onMyShapeChange,
  angle,
  switchMode,
  qualityRotation,
  offsetValue,
  axisRotation
}) => {


  const myShape = useMemo(() => {

    let myShape = [];
    const dropZoneInfoLength = dropZoneInfo ? Object.values(dropZoneInfo) : [];
    const dropZoneInfoValues = [];

    for(let i = 0; i < dropZoneInfoLength.length; i++){
        dropZoneInfoValues.push(Number(Object.keys(dropZoneInfo)[i]));
    }


    let valueX = 0;

    const valueZ = [];
    let myShapeRows = 0;

    let angleRadians = 0;


    for (let ang = 0; ang <= angle; ang = ang + (360 / qualityRotation)) {

      angleRadians = (ang * Math.PI) / 180;


    dropZoneInfoValues.forEach((element, index) => {


      if (index === 0) {
        for (let i = 0; i < table.length; i++) {
          valueZ.push(Number(table[i][element]));
        }
      }


      if(index > 0){

          if (!switchMode) {

            //PLOT MODE---- PLOT MODE---- PLOT MODE---- PLOT MODE---- PLOT MODE----

            if (angle === 0) {
              valueX = myShapeRows;
            }


            for (let i = 0; i < table.length; i++) {

              if (!axisRotation) { // The Axis of rotation is the Y Axis

                //piece to go back to 0 height
                if (i === 0) {

                  const x = valueX;
                  const z = valueZ[1] + offsetValue;
                  const rotatedX = Math.cos(angleRadians) * x + Math.sin(angleRadians) * z;
                  const rotatedZ = -Math.sin(angleRadians) * x + Math.cos(angleRadians) * z;

                  const array = [rotatedX, 0, rotatedZ];
                  myShape.push(array);


                } else {
                  //sculpture
                  const valueY = (-(table[i][element]));
                  const x = valueX;
                  const z = valueZ[i] + offsetValue;
                  const rotatedX = Math.cos(angleRadians) * x + Math.sin(angleRadians) * z;
                  const rotatedZ = -Math.sin(angleRadians) * x + Math.cos(angleRadians) * z;

                  const array = [rotatedX, valueY, rotatedZ];
                  myShape.push(array);

                }

                //piece to go back to 0 height
                if (i === table.length - 1) {

                  const x = valueX;
                  const z = valueZ[i] + offsetValue;
                  const rotatedX = Math.cos(angleRadians) * x + Math.sin(angleRadians) * z;
                  const rotatedZ = -Math.sin(angleRadians) * x + Math.cos(angleRadians) * z;

                  const array = [rotatedX, 0, rotatedZ];
                  myShape.push(array);


                }



              } else { // the Axis of rotation is the Z Axis

                //piece to go back to 0 height

                if (i === 0) {

                  const x = valueX;
                  const y = 0;
                  const rotatedX = Math.cos(angleRadians) * x - Math.sin(angleRadians) * y;
                  const rotatedY = Math.sin(angleRadians) * x + Math.cos(angleRadians) * y;

                  const array = [rotatedX, rotatedY, valueZ[1]];
                  myShape.push(array);

                } else {

                  //sculpture
                  const valueY = (-(table[i][element]));
                  const x = valueX;
                  const y = valueY - offsetValue;
                  const rotatedX = Math.cos(angleRadians) * x - Math.sin(angleRadians) * y;
                  const rotatedY = Math.sin(angleRadians) * x + Math.cos(angleRadians) * y;

                  const array = [rotatedX, rotatedY, valueZ[i]];
                  myShape.push(array);
                }

                //piece to go back to 0 height
                if (i === table.length - 1) {

                  const x = valueX;
                  const y = 0;
                  const rotatedX = Math.cos(angleRadians) * x - Math.sin(angleRadians) * y;
                  const rotatedY = Math.sin(angleRadians) * x + Math.cos(angleRadians) * y;

                  const array = [rotatedX, rotatedY, valueZ[i]];
                  myShape.push(array);

                }

              }

            }

            myShapeRows++;


            //end plot mode

          } else

          { //BARS MODE --- BARS MODE --- BARS MODE --- BARS MODE --- BARS MODE ---


            if (angle === 0) {
              valueX = myShapeRows;
            }


            for (let j = 0; j < 2; j++) {

              for (let i = 0; i < table.length; i++) {


                if (!axisRotation) { // The Axis of rotation is the Y Axis


                  if (i === 0) { //piece to go back to 0 height

                    const x = valueX + j + (-element + 0.5);
                    const z = valueZ[1] + offsetValue;
                    const rotatedX = Math.cos(angleRadians) * x + Math.sin(angleRadians) * z;
                    const rotatedZ = -Math.sin(angleRadians) * x + Math.cos(angleRadians) * z;

                    const array = [rotatedX, 0, rotatedZ];
                    myShape.push(array);

                  } else { //sculpture

                    const valueY = (-(table[i][element]));
                    const x = valueX + j + (-element + 0.5);
                    const z = valueZ[i] + offsetValue;
                    const rotatedX = Math.cos(angleRadians) * x + Math.sin(angleRadians) * z;
                    const rotatedZ = -Math.sin(angleRadians) * x + Math.cos(angleRadians) * z;

                    if (i > 1) {

                      const valueYprev = (-(table[i - 1][element]));
                      const array = [rotatedX, valueYprev, rotatedZ];
                      myShape.push(array);

                    }

                    const array = [rotatedX, valueY, rotatedZ];
                    myShape.push(array);


                  }

                  //piece to go back to 0 height
                  if (i === table.length - 1) {

                    const valueY = (-(table[i][element]));
                    const x = valueX + j + (-element + 0.5);
                    const z = valueZ[i] + (valueZ[i] - valueZ[i - 1]) + offsetValue;
                    const rotatedX = Math.cos(angleRadians) * x + Math.sin(angleRadians) * z;
                    const rotatedZ = -Math.sin(angleRadians) * x + Math.cos(angleRadians) * z;

                    const array1 = [rotatedX, valueY, rotatedZ];
                    const array2 = [rotatedX, 0, rotatedZ];
                    myShape.push(array1);
                    myShape.push(array2);


                  }

                } else { // The Axis of rotation is the Z Axis



                  //piece to go back to 0 height

                  if (i === 0) {

                    const x = valueX + j + (-element + 0.5);
                    const y = 0;
                    const rotatedX = Math.cos(angleRadians) * x - Math.sin(angleRadians) * y;
                    const rotatedY = Math.sin(angleRadians) * x + Math.cos(angleRadians) * y;
                    const z = valueZ[1];

                    const array = [0, 0, z];
                    myShape.push(array);



                  } else {


                    const valueY = (-(table[i][element]));
                    const x = valueX + j + (-element + 0.5);
                    const y = valueY - offsetValue;
                    const z = valueZ[i];

                    const rotatedX = Math.cos(angleRadians) * x - Math.sin(angleRadians) * y;
                    const rotatedY = Math.sin(angleRadians) * x + Math.cos(angleRadians) * y;

                    const array = [rotatedX, rotatedY, z];
                    myShape.push(array);

                    if (i < table.length - 1) {

                      const array1 = [rotatedX, rotatedY, valueZ[i + 1]];
                      myShape.push(array1);

                    }


                  }

                  //piece to go back to 0 height
                  if (i === table.length - 1) {

                    const x = valueX + j + (-element + 0.5);
                    const y = 0;
                    const z = valueZ[i] + (valueZ[i] - valueZ[i - 1]);
                    const rotatedX = Math.cos(angleRadians) * x - Math.sin(angleRadians) * y;
                    const rotatedY = Math.sin(angleRadians) * x + Math.cos(angleRadians) * y;

                    const valueYprev = (-(table[i][element])) - offsetValue;
                    const rotatedYprev = Math.sin(angleRadians) * x + Math.cos(angleRadians) * valueYprev;
                    const rotatedXprev = Math.cos(angleRadians) * x - Math.sin(angleRadians) * valueYprev;

                    const array1 = [rotatedXprev, rotatedYprev, z];
                    myShape.push(array1);

                    const array = [0, 0, z];
                    myShape.push(array);


                  }



                }



              }



              myShapeRows++;

            }



          } //end bars mode

        }


    });

      }

    return {myShape, myShapeRows, angleRadians};
  }, [dropZoneInfo,
    table,
    angle,
    switchMode,
    qualityRotation,
    offsetValue,
    axisRotation]);

  useEffect(() => {
      onMyShapeChange(myShape);
  }, [myShape, onMyShapeChange]);

  // Return nothing or a placeholder as this component seems to not render anything.
  return null;
};

export default MyShape;
