import { Nemonemo } from "@prisma/client";
import { useEffect, useState } from "react";
import ShowDate from "./ShowDate";

interface Icolor {
  hex: string;
}
interface INemoProps {
  date: Date;
  color?: Icolor;
  setNemoDetail: any;
  className?: string;
}

export default function Nemo(props: INemoProps) {
  const { date, color, setNemoDetail, className } = props;
  const [nemoData, setNemoData] = useState<Nemonemo>();
  const [showNemoDate, setShowNemoDate] = useState<Boolean>(false);
  const onMouseOverHandler = () => {
    setShowNemoDate(true);
  };
  const onClickHandler = () => {
    setNemoDetail(nemoData);
  };
  const onMouseLeaveHandler = () => {
    setShowNemoDate(false);
  };
  useEffect(() => {
    // Clear datetime
    const tomorrow = new Date(date.setHours(0, 0, 0, 0));
    tomorrow.setDate(tomorrow.getDate() + 1);

    fetch(`api/1/${date}/${tomorrow}`)
      .then((res) => res.json())
      .then((data) => {
        setNemoData(data.nemoDatas[0]);
      });
  }, [date]);

  return (
    // Today && no Data = bouncing Nemo
    <div
      className={`relative hover:scale-105 transition-transform ${
        className && !nemoData ? className : ""
      } `}
    >
      {showNemoDate ? <ShowDate nemoDate={date} /> : null}
      <div
        onMouseLeave={onMouseLeaveHandler}
        onMouseOver={onMouseOverHandler}
        onClick={onClickHandler}
        className="borderborder-neutral-500 h-8 sm:h-10 cursor-pointer"
        style={{
          backgroundColor: nemoData
            ? nemoData.color
            : color
            ? color.hex
            : "#dfdfdf",
        }}
      />
    </div>
  );
}
