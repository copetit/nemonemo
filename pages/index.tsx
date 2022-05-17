import { Nemonemo } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Nemo from "../components/Nemo";
import Palette from "../components/Palette";
import { getDatesInRange } from "../libs/getDatesInRange";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";

interface Icolor {
  hex: string;
}
interface INemoForm {
  userId: string;
  color: string;
  memo: string;
}

const Home: NextPage = () => {
  const [color, setColor] = useState({ hex: "#c3c3c3" });
  const [nemoDatas, setNemoDatas] = useState<Nemonemo[]>([]);
  const [termDays, setTermDays] = useState<Date[]>([]);
  const [gridGap, setGridGap] = useState(1);
  const TodayDate = new Date();

  const handleChange = (color: Icolor) => {
    setColor(color);
  };

  const gridGapHandler = () => {
    if (gridGap === 1) {
      setGridGap(0);
    } else {
      setGridGap(1);
    }
  };

  // useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INemoForm>({
    mode: "onChange",
  });
  const isValid: SubmitHandler<INemoForm> = (data: INemoForm) => {
    fetch(`api/1/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
  };
  const isInValid: SubmitErrorHandler<INemoForm> = (errors: any) => {
    console.log("失敗");
    console.log(errors);
  };

  // get Datas dateRange
  useEffect(() => {
    const startDate = new Date("2022-01-01");
    const TodayDate = new Date();
    TodayDate.setHours(0, 0, 0, 0);
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
      <div className="p-5">
        <button onClick={gridGapHandler}>NEMO</button>
        {color && nemoDatas ? (
          <div className={`grid grid-cols-10 md:grid-cols-14 gap-${gridGap}`}>
            {/* 日付のリストを作成 */}
            {termDays.map((termDay, i) => (
              <Nemo key={i} date={termDay} />
            ))}
            <Nemo date={TodayDate} color={color} />
          </div>
        ) : null}
      </div>
      <Palette color={color} handler={handleChange} />
      <div className="mt-1 font-semibold text-rose-500">
        {errors.color?.message}
      </div>
      <form onSubmit={handleSubmit(isValid, isInValid)}>
        <input
          {...register("color", {
            validate: (value) =>
              value !== "#c3c3c3" || "色を選択してください。",
          })}
          className="border-2 hidden"
          // value={color.hex}
          name="color"
        />
        <textarea
          className="border-2"
          {...register("memo", { required: "メモを入力してください。" })}
          name="memo"
          rows={3}
        ></textarea>
        <div className="mt-1 font-semibold text-rose-500">
          {errors.memo?.message}
        </div>
        <button
          className="border-2"
          type="submit"
          onClick={() => setValue("color", color.hex)}
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default Home;
