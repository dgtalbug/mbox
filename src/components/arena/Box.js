import React, { useState, useContext, useEffect } from "react";
import { BoxContext } from "../../context/Context";
import { SELECTEDBOX, SELECTEDKEY, DELETEBOX } from "../../context/actions";

export default function Box(props) {
  const { state, dispatch } = useContext(BoxContext);
  const [fenceBottom, setFenceBottom] = useState(0);
  const [fenceRight, setFenceRight] = useState(0);
  const [boxTop, setBoxTop] = useState(0);
  const [boxLeft, setBoxLeft] = useState(0);
  const [boxBottom, setBoxBottom] = useState(0);
  const [boxRight, setBoxRight] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);

  const {
    fence,
    fenceValue,
    boxDimension,
    selectedBox,
    W,
    S,
    A,
    D,
    DELETE,
    fenceTop,
    fenceLeft,
  } = state;
  const { id, xPos, yPos, zPos, boxNo } = props.box;
  const BoxSelected = selectedBox === id ? "M-BoxSelected" : "";
  useEffect(() => {
    //
    return () => {};
  }, []);
  const currentBox = document.getElementById(selectedBox);
  const handleMoveup = () => {
    if (boxTop - boxDimension > fenceTop) {
      setBoxTop(boxTop - boxDimension);
      currentBox.style.top = boxTop - boxDimension + "px";
    } else if (boxTop > fenceTop) {
      currentBox.style.top = 0 + "px";
    }
  };
  const handleMoveLeft = () => {
    if (boxLeft - boxDimension > fenceLeft) {
      setBoxLeft(boxLeft - boxDimension);
      currentBox.style.left = boxLeft - boxDimension + "px";
    } else if (boxLeft > fenceLeft) {
      currentBox.style.left = 0 + "px";
    }
  };
  const handleMoveRight = () => {
    if (boxLeft + 200 < fenceRight) {
      setBoxLeft(boxLeft + boxDimension);
      currentBox.style.left = boxLeft + boxDimension + "px";
    } else if (boxLeft < fenceRight) {
      setBoxLeft(fenceRight - boxDimension);
      currentBox.style.left = fenceRight - boxDimension + "px";
    }
  };
  const handleMoveBottom = () => {
    if (boxTop + 200 < fenceBottom) {
      setBoxTop(boxTop + boxDimension);
      currentBox.style.top = boxTop + boxDimension + "px";
    } else if (boxTop < fenceBottom) {
      setBoxLeft(fenceBottom - boxDimension);
      currentBox.style.top = fenceBottom - boxDimension + "px";
    }
  };
  const handleKeyUp = (event) => {
    event.persist();
    setSelectedKey(event.keyCode);
    const getFenceDimensions = document
      .getElementById("fence")
      .getBoundingClientRect();
    const { bottom, right } = getFenceDimensions;
    setFenceBottom(bottom);
    setFenceRight(right);
    currentBox.style.transition = "all 0.2s ease";
    dispatch({
      type: SELECTEDKEY,
      payload: event.keyCode,
    });
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
        return dispatch({
          type: DELETEBOX,
          payload: id,
        });

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
      style={{
        position: "absolute",
        top: yPos,
        left: xPos,
        zIndex: zPos,
      }}
      onClick={handleBoxClick}
      tabIndex="0"
      onKeyUp={handleKeyUp.bind(this)}
      // onKeyPressCapture={handleKeyUp.bind(this)}
    >
      <p className="text-center">{boxNo}</p>
    </div>
  );
}
