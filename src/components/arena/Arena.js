import React, { useContext } from "react";
import useWindowDimensions from "../helpers/WindowHelper";
import { BoxContext } from "../../context/Context";
import BoxComponent from "../arena/Box";
export default function Arena() {
  const { width, height } = useWindowDimensions();
  const { state } = useContext(BoxContext);
  const { fence, boxes } = state;
  const containerWidth = width;
  const containerheight = height - 100;
  const containerPadding = fence ? "50px" : 0;
  const fenceWidth = fence ? containerWidth - 100 : containerWidth;
  const fenceheight = fence ? containerheight - 100 : containerheight;

  return (
    <div
      style={{
        width: containerWidth,
        height: containerheight,
        background: fence ? "#00695c" : "#004d40",
        padding: containerPadding,
        position: "relative",
      }}
    >
      <div
        id="fence"
        style={{
          width: fenceWidth,
          height: fenceheight,
          background: "#004d40",
          position: "relative",
        }}
        tabIndex="0"
      >
        {boxes
          ? boxes.map((box) => <BoxComponent key={box.id} box={box} />)
          : " "}
      </div>
    </div>
  );
}
