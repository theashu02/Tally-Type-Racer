import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { Navigate } from "react-router-dom";
import CountDown from "./CountDown";
import StartBtn from "./StartBtn";
import socket from "../socketConfig";
import DisplayWords from "./DisplayWords";
import Form from "./Form";
import ProgressBar from "./ProgressBar";
import ScoreBoard from "./ScoreBoard";
import DisplayGameCode from "./DisplayGameCode";

const findPlayer = (players) => {
  return players.find((player) => player.socketID === socket.id);
};

const TypeRacer = ({ gameState }) => {
  const { _id, players, words, isOpen, isOver } = gameState;
  console.log(_id, players, words, isOpen, isOver);

  const player = findPlayer(players);

  if (_id === "") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-center w-screen h-screen">
      <div className="text-center mt-3">
        <DisplayWords words={words} player={player} />
      </div>
      <div className="mb-8">
        <ProgressBar
          players={players}
          player={player}
          wordsLength={words.length}
        />
      </div>
      <div className="mb-8">
        <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
      </div>
      <div className="mb-8">
        <CountDown />
      </div>
      <div className="flex mb-8 justify-center">
        <StartBtn player={player} gameID={_id} />
      </div>
      {isOpen && (
        <div className="mb-8">
          <DisplayGameCode gameID={_id} />
        </div>
      )}
      <div className="flex justify-center">
        <ScoreBoard players={players} />
      </div>
    </div>
  );
};

// Define propTypes for TypeRacer component
TypeRacer.propTypes = {
  gameState: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        socketID: PropTypes.string.isRequired,
        name: PropTypes.string,
      })
    ).isRequired,
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOpen: PropTypes.bool.isRequired,
    isOver: PropTypes.bool,
  }).isRequired,
};

export default TypeRacer;
