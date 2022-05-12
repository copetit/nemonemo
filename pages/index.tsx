import type { NextPage } from "next";
import { useState } from "react";
import Nemo from "../components/Nemo";
import Palette from "../components/Palette";

interface Icolor {
  hex: string;
}
const Home: NextPage = () => {
  const [color, setColor] = useState({ hex: "#50d71e" });
  const handleChange = (color: Icolor) => {
    console.log("fuga");
    console.log(color.hex);
    setColor(color);
  };
  // get Data 1 month
  const todayDate = new Date(20220101);
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Palette color={color} handler={handleChange} />
      <div className="p-5">
        {color ? (
          <div className="grid grid-cols-10 md:grid-cols-14 gap-1">
            {[...Array(100).keys()].map((_, i) => (
              <Nemo key={i} date={todayDate} color={color} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
