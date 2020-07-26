import React, { useState, useContext, useEffect } from "react";
import { BoxContext } from "../../context/Context";
import { SELECTEDBOX } from "../../context/actions";

export default function Box(props) {
  const { state, dispatch } = useContext(BoxContext);
  const [fenceBottom, setFenceBottom] = useState(0);
  const [fenceRight, setFenceRight] = useState(0);
  const [boxTop, setBoxTop] = useState(0);
  const [boxLeft, setBoxLeft] = useState(0);
  const [boxBottom, setBoxBottom] = useState(0);
  const [boxRight, setBoxRight] = useState(0);
  const { selectedBox, W, S, A, D, DELETE, fenceTop, fenceLeft } = state;
  const { id, xPos, yPos, zPos, isSelected } = props;
  const BoxSelected = selectedBox === id ? "M-BoxSelected" : "";
  useEffect(() => {
    const getFenceDimensions = document
      .getElementById("fence")
      .getBoundingClientRect();
    const { bottom, right } = getFenceDimensions;
    setFenceBottom(bottom);
    setFenceRight(right);
    return () => {};
  }, []);
  const currentBox = document.getElementById(selectedBox);
  const handleMoveup = () => {
    if (boxTop - 10 > fenceTop) {
      currentBox.style.top = boxTop - 10 + "px";
    }
  };
  const handleMoveLeft = () => {
    if (boxLeft - 10 > fenceLeft) {
      currentBox.style.left = boxLeft - 10 + "px";
    }
  };
  const handleMoveRight = () => {
    if (boxRight + 10 > fenceRight) {
      currentBox.style.right = boxRight + 10 + "px";
    }
  };
  const handleMoveBottom = () => {
    if (boxBottom + 10 > fenceBottom) {
      currentBox.style.top = boxBottom + 10 + "px";
    }
  };
  const handleKeyUp = (event) => {
    // event.persist();
    switch (event.keyCode) {
      case W:
        return handleMoveup();
      case A:
        return handleMoveLeft();
      case S:
        return handleMoveBottom();
      case D:
        return handleMoveRight();
      case DELETE:
        return console.log(event.keyCode);

      default:
        return console.log(event.keyCode);
    }
  };
  const handleBoxClick = () => {
    const getBoxDimensions = document
      .getElementById(id)
      .getBoundingClientRect();
    const { bottom, right, top, left } = getBoxDimensions;
    setBoxTop(top);
    setBoxLeft(left);
    setBoxBottom(bottom);
    setBoxRight(right);

    dispatch({
      type: SELECTEDBOX,
      payload: id,
    });
  };
  return (
    <div
      className={"M-Box " + BoxSelected}
      id={id}
      style={{ position: "absolute", top: yPos, left: xPos, zIndex: zPos }}
      onClick={handleBoxClick}
      tabIndex="0"
      onKeyDown={handleKeyUp.bind(this)}
      onKeyPressCapture={handleKeyUp.bind(this)}
    >
      x:{yPos}
      <br></br>
      y:{xPos}
      <br></br>
      {isSelected}
    </div>
  );
}
