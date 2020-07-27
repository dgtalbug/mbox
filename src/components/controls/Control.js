import React, { useState, useContext, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BsPlusSquare,
  BsChevronCompactUp,
  BsChevronCompactDown,
  BsChevronCompactLeft,
  BsChevronCompactRight,
} from "react-icons/bs";
import { BoxContext } from "../../context/Context";
import { FENCESTATUS, ADDBOX } from "../../context/actions";
import { v4 as uuidv4 } from "uuid";

function Control() {
  const { state, dispatch } = useContext(BoxContext);
  const { selectedKey, W, A, S, D } = state;
  const [fence, setFence] = useState(false);
  const [fenceBottom, setFenceBottom] = useState(0);
  const [fenceRight, setFenceRight] = useState(0);
  const {
    containerWidth,
    containerHeight,
    boxDimension,
    fenceValue,
    boxCount,
  } = state;
  const [containerBottom, setContainerBottom] = useState(0);
  useEffect(() => {
    const getFenceDimensions = document
      .getElementById("fence")
      .getBoundingClientRect();
    const { bottom, right } = getFenceDimensions;
    setFenceBottom(bottom);
    setFenceRight(right);
    return () => {};
  }, []);
  const handleClick = () => {
    dispatch({
      type: FENCESTATUS,
      payload: !fence,
    });
    setFence(!fence);
  };

  const xPosValue = () => {
    const maxPos = Math.ceil(containerWidth);
    const randXPos = Math.floor(Math.random() * maxPos);
    const parity = fence ? boxDimension + fenceValue : boxDimension;
    const xPosValue = randXPos < parity ? parity + randXPos : randXPos - parity;
    return xPosValue;
  };

  const yPosValue = () => {
    const maxPos = Math.ceil(containerHeight);
    const randYPos = Math.floor(Math.random() * maxPos);
    const parity = fence
      ? boxDimension + fenceValue + containerBottom
      : boxDimension + containerBottom;
    const yPosValue = randYPos < parity ? parity + randYPos : randYPos - parity;
    return yPosValue;
  };

  const zPosValue = () => {
    const zPosValue = Math.pow(10, boxCount) - 1;
    return zPosValue;
  };

  const handleAddButton = () => {
    setContainerBottom(document.getElementById("navbar").offsetHeight);

    const box = {
      id: uuidv4(),
      xPos: xPosValue(),
      yPos: yPosValue(),
      zPos: zPosValue(),
      boxNo: boxCount,
      isSelected: false,
    };
    dispatch({
      type: ADDBOX,
      payload: box,
    });
  };
  return (
    <div id="navbar">
      <Navbar bg="light" variant="light" sticky="bottom" className="p-4">
        <Navbar.Brand href="#home">MBOX</Navbar.Brand>
        <Nav className="mr-auto">
          <Button variant="success" className="mr-4" onClick={handleAddButton}>
            ADD <BsPlusSquare />
          </Button>
          <Button
            variant={selectedKey === W ? "secondary" : "outline-secondary"}
            size="lg"
            className="mr-1"
          >
            W <BsChevronCompactUp />
          </Button>
          <Button
            variant={selectedKey === S ? "secondary" : "outline-secondary"}
            size="lg"
            className="mr-1"
          >
            S <BsChevronCompactDown />
          </Button>
          <Button
            variant={selectedKey === A ? "secondary" : "outline-secondary"}
            size="lg"
            className="mr-1"
          >
            A <BsChevronCompactLeft />
          </Button>
          <Button
            variant={selectedKey === D ? "secondary" : "outline-secondary"}
            size="lg"
            className="mr-1"
          >
            D <BsChevronCompactRight />
          </Button>

          <div
            className="custom-control custom-switch"
            style={{ marginTop: "10px", paddingLeft: "5rem" }}
          >
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitchesChecked"
              checked={fence}
              onChange={handleClick}
            />
            <label
              className="custom-control-label"
              htmlFor="customSwitchesChecked"
            >
              FENCE
            </label>
          </div>
          {fenceBottom}
          {fenceRight}
        </Nav>

        <Button variant="outline-secondary" className="mr-2">
          Box: {boxCount}
        </Button>
        {fence ? (
          <Button variant="danger" className="mr-2">
            Fence Activated
          </Button>
        ) : (
          " "
        )}
      </Navbar>
    </div>
  );
}

export default Control;
