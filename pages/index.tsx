import type { NextPage } from "next";
import { useState } from "react";
import Palette from "../components/Palette";

const Home: NextPage = () => {
  const [color, setColor] = useState("#50d71e");
  const handleChange = (color: string) => {
    console.log("fuga");
    setColor(color);
  };
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Palette color={color} handler={handleChange} />
      <div className="bg-gray-200 p-5">
        <div className="grid grid-cols-10 md:grid-cols-14 gap-1">
          {[...Array(100).keys()].map((_, i) => (
            <div
              key={i}
              className={`borderborder-neutral-500 bg-[${color}] w-10 h-10 `}
            >
              <label
                htmlFor={`colorPick-${i}`}
                className="borderborder-neutral-500 bg-white cursor-pointer"
              >
                <div className="w-10 h-10" />
                <input
                  className="hidden"
                  id={`colorPick-${i}`}
                  type="color"
                  name="favorite_color"
                  value={color}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
