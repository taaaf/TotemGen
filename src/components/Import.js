import React, { useState } from 'react';

const Import = ({ onFileSelect, onTextChange }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    onFileSelect(file); // Pass the file up to the parent component
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setText(text);
    onTextChange(text); // Pass the text up to the parent component
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
      <input className="form-control"
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      />

      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Or copy here..."
          value={text}
          onChange={handleTextChange}
          style={{ height: "300px" }} // Adjust height as needed
        ></textarea>
      </div>
    </div>
  );
};

export default Import;
