export default function NemoDetail(props: any) {
  const { nemoDetail } = props;
  const nemoDate = new Date(nemoDetail.createAt);
  return (
    <div className="p-5 h-32 flex justify-center items-center">
      <div className="w-2/3 h-full flex bg-neutral-200 rounded-md overflow-hidden">
        <div
          className="w-3/12 flex items-center justify-center p-3"
          style={{
            backgroundColor: nemoDetail ? nemoDetail.color : "#c3c3c3",
          }}
        >
          {nemoDate.toDateString()}
        </div>
        <div className="p-3">{nemoDetail.memo}</div>
      </div>
    </div>
  );
}
