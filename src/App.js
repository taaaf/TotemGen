import React, { useState, useEffect } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

import "./App.css"

import Navbar from "./components/Navbar";
import Sketch from "./components/Sketch";
import Import from "./components/Import";
import SubmitButton from "./components/SubmitButton";
import BackButton from './components/BackButton';
import ParseVertexData from "./components/ParseVertexData";
import DragContainerComponent from './components/DragContainerComponent';



export function App() {

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
     setDropZoneInfo(prevInfo => ({
       ...prevInfo,
       [draggableId]: dropZoneId
     }));

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

  const handleModifiersSubmitted = () => {
    setAreModifiersSubmitted(true);
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
       };


useEffect(() => {
 console.log(dropZoneInfo);
  }, [dropZoneInfo]);

  return (


    <>

    <Navbar / >



    {!submittedData && <Import
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
      />}



    <SubmitButton
    onFileTextSubmission={handleSubmission}
    onDropDivInfoSubmission={handleDropDivInfoSubmission}
    file={uploadedFile}
    text={inputText}
    isFileTextSubmitted={isFileTextSubmitted}
    areDimensionsSubmitted={areDimensionsSubmitted}
    onModifiersSubmission={handleModifiersSubmitted}
    />


    <BackButton
     onResetSubmittedData={handleResetSubmittedData}
     isFileTextSubmitted={isFileTextSubmitted}
     areDimensionsSubmitted={areDimensionsSubmitted}
     areModifiersSubmitted={areModifiersSubmitted}
     onModifiersSubmission={handleModifiersSubmitted}
     onResetDimensionSubmitted={handleResetDimensionsSubmitted}
     onResetModifiersSubmitted={handleResetModifiersSubmitted}

    />





    </>


  );
}

export default App;
