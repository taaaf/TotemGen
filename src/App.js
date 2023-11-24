import React, { useState, useEffect } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

import "./App.css"

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Resources from "./components/Resources";
import Contribute from "./components/Contribute";
import Sketch from "./components/Sketch";
import Import from "./components/Import";
import SubmitButton from "./components/SubmitButton";
import BackButton from './components/BackButton';
import ParseVertexData from "./components/ParseVertexData";
import DragContainerComponent from './components/DragContainerComponent';


export function App() {

  const [isReadyCreate, setReadyCreate] = useState(false);

  const handleCreate = (data) =>{
    setReadyCreate(true);
  }

const handleResetCreate = (data) =>{
  setReadyCreate(false);
}

  const [uploadedFile, setUploadedFile] = useState(null);
  const [inputText, setInputText] = useState('');

  const handleFileSelect = (file) => {
    setUploadedFile(file);
  };

  const handleTextChange = (text) => {
    setInputText(text);
  };


  const [tableData, setTableData] = useState();

  const handleTableData = (data) => {
      setTableData(data);
    };


  const [dropZoneInfo, setDropZoneInfo] = useState({});

  const handleDropZoneUpdate = (dropZoneId, draggableId) => {
  setDropZoneInfo(prevInfo => {
    if (dropZoneId === null) {
      const updatedInfo = { ...prevInfo };
      delete updatedInfo[draggableId];
      return updatedInfo;
    } else {
      return {
        ...prevInfo,
        [draggableId]: dropZoneId
      };
    }
  });
};


 const [submittedData, setSubmittedData] = useState('');
 const [isFileTextSubmitted, setIsFileTextSubmitted] = useState(false);


  const handleSubmission  = (data) => {
   setSubmittedData(data);
   if(data){
     setIsFileTextSubmitted(true);
    }
   };


   const [areDimensionsSubmitted, setAreDimensionsSubmitted] = useState(false);

   const handleDropDivInfoSubmission = () => {
     setAreDimensionsSubmitted(true);
  }


  const [areModifiersSubmitted, setAreModifiersSubmitted] = useState(false);

  const [isReadyToExport, setIsReadyToExport] = useState(false);


  const handleModifiersSubmitted = () => {
    setAreModifiersSubmitted(true);
    setIsReadyToExport(true);
 }

 const handleResetSubmittedData = () => {
     setSubmittedData("");
     setIsFileTextSubmitted(false);
     setTableData(null);
     setDropZoneInfo();

   };

   const handleResetDimensionsSubmitted = () => {
       setAreDimensionsSubmitted(false);
       setDropZoneInfo();
     };

     const handleResetModifiersSubmitted = () => {
         setAreModifiersSubmitted(false);
         setIsReadyToExport(false);
         setExportStl(false);
       };


const [exportStl, setExportStl]=useState(false);

  const handleExport = () => {
      setExportStl(true);
    };


  return (


    <>

    <Navbar
    isReadyCreate={isReadyCreate}
    />

    {!isReadyCreate && <HomePage />}

    {isReadyCreate && !submittedData && <Import
    onFileSelect={handleFileSelect}
    onTextChange={handleTextChange}
     />}


    {submittedData && !tableData && ( <ParseVertexData
    file={submittedData}
    onTableReady={handleTableData} />)}



    {submittedData && tableData && !areDimensionsSubmitted &&(
       <DragContainerComponent
         table={tableData}
         onDropZoneUpdate={handleDropZoneUpdate}
       />
     )}


     {areDimensionsSubmitted && <Sketch
       dropZoneInfo={dropZoneInfo}
       table={tableData}
       areModifiersSubmitted={areModifiersSubmitted}
       exportStl={exportStl}
      />}



    <SubmitButton
    onFileTextSubmission={handleSubmission}
    onDropDivInfoSubmission={handleDropDivInfoSubmission}
    file={uploadedFile}
    text={inputText}
    isFileTextSubmitted={isFileTextSubmitted}
    areDimensionsSubmitted={areDimensionsSubmitted}
    onModifiersSubmission={handleModifiersSubmitted}
    isReadyToExport={isReadyToExport}
    onReadyToExport={handleExport}
    isReadyCreate={isReadyCreate}
    onCreate={handleCreate}

    />


    <BackButton
     onResetSubmittedData={handleResetSubmittedData}
     isFileTextSubmitted={isFileTextSubmitted}
     areDimensionsSubmitted={areDimensionsSubmitted}
     areModifiersSubmitted={areModifiersSubmitted}
     onModifiersSubmission={handleModifiersSubmitted}
     onResetDimensionSubmitted={handleResetDimensionsSubmitted}
     onResetModifiersSubmitted={handleResetModifiersSubmitted}
     isReadyCreate={isReadyCreate}
     onResetCreate={handleResetCreate}

    />

    <div className="bg-image"  >

    </div>


    </>


  );
}

export default App;
