import React, { useState, useEffect } from 'react';
import { ReactComponent as Arrow } from '../assets/arrow.svg';


const SubmitButton = ({
  onCreate,
  isReadyCreate,
  onFileTextSubmission,
  onDropDivInfoSubmission,
  file,
  text,
  isFileTextSubmitted,
  areDimensionsSubmitted,
  onModifiersSubmission,
  isReadyToExport,
  onReadyToExport,
}) => {
  const handleFileTextSubmit = () => {
    if (file) {
      // If there's a file selected, read it and pass its content
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileTextSubmission(e.target.result); // Pass the file content up to the parent component
      };
      reader.readAsText(file);
    } else {
      // If no file is selected, pass the text area content
      onFileTextSubmission(text);
    }
  };

  const handleDropDivInfoSubmit = () => {
    onDropDivInfoSubmission();
  };

  const handleModifiersSubmitted = () => {
    onModifiersSubmission();
  };

  const handleExport = () => {
    onReadyToExport();
  };

  const handleCreate = () => {
    onCreate();
  };

  const [buttonClass, setButtonClass] = useState("my-btn submitButton");
  const [arrowStyle, setArrowStyle] = useState({});

 useEffect(() => {
   function handleResize() {
     if (window.innerWidth < 768) {
       setButtonClass("my-btn submitButtonSmall");
       setArrowStyle({ width: "50%", paddingLeft: "6%", height: "50%" });
     } else {
       setButtonClass("my-btn submitButton");
       setArrowStyle({ width: "65%", paddingLeft: "6%", height: "50%" });
     }
   }

   handleResize();

   window.addEventListener('resize', handleResize);

   return () => window.removeEventListener('resize', handleResize);
 }, []);

  return (
    <div className="position-fixed bottom-0 end-0 p-3 mb-5">
      {!isReadyCreate && (
        <button className={buttonClass} onClick={handleCreate}>
          CREATE
          <Arrow style={arrowStyle}/>
        </button>
      )}

      {!isFileTextSubmitted && isReadyCreate && (
        <button className={buttonClass} onClick={handleFileTextSubmit}>
          SUBMIT
        </button>
      )}

      {isFileTextSubmitted && !areDimensionsSubmitted && (
        <button
          className={buttonClass}
          onClick={handleDropDivInfoSubmit}
        >
          SUBMIT
        </button>
      )}

      {!isReadyToExport && areDimensionsSubmitted && (
        <button
          className={buttonClass}
          onClick={handleModifiersSubmitted}
        >
          SUBMIT
        </button>
      )}

      {isReadyToExport && (
        <button className={buttonClass} onClick={handleExport}>
          EXPORT
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
