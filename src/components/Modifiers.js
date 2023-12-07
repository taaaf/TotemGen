import React, { useState, useEffect } from 'react';

const Modifiers = ({
  onAngleChange,
  onSwitchModeChange,
  onQualityRotationChange,
  onOffsetValueChange,
  onAxisRotationChange,
  onScaleChange,
  onZScaleChange,
  onColorChange
}) => {


  const [angle, setAngle] = useState(0);
  const [switchMode, setSwitchMode] = useState(0);
  const [qualityRotation, setQualityRotation] = useState(2);
  const [offsetValue, setOffsetValue] = useState(0);
  const [axisRotation, setAxisRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [zScale, setZScale] = useState(1);
  const [color, setColor] = useState('#FFFFFF');



  useEffect(() => {
    onAngleChange(angle);
  }, [angle, onAngleChange]);

  useEffect(() => {
    onSwitchModeChange(switchMode);
  }, [switchMode, onSwitchModeChange]);

  useEffect(() => {
    onQualityRotationChange(qualityRotation);
  }, [qualityRotation, onQualityRotationChange]);

  useEffect(() => {
    onOffsetValueChange(offsetValue);
  }, [offsetValue, onOffsetValueChange]);

  useEffect(() => {
    onAxisRotationChange(axisRotation);
  }, [axisRotation, onAxisRotationChange]);

  useEffect(() => {
    onScaleChange(scale);
  }, [scale, onScaleChange]);

  useEffect(() => {
    onZScaleChange(zScale);
  }, [zScale, onZScaleChange]);

  useEffect(() => {
   onColorChange(color);
 }, [color, onColorChange]);


  const handleAngleChange = (e) => {
    setAngle(Number(e.target.value));
  };

  const handleSwitchModeChange = (e) => {
    setSwitchMode(Number(e.target.value));
  };

  const handleQualityRotation = (e) => {
    setQualityRotation(Number(e.target.value));
  };

  const handleOffsetValue = (e) => {
    setOffsetValue(Number(e.target.value));
  };

  const handleAxisRotationChange = (e) => {
    setAxisRotation(Number(e.target.value));
  };

  const handleScaleChange = (e) => {
    setScale(Number(e.target.value));
  };

  const handleZScaleChange = (e) => {
    setZScale(Number(e.target.value));
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };


  return (

    <div  className="mb-5 px-3 pt-3">

      <div className="row">
        <div className="col-sm-12 px-3 pb-0">
          <label>
            MODIFIERS
          </label>
        </div>
      </div>

      <hr className="rule mt-1" />

      <div className="ms-4">

  <div className="row mt-5">

    <div className="col-sm-1 px-1">
    <input
      type="radio"
      value= {0}
      checked={switchMode === 0}
      onChange={handleSwitchModeChange}
    />
    </div>

    <div className="col-sm-3 px-3">
        <label>
          Plot
          </label>
      </div>


    <div className="col-sm-1 px-1">
        <input
          type="radio"
          value= {1}
          checked={switchMode === 1}
          onChange={handleSwitchModeChange}

        />
    </div>

    <div className="col-sm-7 px-3">
      <label>
          Bars
        </label>
      </div>


    <br />

  <div className="row mt-5">

    <div className="col-sm-3 px-1">
        <label>
          Axis
          </label>
      </div>

    <div className="col-sm-1 px-1">
      <input
          type="radio"
          name="axisRotation"
          value= {0}
          checked={axisRotation === 0}
          onChange={handleAxisRotationChange}
        />
    </div>

    <div className="col-sm-2 px-3">
    <label>
          Y
          </label>
      </div>


    <div className="col-sm-1 px-1">
        <input
          type="radio"
          name="axisRotation"
          value= {1}
          checked={axisRotation === 1}
          onChange={handleAxisRotationChange}

        />
    </div>
    <div className="col-sm-5 px-3">
          <label >
          Z
          </label>
      </div>
    </div>

    <br />

    <div className="row mt-2">
       <label className="col-form-label col-sm-3 px-1 ">
         Angle:
       </label>
       <div className="col-sm-6 px-1">
         <input
           type="range"
           min="0"
           max="360"
           value={angle}
           onChange={handleAngleChange}
           className="custom-range form-control"
         />
       </div>
       <div className="col-sm-3 px-1">
         <input
           type="number"
           value={angle}
           onChange={handleAngleChange}
           className="custom-number form-control"
         />
       </div>
     </div>

      <br />

      <div className="row mt-2">
         <label className="col-form-label col-sm-3 px-1">
           Iterations:
         </label>
         <div className="col-sm-6 px-1">
         <input
         type="range"
         min="2"
         max="36"
         value={qualityRotation}
         onChange={handleQualityRotation}
         className="custom-range form-control"

         />
         </div>
         <div className="col-sm-3 px-1">
         <input
           type="number"
           min="0"
           max="360"
           value={qualityRotation}
           onChange={handleQualityRotation}
           className="custom-number form-control"

         />
         </div>
       </div>

       <br />

       <div className="row mt-2">
          <label className="col-form-label col-sm-3 px-1">
            Offset:
          </label>
          <div className="col-sm-6 px-1">
          <input
          type="range"
          min="-100"
          step="0.1"
          max="100"
          value={offsetValue}
          onChange={handleOffsetValue}
          className="custom-range form-control"

          />
          </div>
          <div className="col-sm-3 px-1">
          <input
            type="number"
            min="-1000"
            max="1000"
            value={offsetValue}
            onChange={handleOffsetValue}
            className="custom-number form-control"

          />
          </div>
        </div>

    <div className="row mt-5">
      <label className="col-form-label col-sm-3 px-1">
        Z scale:
      </label>
      <div className="col-sm-6 px-1">
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={zScale}
          onChange={handleZScaleChange}
          className="custom-range form-control"
        />
      </div>
      <div className="col-sm-3 px-1">
        <input
          type="number"
          value={zScale}
          onChange={handleZScaleChange}
          className="custom-number form-control"
        />
      </div>
    </div>

    <div className="row mt-2">
      <label className="col-form-label col-sm-3 px-1">
        Scale:
      </label>
      <div className="col-sm-6 px-1">
        <input
          type="range"
          min="0.1"
          max="100"
          step="0.1"
          value={scale}
          onChange={handleScaleChange}
          className="custom-range form-control"
        />
      </div>
      <div className="col-sm-3 px-1">
        <input
          type="number"
          value={scale}
          onChange={handleScaleChange}
          className="custom-number form-control"
        />
      </div>
    </div>

    <div className="row mt-5">
            <label className="col-form-label col-sm-3 px-1">
              Color:
            </label>
            <div className="col-sm-9 px-1">
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="form-control form-control-color custom-color"
              />
            </div>
          </div>

          </div>
      </div>
  </div>

  );
};

export default Modifiers;
