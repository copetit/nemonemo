export default function NemoDetail(props: any) {
  const { nemoDetail } = props;
  const nemoDate = new Date(nemoDetail?.createAt);

  return (
    <div className="p-5 h-32 flex justify-center items-center">
      <div className="w-full h-full flex bg-neutral-200 rounded-md overflow-hidden shadow-md">
        <div
          className="w-3/12 flex items-center justify-center p-3"
          style={{
            backgroundColor: nemoDetail ? nemoDetail?.color : "#c3c3c3",
          }}
        >
          <p className="text-sm sm:text-base font-semibold">
            {nemoDetail ? nemoDate.toDateString() : ""}
          </p>
        </div>
        <div className="p-3 flex justify-center items-center w-full text-sm sm:text-base">
          {nemoDetail?.memo}
        </div>
      </div>
    </div>
  );
}
