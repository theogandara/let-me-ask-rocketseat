import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export const RoomCode = (props: RoomCodeProps) => {
  const copyText = () => {
    navigator.clipboard.writeText(props.code);
  };
  return (
    <button onClick={copyText} className="room-code">
      <div>
        <img alt="logo" src={copyImg} />
      </div>
      <span> sala #{props.code}</span>
    </button>
  );
};
