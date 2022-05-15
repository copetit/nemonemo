import { Nemonemo } from "@prisma/client";
import { useEffect, useState } from "react";

interface Icolor {
  hex: string;
}
interface INemoProps {
  date: Date;
  color: Icolor;
}

export default function TodayNemo(props: INemoProps) {
  const { date, color } = props;
  const [nemoData, setNemoData] = useState<Nemonemo>();
  const handler = () => {
    console.log(nemoData);
  };
  useEffect(() => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    fetch(`api/1/${date}/${tomorrow}`)
      .then((res) => res.json())
      .then((data) => {
        setNemoData(data.nemoDatas[0]);
      });
  }, [date]);

  return (
    <>
      <div
        onClick={handler}
        className="borderborder-neutral-500 w-10 h-10 cursor-pointer border-4 border-red-400"
        style={{
          backgroundColor: nemoData ? nemoData.color : color.hex,
        }}
      />
    </>
  );
}
