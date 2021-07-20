import React from "react";

import { boxSize } from "../common/config";
import { wallColor } from "../common/config";
import { startColor } from "../common/config";
import { endColor } from "../common/config";

function Box(props) {
  return (
    <span
      onClick={() => {
        const myArr = [...props.arr];
        const [i, j] = [props.i, props.j];
        const updateValue =
          props.tag === "start" ? -1 : props.tag === "end" ? 2 : 1;

        myArr[i][j] === updateValue
          ? (myArr[i][j] = 0)
          : (myArr[i][j] = updateValue);
        props.setArr(myArr);
      }}
      onMouseOver={() => {
        if (props.mouseDown && props.tag === "wall") {
          const myArr = [...props.arr];
          myArr[props.i][props.j] = 1;
          props.setArr(myArr);
        }
      }}
      onMouseDown={() => {
        props.setMouseDown(true);
      }}
      style={{
        border: "1px solid #000",
        height: `${boxSize}px`,
        width: `${boxSize}px`,
        margin: "1px 2px",
        display: "inline-block",
        transition: "200ms",
        backgroundColor: props.wall
          ? wallColor
          : props.start
          ? startColor
          : props.end
          ? endColor
          : "#fff",
      }}
    ></span>
  );
}

export default Box;
