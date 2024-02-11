import React, { useState, useEffect } from 'react';

const Modifiers = ({
  angle,
  switchMode,
  qualityRotation,
  offsetValue,
  axisRotation,
  scale,
  xScale,
  zScale,
  color,
  onAngleChange,
  onSwitchModeChange,
  onQualityRotationChange,
  onOffsetValueChange,
  onAxisRotationChange,
  onScaleChange,
  onXScaleChange,
  onZScaleChange,
  onColorChange
}) => {

  const handleAngleChange = (e) => {
    onAngleChange(Number(e.target.value));
  };

  const handleSwitchModeChange = (e) => {
    onSwitchModeChange(Number(e.target.value));
  };

  const handleQualityRotation = (e) => {
    onQualityRotationChange(Number(e.target.value));
  };

  const handleOffsetValue = (e) => {
    onOffsetValueChange(Number(e.target.value));
  };

  const handleAxisRotationChange = (e) => {
    onAxisRotationChange(Number(e.target.value));
  };

  const handleScaleChange = (e) => {
    onScaleChange(Number(e.target.value));
  };

  const handleXScaleChange = (e) => {
    onXScaleChange(Number(e.target.value));
  };

  const handleZScaleChange = (e) => {
    onZScaleChange(Number(e.target.value));
  };

  const handleColorChange = (e) => {
    onColorChange(e.target.value);
  };


  return (

    <div  className="mb-5 px-3 pt-3">

      <div className="row">
        <div className="col-12 px-3 pb-0">
          <label>
            MODIFIERS
          </label>
        </div>
      </div>

      <hr className="rule mt-1" />

      <div className="ms-4">

  <div className="row mt-5">

    <div className="col-1 px-1">
    <input
      type="radio"
      value= {0}
      checked={switchMode === 0}
      onChange={handleSwitchModeChange}
    />
    </div>

    <div className="col-3 px-3">
        <label>
          Plot
          </label>
      </div>


    <div className="col-1 px-1">
        <input
          type="radio"
          value= {1}
          checked={switchMode === 1}
          onChange={handleSwitchModeChange}

        />
    </div>

    <div className="col-3 px-3">
      <label>
          Bars
        </label>
      </div>


    <br />

  <div className="row mt-4">

    <div className="col-3 px-1">
        <label>
          Axis
          </label>
      </div>

    <div className="col-1 px-1">
      <input
          type="radio"
          name="axisRotation"
          value= {0}
          checked={axisRotation === 0}
          onChange={handleAxisRotationChange}
        />
    </div>

    <div className="col-2 px-3">
    <label>
          Y
          </label>
      </div>


    <div className="col-1 px-1">
        <input
          type="radio"
          name="axisRotation"
          value= {1}
          checked={axisRotation === 1}
          onChange={handleAxisRotationChange}

        />
    </div>
    <div className="col-5 px-3">
          <label >
          X
          </label>
      </div>
    </div>

    <br />

    <div className="row mt-1">
       <label className="col-form-label col-3 px-1 ">
         Angle:
       </label>
       <div className="col-6 px-1">
         <input
           type="range"
           min="0"
           max="360"
           value={angle}
           onChange={handleAngleChange}
           className="custom-range form-control"
         />
       </div>
       <div className="col-3 px-1">
         <input
           type="number"
           value={angle}
           onChange={handleAngleChange}
           className="custom-number form-control"
         />
       </div>
     </div>

      <br />

      <div className="row mt-1">
         <label className="col-form-label col-3 px-1">
           Iterations:
         </label>
         <div className="col-6 px-1">
         <input
         type="range"
         min="1"
         max="36"
         value={qualityRotation}
         onChange={handleQualityRotation}
         className="custom-range form-control"

         />
         </div>
         <div className="col-3 px-1">
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

       <div className="row mt-1">
          <label className="col-form-label col-3 px-1">
            Offset:
          </label>
          <div className="col-6 px-1">
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
          <div className="col-3 px-1">
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

    <div className="row mt-4">
      <label className="col-form-label col-3 px-1">
        X scale:
      </label>
      <div className="col-6 px-1">
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={xScale}
          onChange={handleXScaleChange}
          className="custom-range form-control"
        />
      </div>
      <div className="col-3 px-1">
        <input
          type="number"
          value={xScale}
          onChange={handleXScaleChange}
          className="custom-number form-control"
        />
      </div>
    </div>

    <div className="row mt-1">
      <label className="col-form-label col-3 px-1">
        Z scale:
      </label>
      <div className="col-6 px-1">
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
      <div className="col-3 px-1">
        <input
          type="number"
          value={zScale}
          onChange={handleZScaleChange}
          className="custom-number form-control"
        />
      </div>
    </div>

    <div className="row mt-3">
      <label className="col-form-label col-3 px-1">
        SCALE:
      </label>
      <div className="col-6 px-1">
        <input
          type="range"
          min="0.1"
          max="30"
          step="0.1"
          value={scale}
          onChange={handleScaleChange}
          className="custom-range form-control"
        />
      </div>
      <div className="col-3 px-1">
        <input
          type="number"
          value={scale}
          onChange={handleScaleChange}
          className="custom-number form-control"
        />
      </div>
    </div>

    <div className="row mt-4">
            <label className="col-form-label col-3 px-1">
              Color:
            </label>
            <div className="col-9 px-1">
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
