import { useState } from "react";
import socket from "../socketConfig";
import PropTypes from "prop-types";

const StartBtn = ({ player, gameID }) => {
  const [showBtn, setShowBtn] = useState(true);
  const  isPartyLeader  = player;

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

StartBtn.propTypes = {
  player: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ensure player object has _id as a string
    nickName: PropTypes.string, // Optional nickname if present
  }).isRequired,
  gameID: PropTypes.string.isRequired, // gameID must be a string
};


export default StartBtn;
