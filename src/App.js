import React, { useState } from "react";

import Container from "./Components/Container";
import Header from "./Components/Header";
import "./App.css";

function App() {
  const [dimensions, setDimesions] = useState({
    row: 0,
    col: 0,
  });

  const [tag, setTag] = useState("wall");
  return (
    <div className="App">
      <Header
        row={dimensions.row}
        col={dimensions.col}
        setDimesions={setDimesions}
        tag={tag}
        setTag={setTag}
      />
      <Container tag={tag} row={dimensions.row} col={dimensions.col} />
    </div>
  );
}

export default App;
