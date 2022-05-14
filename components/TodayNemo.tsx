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
    <>
      <div
        className="borderborder-neutral-500 w-10 h-10 "
        style={{
          backgroundColor: nemoData ? nemoData.color : color.hex,
        }}
      />
    </>
  );
}
