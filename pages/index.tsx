import { Nemonemo } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Nemo from "../components/Nemo";
import Palette from "../components/Palette";
import { getDatesInRange } from "../libs/getDatesInRange";
interface Icolor {
  hex: string;
}

const Home: NextPage = () => {
  const [color, setColor] = useState({ hex: "#50d71e" });
  const [nemoDatas, setNemoDatas] = useState<Nemonemo[]>([]);
  const [termDays, setTermDays] = useState<Date[]>([]);

  const handleChange = (color: Icolor) => {
    console.log(color.hex);
    setColor(color);
    console.log(termDays[1]);
    console.log(typeof termDays[1]);
  };
  useEffect(() => {
    const startDate = new Date("2022-05-10");
    const endDate = new Date("2022-05-15");
    setTermDays(getDatesInRange(startDate, endDate));
    fetch(`api/1/${startDate}/${endDate}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.nemoDatas);
        setNemoDatas(data.nemoDatas);
      });
  }, []);

  // get Data 1 month
  const todayDate = new Date(20220101);
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Palette color={color} handler={handleChange} />
      <div className="p-5">
        {color && nemoDatas ? (
          <div className="grid grid-cols-10 md:grid-cols-14 gap-1">
            {/* {[...Array(100).keys()].map((_, i) => (
              <Nemo key={i} date={todayDate} color={color} />
            ))} */}
            {/* {nemoDatas.map((nemoData) => (
              <Nemo
                key={nemoData.id}
                date={nemoData.createAt}
                color={{ hex: nemoData.color }}
              />
            ))} */}
            {/* 日付のリストを作成 */}
            {termDays.map((termDay, i) => (
              <Nemo key={i} date={termDay} color={color} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
