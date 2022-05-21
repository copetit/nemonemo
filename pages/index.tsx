import { Nemonemo } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Nemo from "../components/Nemo";
import Palette from "../components/Palette";
import { getDatesInRange } from "../libs/getDatesInRange";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import NemoDetail from "../components/NemoDetail";
import { useRouter } from "next/router";

interface Icolor {
  hex: string;
}
interface INemoForm {
  userId: string;
  color: string;
  memo: string;
}

const Home: NextPage = () => {
  const [color, setColor] = useState({ hex: "#dfdfdf" });
  const [nemoDatas, setNemoDatas] = useState<Nemonemo[]>([]);
  const [termDays, setTermDays] = useState<Date[]>([]);
  const [gridGap, setGridGap] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [nemoDetail, setNemoDetail] = useState<Nemonemo>();
  const TodayDate = new Date();

  const changeHandler = (color: Icolor) => {
    setColor(color);
  };

  const clickHandler = (state: boolean) => {
    setShowInput(state);
  };

  const gridGapHandler = () => {
    setGridGap(!gridGap);
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
  const router = useRouter();

  const isValid: SubmitHandler<INemoForm> = (data: INemoForm) => {
    fetch(`api/1/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
    setShowInput(false);
    router.push("/");
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
        <button onClick={gridGapHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        </button>
        {color && nemoDatas && (
          <div
            className={`grid grid-cols-8 sm:grid-cols-10  md:grid-cols-10 lg:grid-cols-14 ${
              gridGap ? "gap-1" : ""
            }`}
          >
            {/* 日付のリストを作成 */}
            {termDays.map((termDay, i) => (
              <div key={i} onClick={() => clickHandler(false)}>
                <Nemo date={termDay} setNemoDetail={setNemoDetail} />
              </div>
            ))}

            <div onClick={() => clickHandler(true)}>
              <Nemo
                className={"animate-bounce"}
                date={TodayDate}
                color={color}
                setNemoDetail={setNemoDetail}
              />
            </div>
          </div>
        )}
      </div>
      {/* detail message area */}
      <NemoDetail nemoDetail={nemoDetail} />
      {/* input area */}
      {showInput && (
        <div className="p-5">
          <form
            className="bg-gray-200 p-5 space-y-5 rounded-md shadow-md"
            onSubmit={handleSubmit(isValid, isInValid)}
          >
            <p className="text-center text-lg sm:text-2xl font-bold text-gray-600">
              Today Color
            </p>
            <div className="flex justify-center">
              <Palette color={color} handler={changeHandler} />
              <input
                {...register("color", {
                  validate: (value) =>
                    value !== "#dfdfdf" || "色を選択してください",
                })}
                className="border-2 hidden"
                name="color"
              />
              <textarea
                className="border-2 resize-none focus:outline-none p-2 rounded-md"
                {...register("memo", { required: "メモを入力してください" })}
                name="memo"
                rows={3}
              />
            </div>
            <div className="my-3">
              <div className="mt-1 font-semibold text-rose-500 text-center">
                {errors.color?.message}
              </div>
              <div className="mt-1 font-semibold text-rose-500 text-center">
                {errors.memo?.message}
              </div>
            </div>
            <button
              className="px-5 py-3 rounded-lg flex justify-center w-full sm:w-1/2 mx-auto my-3 bg-gradient-to-r transition-transform from-green-400 to-blue-500 shadow-md  text-white hover:scale-105 tracking-wider"
              type="submit"
              onClick={() => setValue("color", color.hex)}
            >
              SUBMIT
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
