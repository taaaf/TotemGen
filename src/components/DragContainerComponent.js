import React from 'react';
import DraggableComponent from './DraggableComponent';
import DropZoneComponent from './DropZoneComponent';

const DragContainerComponent = ({ table, onDropZoneUpdate }) => {

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
  event.preventDefault();
  const draggableId = event.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(draggableId);

  const isZAxis = event.target.id === 'dropzone1';
  const hasChild = event.target.children.length > 0;

  if (draggedElement && event.target.classList.contains("droppable") && (!isZAxis || !hasChild)) {
    event.target.appendChild(draggedElement);
    onDropZoneUpdate(event.target.id, draggableId);
  }
  };


    const handleGeneralDrop = (event) => {
      event.preventDefault();
      const draggableId = event.dataTransfer.getData("text/plain");
      const draggedElement = document.getElementById(draggableId);

      if (draggedElement && event.target.classList.contains("general-dropzone")) {
        event.target.appendChild(draggedElement);
        onDropZoneUpdate(null, draggableId);
      }
    };

  return (

    <div className="container"> {/* Adds a bit of margin on the sides */}

     <div className="mx-5">

       <div className="row d-flex align-items-center height-window mx-0 general-dropzone">

       <div className="col-lg-1 col-xl-1">
       </div>

         <div className="col-lg-4 col-xl-3 box-draggable flex">

         <label className="p-2">
         DIMENSIONS SUBMITTED
         </label>

           <div className="general-dropzone dropzone-padding " onDrop={handleGeneralDrop} onDragOver={handleDragOver}>
             {table && table[0] && table[0].map((item, index) => (
               <DraggableComponent
                 key={`${index}`}
                 id={`${index}`}
                 content={item}
                 onDragStart={handleDragStart}
               />
             ))}
           </div>

         </div>

         <div className="col-lg-1 col-xl-1">
         </div>

         <div className="col-lg-5 col-xl-6  box-droppable">

         <label className="p-2">
         VARIABLES
         </label>


           <div className="row px-4 mt-2">

             <div className="col-lg-12 col-xl-5 dropzones">

               <div className="dropzone-container mt-3">
                 <DropZoneComponent id="dropzone1" onDrop={handleDrop} onDragOver={handleDragOver} />
               </div>
             </div>

             <div className="col-lg-2 col-xl-1">
             </div>

             <div className="col-lg-12 col-xl-5 dropzones mt-3">
               <div className="dropzone-container">
                 <DropZoneComponent id="dropzone2" onDrop={handleDrop} onDragOver={handleDragOver} />
               </div>
             </div>

           </div>
         </div>

       </div>

     </div>

   </div>

  );
};

export default DragContainerComponent;
