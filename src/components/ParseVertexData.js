import React, { useEffect } from "react";

function ParseVertexData(props) {
  console.log(props.file);
  const lines = props.file.split(/\r?\n/);
  const table = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    const coordinates = line.split(/[,|;]/);
    table.push(coordinates);
  }

  useEffect(() => {
    if (props.onTableReady) {
      props.onTableReady(table);
    }
  }, [props]);
  return table;
}

export default ParseVertexData;
