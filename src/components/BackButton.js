import React, { useState } from "react";

const BackButton = ({
  isReadyCreate,
  onResetCreate,
  onResetSubmittedData,
  onResetDimensionSubmitted,
  isFileTextSubmitted,
  areDimensionsSubmitted,
  areModifiersSubmitted,
  onResetModifiersSubmitted,
}) => {
  const handleResetCreate = () => {
    onResetCreate();
  };

  const handleBackClickSubmittedData = () => {
    onResetSubmittedData();
  };

  const handleBackClickDimensionSubmitted = () => {
    onResetDimensionSubmitted();
  };

  const handleBackClickModifiersSubmitted = () => {
    onResetModifiersSubmitted();
  };

  return (
    <div className="position-fixed bottom-0 start-0 p-3 mb-5">
      {isReadyCreate && !isFileTextSubmitted && (
        <button className="my-btn backButton" onClick={handleResetCreate}>
          BACK
        </button>
      )}

      {isFileTextSubmitted && !areDimensionsSubmitted && (
        <button
          className="my-btn backButton"
          onClick={handleBackClickSubmittedData}
        >
          BACK
        </button>
      )}

      {areDimensionsSubmitted && !areModifiersSubmitted && (
        <button
          className="my-btn backButton"
          onClick={handleBackClickDimensionSubmitted}
        >
          BACK
        </button>
      )}

      {areModifiersSubmitted && (
        <button
          className="my-btn backButton"
          onClick={handleBackClickModifiersSubmitted}
        >
          BACK
        </button>
      )}
    </div>
  );
};

export default BackButton;
