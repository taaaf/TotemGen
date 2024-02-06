import React, { useEffect, useMemo } from "react";

const MyShape = ({
  dropZoneInfo,
  table,
  onMyShapeChange,
  angle,
  switchMode,
  qualityRotation,
  offsetValue,
  axisRotation,
  xScale,
  zScale,
}) => {
  function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
  }

  const myShape = useMemo(() => {
    let myShape = [];
    const dropZoneInfoLength = dropZoneInfo ? Object.values(dropZoneInfo) : [];
    const dropZoneInfoValues = [];

    for (let i = 0; i < dropZoneInfoLength.length; i++) {
      if (Object.values(dropZoneInfo)[i] === "dropzone1") {
        dropZoneInfoValues.unshift(Number(Object.keys(dropZoneInfo)[i]));
      }

      if (Object.values(dropZoneInfo)[i] === "dropzone2") {
        dropZoneInfoValues.push(Number(Object.keys(dropZoneInfo)[i]));
      }
    }

    let valueZ = 0;

    const valueX = [];
    let myShapeRows = 0;

    let angleRadians = 0;

    for (let rep = 0; rep < qualityRotation; rep++) {
      dropZoneInfoValues.forEach((element, index) => {
        if (index === 0) {
          for (let i = 0; i < table.length; i++) {
            valueX.push(Number(table[i][element] * xScale));
          }
        }

        if (index > 0) {
          if (!switchMode) {
            //PLOT MODE---- PLOT MODE---- PLOT MODE---- PLOT MODE---- PLOT MODE----

            if (angle === 0) {
              valueZ = myShapeRows;
            }

            for (let i = 0; i < table.length; i++) {
              if (!axisRotation) {
                // The Axis of rotation is the Y Axis

                angleRadians = mapRange(
                  myShapeRows,
                  0,
                  dropZoneInfoValues.length - 1,
                  0,
                  (angle * Math.PI) / 180 / qualityRotation
                );

                //piece to go back to 0 height
                if (i === 0) {
                  const z = valueZ * zScale;
                  const x = valueX[1] + offsetValue;
                  const rotatedZ =
                    Math.cos(angleRadians) * z + Math.sin(angleRadians) * x;
                  const rotatedX =
                    -Math.sin(angleRadians) * z + Math.cos(angleRadians) * x;

                  const array = [rotatedZ, 0, rotatedX];
                  myShape.push(array);
                } else {
                  //sculpture
                  const valueY = -table[i][element];
                  const z = valueZ * zScale;
                  const x = valueX[i] + offsetValue;
                  const rotatedZ =
                    Math.cos(angleRadians) * z + Math.sin(angleRadians) * x;
                  const rotatedX =
                    -Math.sin(angleRadians) * z + Math.cos(angleRadians) * x;

                  const array = [rotatedZ, valueY, rotatedX];
                  myShape.push(array);
                }

                //piece to go back to 0 height
                if (i === table.length - 1) {
                  const z = valueZ * zScale;
                  const x = valueX[i] + offsetValue;
                  const rotatedZ =
                    Math.cos(angleRadians) * z + Math.sin(angleRadians) * x;
                  const rotatedX =
                    -Math.sin(angleRadians) * z + Math.cos(angleRadians) * x;

                  const array = [rotatedZ, 0, rotatedX];
                  myShape.push(array);
                }
              } else {
                // the Axis of rotation is the Z Axis

                angleRadians = mapRange(
                  myShapeRows,
                  0,
                  dropZoneInfoValues.length - 1,
                  0,
                  (angle * Math.PI) / 180
                );

                if (i === 0) {
                  const z = valueZ * zScale;
                  const y = 0;
                  const rotatedZ =
                    Math.cos(angleRadians) * z - Math.sin(angleRadians) * y;
                  const rotatedY =
                    Math.sin(angleRadians) * z + Math.cos(angleRadians) * y;

                  const array = [rotatedZ, rotatedY, valueX[1]];
                  myShape.push(array);
                } else {
                  //sculpture

                  const valueY = -table[i][element];
                  const z = valueZ * zScale;
                  const y = valueY - offsetValue;
                  const rotatedZ =
                    Math.cos(angleRadians) * z - Math.sin(angleRadians) * y;
                  const rotatedY =
                    Math.sin(angleRadians) * z + Math.cos(angleRadians) * y;

                  const array = [rotatedZ, rotatedY, valueX[i]];
                  myShape.push(array);
                }

                //piece to go back to 0 height
                if (i === table.length - 1) {
                  const z = valueZ * zScale;
                  const y = 0;
                  const rotatedZ =
                    Math.cos(angleRadians) * z - Math.sin(angleRadians) * y;
                  const rotatedY =
                    Math.sin(angleRadians) * z + Math.cos(angleRadians) * y;

                  const array = [rotatedZ, rotatedY, valueX[i]];
                  myShape.push(array);
                }
              }
            }

            myShapeRows++;

            //end plot mode
          } else {
            //BARS MODE --- BARS MODE --- BARS MODE --- BARS MODE --- BARS MODE ---

            if (angle === 0) {
              valueZ = myShapeRows;
            }

            for (let j = 0; j < 2; j++) {
              for (let i = 0; i < table.length; i++) {
                if (!axisRotation) {
                  // The Axis of rotation is the Y Axis

                  if (i === 0) {
                    //piece to go back to 0 height

                    const z = (valueZ + j + (-element + 0.5)) * zScale;
                    const x = valueX[1] + offsetValue;
                    const rotatedZ =
                      Math.cos(angleRadians) * z + Math.sin(angleRadians) * x;
                    const rotatedX =
                      -Math.sin(angleRadians) * z + Math.cos(angleRadians) * x;

                    const array = [rotatedZ, 0, rotatedX];
                    myShape.push(array);
                  } else {
                    //sculpture

                    const valueY = -table[i][element];
                    const z = (valueZ + j + (-element + 0.5)) * zScale;
                    const x = valueX[i] + offsetValue;
                    const rotatedZ =
                      Math.cos(angleRadians) * z + Math.sin(angleRadians) * x;
                    const rotatedX =
                      -Math.sin(angleRadians) * z + Math.cos(angleRadians) * x;

                    if (i > 1) {
                      const valueYprev = -table[i - 1][element];
                      const array = [rotatedZ, valueYprev, rotatedX];
                      myShape.push(array);
                    }

                    const array = [rotatedZ, valueY, rotatedX];
                    myShape.push(array);
                  }

                  //piece to go back to 0 height
                  if (i === table.length - 1) {
                    const valueY = -table[i][element];
                    const z = (valueZ + j + (-element + 0.5)) * zScale;
                    const x =
                      valueX[i] + (valueX[i] - valueX[i - 1]) + offsetValue;
                    const rotatedZ =
                      Math.cos(angleRadians) * z + Math.sin(angleRadians) * x;
                    const rotatedX =
                      -Math.sin(angleRadians) * z + Math.cos(angleRadians) * x;

                    const array1 = [rotatedZ, valueY, rotatedX];
                    const array2 = [rotatedZ, 0, rotatedX];
                    myShape.push(array1);
                    myShape.push(array2);
                  }
                } else {
                  // The Axis of rotation is the Z Axis

                  //piece to go back to 0 height

                  if (i === 0) {
                    const z = (valueZ + j + (-element + 0.5)) * zScale;
                    const y = 0;
                    const rotatedZ =
                      Math.cos(angleRadians) * z - Math.sin(angleRadians) * y;
                    const rotatedY =
                      Math.sin(angleRadians) * z + Math.cos(angleRadians) * y;
                    const x = valueX[1];

                    const array = [0, 0, x];
                    myShape.push(array);
                  } else {
                    const valueY = -table[i][element];
                    const z = (valueZ + j + (-element + 0.5)) * zScale;
                    const y = valueY - offsetValue;
                    const x = valueX[i];

                    const rotatedZ =
                      Math.cos(angleRadians) * z - Math.sin(angleRadians) * y;
                    const rotatedY =
                      Math.sin(angleRadians) * z + Math.cos(angleRadians) * y;

                    const array = [rotatedZ, rotatedY, x];
                    myShape.push(array);

                    if (i < table.length - 1) {
                      const array1 = [rotatedZ, rotatedY, valueX[i + 1]];
                      myShape.push(array1);
                    }
                  }

                  //piece to go back to 0 height
                  if (i === table.length - 1) {
                    const z = (valueZ + j + (-element + 0.5)) * zScale;
                    const y = 0;
                    const x = valueX[i] + (valueX[i] - valueX[i - 1]);
                    const rotatedZ =
                      Math.cos(angleRadians) * z - Math.sin(angleRadians) * y;
                    const rotatedY =
                      Math.sin(angleRadians) * z + Math.cos(angleRadians) * y;

                    const valueYprev = -table[i][element] - offsetValue;
                    const rotatedYprev =
                      Math.sin(angleRadians) * z +
                      Math.cos(angleRadians) * valueYprev;
                    const rotatedZprev =
                      Math.cos(angleRadians) * z -
                      Math.sin(angleRadians) * valueYprev;

                    const array1 = [rotatedZprev, rotatedYprev, x];
                    myShape.push(array1);

                    const array = [0, 0, x];
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

    if (angle === 360 && switchMode === 0) {
      for (let i = 0; i <= table.length; i++) {
        const array = myShape[i];
        myShape.push(array);
      }
      myShapeRows++;
    }

    return { myShape, myShapeRows, angleRadians };
  }, [
    dropZoneInfo,
    table,
    angle,
    switchMode,
    qualityRotation,
    offsetValue,
    axisRotation,
    xScale,
    zScale,
  ]);

  useEffect(() => {
    onMyShapeChange(myShape);
    console.log(myShape);
  }, [myShape, onMyShapeChange]);

  // Return nothing or a placeholder as this component seems to not render anything.
  return null;
};

export default MyShape;
