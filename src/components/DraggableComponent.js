import React from "react";

const DraggableComponent = ({ id, content, onDragStart, onDragEnd }) => (
  <div
    id={id}
    draggable
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    className="draggable"
  >
    {content}
  </div>
);

export default DraggableComponent;
