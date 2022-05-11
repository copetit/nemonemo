import type { NextPage } from "next";
import { CirclePicker } from "react-color";

export default function Palette(props: any) {
  const { color, handler } = props;
  console.log(color.hex);
  const colorArr = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  return (
    <CirclePicker
      color={color}
      onChange={handler}
      colors={colorArr}
      circleSpacing={10}
    />
  );
}
