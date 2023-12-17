import React, { useState, useEffect } from 'react';

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


  const [buttonClass, setButtonClass] = useState("my-btn backButton");

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth < 768) {
          setButtonClass("my-btn backButtonSmall");
        } else {
          setButtonClass("my-btn backButton");
        }
      }

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }, []);


  return (
    <div className="position-fixed bottom-0 start-0 p-3 mb-5">
      {isReadyCreate && !isFileTextSubmitted && (
        <button className={buttonClass} onClick={handleResetCreate}>
          BACK
        </button>
      )}

      {isFileTextSubmitted && !areDimensionsSubmitted && (
        <button
          className={buttonClass}
          onClick={handleBackClickSubmittedData}
        >
          BACK
        </button>
      )}

      {areDimensionsSubmitted && !areModifiersSubmitted && (
        <button
          className={buttonClass}
          onClick={handleBackClickDimensionSubmitted}
        >
          BACK
        </button>
      )}

      {areModifiersSubmitted && (
        <button
          className={buttonClass}
          onClick={handleBackClickModifiersSubmitted}
        >
          BACK
        </button>
      )}
    </div>
  );
};

export default BackButton;
