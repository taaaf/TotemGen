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

    <div className="container-fluid d-flex justify-content-center align-items-center pt-5 mt-5 pb-4 ">
  <div className="row">
    <div className="col-sm-8 col-md-12 col-lg-12 mx-auto">
      <div className="mb-3">
        <input
          className="form-control"
          id="choose-file"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-0">
        <textarea
          className="form-control"
          id="text-area"
          placeholder="Or copy here..."
          value={text}
          onChange={handleTextChange}
          style={{ height: "14rem" }}
        ></textarea>
      </div>
    </div>
  </div>
</div>


  );
};

export default Import;
