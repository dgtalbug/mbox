import React, { useEffect, useReducer } from "react";
import "./App.css";
import { IconContext } from "react-icons";
import Control from "./components/controls/Control";
import Arena from "./components/arena/Arena";
import { BoxContext } from "./context/Context";
import reducer from "./context/reducer";
const { innerWidth: width, innerHeight: height } = window;
const initialState = {
  boxCount: 0,
  boxes: [],
  fence: false,
  containerWidth: width,
  containerHeight: height,
  fenceValue: 100,
  boxDimension: 100,
  containerBottom: 0,
  xPos: 0,
  yPos: 0,
  zPos: 9,
  isBoxSelected: false,
  selectedBox: null,
  isW: false,
  isS: false,
  isA: false,
  isD: false,
  A: 65,
  D: 68,
  S: 83,
  W: 87,
  DELETE: 8,
  fenceTop: 0,
  fenceLeft: 0,
  fenceDown: 0,
  fenceRight: 0,
  boxTop: 0,
  boxLeft: 0,
  boxRight: 0,
  boxBottom: 0,
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BoxContext.Provider value={{ state, dispatch }}>
      <IconContext.Provider value={{ style: { marginTop: "-2px" } }}>
        <div className="App">
          <Arena />
          <Control />
        </div>
      </IconContext.Provider>
    </BoxContext.Provider>
  );
}

export default App;
