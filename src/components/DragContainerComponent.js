import React from 'react';
import DraggableComponent from './DraggableComponent';
import DropZoneComponent from './DropZoneComponent';

const DragContainerComponent = ({ table, onDropZoneUpdate }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary for the drop event to fire
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggableId = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggableId);

    if (draggedElement && event.target.classList.contains("droppable")) {
      event.target.appendChild(draggedElement);
      onDropZoneUpdate(event.target.id, draggableId);
    }
  };

  return (

    <div className="height-window mx-5">

    <div className = "row d-flex align-items-center height-window mx-0">

      <div className= "col-md-4 ">

      {table && table[0] && table[0].map((item, index) => (
        <DraggableComponent
          key={`${index}`}
          id={`${index}`}
          content={item}
          onDragStart={handleDragStart}
        />
      ))}

        </div>


      <div className= "col-md-4 dropzones">

      <p> Z Axis </p>
            <DropZoneComponent
              id="dropzone1"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />

      </div>


      <div className= "col-md-4 dropzones">
      <p> X Axis </p>
            <DropZoneComponent
              id="dropzone2"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
      </div>

    </div>
  </div>

  );
};

export default DragContainerComponent;
