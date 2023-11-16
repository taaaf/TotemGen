import React, { useState } from 'react';

const DropZoneComponent = ({ id, onDrop, onDragOver, onDropUpdate }) => (

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
    className="droppable"
  >

  </div>

);




export default DropZoneComponent;
