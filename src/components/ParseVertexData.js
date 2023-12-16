import React, { useEffect } from "react";

function ParseVertexData(props) {
  console.log(props.file);
  const lines = props.file.split(/\r?\n/);
  const table = [];

  // Function to determine the delimiter
  function determineDelimiter(line) {
    const delimiters = [",", ";", "|","\t"];
    return delimiters.find(delimiter => line.includes(delimiter));
  }

  // Find the delimiter from the first non-empty line
  const firstLine = lines.find(line => line.trim() !== "");
  const delimiter = determineDelimiter(firstLine) || ";"; // Default to comma if none found

  // Check if the delimiter is not a comma
  const shouldReplaceComma = delimiter !== ",";

  for (let line of lines) {
    line = line.trim();
    if (line === "") continue;

    // Replace commas with periods if the delimiter is not a comma
    if (shouldReplaceComma) {
      line = line.replace(/,/g, '.');
    }

    const coordinates = line.split(delimiter);
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
