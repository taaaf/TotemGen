import React, { useState } from "react";

const Import = ({ onFileSelect, onTextChange }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [tableString, setTableString] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    onFileSelect(file);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setText(text);
    onTextChange(text);
  };

  const generateRandomTable = () => {
    const headerWords = ["STEPS", "DATA1", "DATA2", "DATA3"];
    const numberOfRows = Math.floor(Math.random() * 7) + 4;

    let newData = [headerWords];

    for (let i = 0; i < numberOfRows; i++) {
      let row = Array(headerWords.length);

      row[0] = i + 1;

      for (let j = 1; j < headerWords.length; j++) {
        row[j] = Math.floor(Math.random() * 12) + 1;
      }
      newData.push(row);
    }

    const string = newData.map((row) => row.join("; ")).join("\n");
    setTableString(string);
    setText(string);
    onTextChange(string);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center pt-5 mt-5 pb-4 ">
      <div className="row">
        <div className="col-sm-12 mx-auto">

        <h2 className="pb-4 text-center">LOAD DATA</h2>

          <div className="my-3">
            <input
              className="form-control"
              id="choose-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <p className="ps-2 pt-1" style={{fontSize:"0.9rem"}}>File format accepted: .csv </p>
          </div>
          <div className="mb-0 pt-2">
            <textarea
              className="form-control"
              id="text-area"
              placeholder="Or copy here..."
              value={text || tableString}
              onChange={handleTextChange}
              style={{ height: "14rem" }}
            ></textarea>
          </div>

          <button className="random-table mt-1" onClick={generateRandomTable}>
            Generate random table
          </button>
        </div>
      </div>
    </div>
  );
};

export default Import;
