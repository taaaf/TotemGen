import React from "react";
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

  return (
    <div className="position-fixed bottom-0 end-0 p-3 mb-5">
      {!isReadyCreate && (
        <button className="my-btn submitButton" onClick={handleCreate}>
          CREATE
          <Arrow  style={{ width: "65%", paddingLeft: "1rem", height:"50%"}} />
        </button>
      )}

      {!isFileTextSubmitted && isReadyCreate && (
        <button className="my-btn submitButton" onClick={handleFileTextSubmit}>
          SUBMIT
        </button>
      )}

      {isFileTextSubmitted && !areDimensionsSubmitted && (
        <button
          className="my-btn submitButton"
          onClick={handleDropDivInfoSubmit}
        >
          SUBMIT
        </button>
      )}

      {!isReadyToExport && areDimensionsSubmitted && (
        <button
          className="my-btn submitButton"
          onClick={handleModifiersSubmitted}
        >
          SUBMIT
        </button>
      )}

      {isReadyToExport && (
        <button className="my-btn submitButton" onClick={handleExport}>
          EXPORT
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
