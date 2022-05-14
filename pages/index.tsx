import { Nemonemo } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Nemo from "../components/Nemo";
import Palette from "../components/Palette";
import TodayNemo from "../components/TodayNemo";
import { getDatesInRange } from "../libs/getDatesInRange";
interface Icolor {
  hex: string;
}

const Home: NextPage = () => {
  const [color, setColor] = useState({ hex: "#c3c3c3" });
  const [nemoDatas, setNemoDatas] = useState<Nemonemo[]>([]);
  const [termDays, setTermDays] = useState<Date[]>([]);
  const TodayDate = new Date();
  const handleChange = (color: Icolor) => {
    setColor(color);
  };

  useEffect(() => {
    const startDate = new Date("2022-05-01");
    const TodayDate = new Date();
    const yesterday = new Date(TodayDate);
    yesterday.setDate(yesterday.getDate() - 1);
    setTermDays(getDatesInRange(startDate, yesterday));
    fetch(`api/1/${startDate}/${TodayDate}`)
      .then((res) => res.json())
      .then((data) => {
        setNemoDatas(data.nemoDatas);
      });
  }, []);

  // get Data 1 month
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Palette color={color} handler={handleChange} />
      <div className="p-5">
        {color && nemoDatas ? (
          <div className="grid grid-cols-10 md:grid-cols-14 gap-1">
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
            <TodayNemo date={TodayDate} color={color} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
