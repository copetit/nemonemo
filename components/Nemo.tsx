import { Nemonemo } from "@prisma/client";
import { useEffect, useState } from "react";
import ShowDate from "./showDate";

interface Icolor {
  hex: string;
}
interface INemoProps {
  date: Date;
  color?: Icolor;
  setNemoDetail: any;
}

export default function Nemo(props: INemoProps) {
  const { date, color, setNemoDetail } = props;
  const [nemoData, setNemoData] = useState<Nemonemo>();
  const [showNemoDate, setShowNemoDate] = useState<Boolean>(false);
  const onMouseOverHandler = () => {
    setShowNemoDate(true);
  };
  const onClickHandler = () => {
    console.log(nemoData);
    setNemoDetail(nemoData);
  };
  const onMouseLeaveHandler = () => {
    setShowNemoDate(false);
  };
  useEffect(() => {
    // time clear
    const tomorrow = new Date(date.setHours(0, 0, 0, 0));
    tomorrow.setDate(tomorrow.getDate() + 1);

    fetch(`api/1/${date}/${tomorrow}`)
      .then((res) => res.json())
      .then((data) => {
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
        className="borderborder-neutral-500 h-10 cursor-pointer"
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
