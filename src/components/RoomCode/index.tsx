import "./style.scss";
import copyImage from "../../assets/img/copy.svg";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomToClipboard}>
      <div>
        <img src={copyImage} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
