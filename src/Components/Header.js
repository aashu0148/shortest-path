import React, { useEffect, useRef, useState } from "react";
import RemoveIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddIcon from "@material-ui/icons/AddBox";

import { boxSize, endColor, startColor, wallColor } from "../common/config";

let timer;
function Header(props) {
  const head = useRef();

  const [rowValue, setRowValue] = useState(props.row);
  const [colValue, setColValue] = useState(props.col);

  const minDimensions = {
    row: 5,
    col: 5,
  };
  const [maxDimensions, setMaxDimensions] = useState({
    row: 5,
    col: 5,
  });

  const init = () => {
    if (!head.current) return;
    let row = Math.floor(
      (window.innerHeight - head.current.clientHeight - 2 * boxSize) /
        (boxSize + 6)
    );
    let col = Math.floor(window.innerWidth / (boxSize + 8));
    if (row < 5) row = 5;
    if (col < 5) col = 5;
    props.setDimesions({ row, col });
    setMaxDimensions({ row, col });
  };

  const addCol = () => {
    if (props.col < maxDimensions.col)
      props.setDimesions({ row: props.row, col: props.col + 1 });
  };
  const removeCol = () => {
    if (props.col > minDimensions.col)
      props.setDimesions({ row: props.row, col: props.col - 1 });
  };
  const addRow = () => {
    if (props.row < maxDimensions.row)
      props.setDimesions({ row: props.row + 1, col: props.col });
  };
  const removeRow = () => {
    if (props.row > minDimensions.row)
      props.setDimesions({ row: props.row - 1, col: props.col });
  };

  useEffect(() => {
    if (maxDimensions.row >= rowValue && rowValue >= minDimensions.row)
      props.setDimesions({ row: rowValue, col: props.col });
  }, [rowValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (maxDimensions.col >= colValue && colValue >= minDimensions.col)
      props.setDimesions({ row: props.row, col: colValue });
  }, [colValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setRowValue(props.row);
  }, [props.row]);
  useEffect(() => {
    setColValue(props.col);
  }, [props.col]);

  useEffect(() => {
    init();
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(init, 130);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={head} style={{ borderBottom: "1px solid #4babe136" }}>
      <h2 style={{ textAlign: "center" }}>Shortest path finder</h2>
      <br />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Rows</h3>
          <p style={{ display: "flex", alignItems: "center" }}>
            {/* <label>{props.row}</label> */}
            <input
              className="input-box"
              type="tel"
              value={rowValue}
              onChange={(e) => setRowValue(e.target.value)}
            />
            <RemoveIcon onClick={removeRow} style={{ cursor: "pointer" }} />
            <AddIcon onClick={addRow} style={{ cursor: "pointer" }} />
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Columns</h3>
          <p style={{ display: "flex", alignItems: "center" }}>
            {/* <label>{props.col}</label> */}
            <input
              className="input-box"
              type="tel"
              value={colValue}
              onChange={(e) => setColValue(e.target.value)}
            />
            <RemoveIcon onClick={removeCol} style={{ cursor: "pointer" }} />
            <AddIcon onClick={addCol} style={{ cursor: "pointer" }} />
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <span
          className="tag"
          onClick={() => props.setTag("start")}
          style={{
            backgroundColor: props.tag === "start" ? startColor : "#fff",
            color: props.tag === "start" ? "#fff" : "#000",
          }}
        >
          Start
        </span>
        <span
          className="tag"
          onClick={() => props.setTag("end")}
          style={{
            backgroundColor: props.tag === "end" ? endColor : "#fff",
            color: props.tag === "end" ? "#fff" : "#000",
          }}
        >
          End
        </span>
        <span
          className="tag"
          onClick={() => props.setTag("wall")}
          style={{
            backgroundColor: props.tag === "wall" ? wallColor : "#fff",
            color: props.tag === "wall" ? "#fff" : "#000",
          }}
        >
          Wall
        </span>

        <button className="button">Search</button>
        <button className="button">Reset</button>
      </div>
    </div>
  );
}

export default Header;
