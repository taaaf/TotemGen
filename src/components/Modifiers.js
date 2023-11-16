import React, { useState, useEffect } from 'react';

const Modifiers = ({
  onAngleChange,
  onSwitchModeChange,
  onQualityRotationChange,
  onOffsetValueChange,
  onAxisRotationChange
}) => {


  const [angle, setAngle] = useState(0);
  const [switchMode, setSwitchMode] = useState(0);
  const [qualityRotation, setQualityRotation] = useState(2);
  const [offsetValue, setOffsetValue] = useState(0);
  const [axisRotation, setAxisRotation] = useState(0);



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


  return (

    <div  className="label-modifiers">

      <div className="row">
        <div className="col-sm-12 px-3 pb-0">
          <label>
            MODIFIERS
          </label>
        </div>
      </div>

      <hr className="rule mt-1" />

  <div className="row mt-5 mx-2">

    <div className="col-sm-1 px-1">
    <input
      type="radio"
      value= {0}
      checked={switchMode === 0}
      onChange={handleSwitchModeChange}
    />
    </div>

    <div className="col-sm-3 px-1">
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

    <div className="col-sm-7 px-1">
      <label>
          Bars
        </label>
      </div>


    <br />

  <div className="row mt-4">

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

    <div className="col-sm-2 px-1">
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
    <div className="col-sm-5 px-1">
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
           className="form-control"
         />
       </div>
       <div className="col-sm-3 px-1">
         <input
           type="text"
           value={angle}
           onChange={handleAngleChange}
           className="form-control"
         />
       </div>
     </div>

      <br />

      <div className="row mt-4">
         <label className="col-form-label col-sm-3 px-1">
           Quality:
         </label>
         <div className="col-sm-6 px-1">
         <input
         type="range"
         min="2"
         max="36"
         value={qualityRotation}
         onChange={handleQualityRotation}
         className="form-control"

         />
         </div>
         <div className="col-sm-3 px-1">
         <input
           type="text"
           min="0"
           max="360"
           value={qualityRotation}
           onChange={handleQualityRotation}
           className="form-control"

         />
         </div>
       </div>

       <br />

       <div className="row mt-4">
          <label className="col-form-label col-sm-3 px-1">
            Offset:
          </label>
          <div className="col-sm-6 px-1">
          <input
          type="range"
          min="0"
          max="10"
          value={offsetValue}
          onChange={handleOffsetValue}
          className="form-control"

          />
          </div>
          <div className="col-sm-3 px-1">
          <input
            type="text"
            min="0"
            max="10"
            value={offsetValue}
            onChange={handleOffsetValue}
            className="form-control"

          />
          </div>
        </div>

    </div>
    </div>

  );
};

export default Modifiers;
