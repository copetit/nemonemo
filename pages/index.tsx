import type { NextPage } from "next";
import { useState } from "react";
import Nemo from "../components/Nemo";
import Palette from "../components/Palette";

const Home: NextPage = () => {
  const [color, setColor] = useState({ hex: "#50d71e" });
  const handleChange = (color: any) => {
    console.log("fuga");
    console.log(color.hex);
    setColor(color);
  };
  // get Data 1 month
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Palette color={color} handler={handleChange} />
      <div className="p-5">
        {color ? (
          <div className="grid grid-cols-10 md:grid-cols-14 gap-1">
            {[...Array(100).keys()].map((_, i) => (
              <Nemo key={i} date={i} color={color} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
