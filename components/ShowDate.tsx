export default function ShowDate(props: any) {
  const { nemoDate } = props;
  return (
    <div className="absolute -top-8 -left-10 w-36 h-5 hidden sm:block">
      {nemoDate.toDateString()}
    </div>
  );
}
