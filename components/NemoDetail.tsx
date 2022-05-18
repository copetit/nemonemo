export default function NemoDetail(props: any) {
  const { nemoDetail } = props;
  const nemoDate = new Date(nemoDetail.createAt);
  return (
    <div className="p-5 h-32 flex justify-center items-center">
      <div className="relative w-2/3 h-full bg-neutral-200 rounded-md overflow-hidden">
        {nemoDetail ? (
          <div
            className="absolute w-3/12 h-full top-0 left-0 flex items-center justify-center p-3"
            style={{
              backgroundColor: nemoDetail ? nemoDetail.color : "#c3c3c3",
            }}
          >
            {nemoDate.toDateString()}
          </div>
        ) : null}
      </div>
    </div>
  );
}
