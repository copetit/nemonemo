import { CirclePicker } from "react-color";

export default function Palette(props: any) {
  const { color, handler } = props;
  const colorArr = [
    "#FFD07F",
    "#FFCE45",
    "#FDA65D",
    "#FF8243",
    "#FF7800",
    "#F90716",
    "#B3E8E5",
    "#82DBD8",
    "#3BACB6",
    "#226d9f",
    "#344CB7",
    "#14279B",
    "#FF82C3",
    "#C32BAD",
    "#A8FF3E",
    "#c3c3c3",
    "black",
  ];

  return (
    <CirclePicker
      color={color}
      onChangeComplete={handler}
      colors={colorArr}
      circleSpacing={10}
    />
  );
}
