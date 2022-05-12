interface Icolor {
  hex: string;
}
interface INemoProps {
  date: Date;
  color: Icolor;
}
export default function Nemo(props: INemoProps) {
  const { date, color } = props;
  return (
    <div
      //   key={date}
      className="borderborder-neutral-500 w-10 h-10 "
      style={{ backgroundColor: color.hex }}
    >
      {/* <label
        htmlFor={`colorPick-${date}`}
        className="borderborder-neutral-500 cursor-pointer"
      >
        <div className="w-10 h-10" />
        <input
          className="hidden"
          id={`colorPick-${date}`}
          type="color"
          name="favorite_color"
          value={color.hex}
        />
      </label> */}
    </div>
  );
}
