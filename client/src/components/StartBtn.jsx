import { useState } from "react";
import socket from "../socketConfig";

const StartBtn = ({ player, gameID }) => {
  const [showBtn, setShowBtn] = useState(true);
  const { isPartyLeader } = player;

  const onClickHandler = () => {
    socket.emit("timer", { playerID: player._id, gameID });
    setShowBtn(false);
  };

  return isPartyLeader && showBtn ? (
    <button
      type="button"
      onClick={onClickHandler}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      style={{ cursor: "pointer" }}
    >
      Start Game
    </button>
  ) : null;
};

export default StartBtn;
