import React, { useState } from 'react';

const DropZoneComponent = ({ id, onDrop, onDragOver, onDropUpdate }) => (
<>

{ id === "dropzone1" ? <p style={{ marginBottom: '0.3rem' }}> Z Axis </p> : <p style={{ marginBottom: '0.3rem' }}> X Axis </p> }

  <div
    id={id}
    onDrop={(event) => {

      event.preventDefault();
      if (typeof onDrop === 'function') {
        onDrop(event);

      }
      const draggableId = event.dataTransfer.getData("text/plain");
      if (typeof onDropUpdate === 'function') {
        onDropUpdate(id, draggableId);
      }
    }}
    onDragOver={onDragOver}
    className={`droppable ${id === "dropzone2" ? "padding-bottom" : ""}`}
  >


  </div>
</>
);




export default DropZoneComponent;
