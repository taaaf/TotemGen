import React from 'react';

const SubmitButton = ({ onFileTextSubmission, onDropDivInfoSubmission, file, text, isFileTextSubmitted, areDimensionsSubmitted, onModifiersSubmission }) => {

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
    onDropDivInfoSubmission(); // Handle the submission of dropDivInfo
  };

  const handleModifiersSubmitted = () => {
    onModifiersSubmission(); // Handle the submission of dropDivInfo
  };

  return (
    <div className="position-fixed bottom-0 end-0 p-3 mb-5">
      {!isFileTextSubmitted && (
        <button className="my-btn submitButton" onClick={handleFileTextSubmit}>
          SUBMIT
        </button>
      )}

      {(isFileTextSubmitted && !areDimensionsSubmitted) && (
        <button className="my-btn submitButton" onClick={handleDropDivInfoSubmit}>
          SUBMIT
        </button>
      )}

      {(areDimensionsSubmitted) && (
        <button className="my-btn submitButton" onClick={handleModifiersSubmitted}>
          SUBMIT
        </button>
      )}


    </div>
  );
};

export default SubmitButton;
