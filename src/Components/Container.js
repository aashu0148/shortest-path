import React, { useEffect, useState } from "react";

import Box from "./Box";

function Container(props) {
  const [mouseDown, setMouseDown] = useState(false);
  const [arr, setArr] = useState([]);

  const result = [];
  if (arr.length > 0)
    for (let i = 0; i < arr.length; ++i) {
      for (let j = 0; j < arr[0].length; ++j) {
        result.push(
          <Box
            key={i + "_" + j}
            arr={arr}
            setArr={setArr}
            i={i}
            j={j}
            tag={props.tag}
            mouseDown={mouseDown}
            setMouseDown={setMouseDown}
            wall={arr[i][j] === 1}
            start={arr[i][j] === -1}
            end={arr[i][j] === 2}
          />
        );
      }
      result.push(<br key={i + "_"} />);
    }

  useEffect(() => {
    if (!(props.row === 0 || props.col === 0))
      setArr(new Array(props.row).fill().map((_) => Array(props.col).fill(0)));
  }, [props.row, props.col]);

  useEffect(() => {
    window.addEventListener("mouseup", () => {
      setMouseDown(false);
    });
  }, []);

  return (
    <div>
      <div
        className="container"
        style={{ textAlign: "center", padding: "20px 10px" }}
      >
        {result}
      </div>
    </div>
  );
}

export default Container;
