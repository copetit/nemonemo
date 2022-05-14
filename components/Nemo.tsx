import { Nemonemo } from "@prisma/client";
import { useEffect, useState } from "react";
import ShowDate from "./showDate";

interface Icolor {
  hex: string;
}
interface INemoProps {
  date: Date;
  color: Icolor;
}

export default function Nemo(props: INemoProps) {
  const { date, color } = props;
  const [nemoData, setNemoData] = useState<Nemonemo>();
  const [showNemoDate, setShowNemoDate] = useState<Boolean>(false);
  const onMouseOverHandler = () => {
    console.log(date);
    setShowNemoDate(true);
  };
  const onClickHandler = () => {
    console.log(nemoData);
  };
  const onMouseLeaveHandler = () => {
    setShowNemoDate(false);
  };
  useEffect(() => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    fetch(`api/1/${date}/${tomorrow}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.nemoDatas?.[0]?.color);
        setNemoData(data.nemoDatas[0]);
      });
  }, [date]);

  return (
    <div className="relative">
      {showNemoDate ? <ShowDate nemoDate={date} /> : null}
      {/* <ShowDate nemoDate={date} /> */}
      <div
        onMouseLeave={onMouseLeaveHandler}
        onMouseOver={onMouseOverHandler}
        onClick={onClickHandler}
        className="borderborder-neutral-500 w-10 h-10 cursor-pointer"
        style={{
          backgroundColor: nemoData ? nemoData.color : "#c3c3c3",
        }}
      />
    </div>
  );
}
