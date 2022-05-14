export default function ShowDate(props: any) {
  const { nemoDate } = props;
  return (
    <div className="absolute -top-5 -left-5 w-36 h-5">
      {nemoDate.toISOString().split("T")[0]}
    </div>
  );
}
