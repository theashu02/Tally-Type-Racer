import { Navigate } from "react-router-dom"; // Use Navigate instead of Redirect
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
  const player = findPlayer(players);

  if (_id === "") {
    // Replace Redirect with Navigate
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
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
      <div className="mb-8">
        <StartBtn player={player} gameID={_id} />
      </div>
      {isOpen && (
        <div className="mb-8">
          <DisplayGameCode gameID={_id} />
        </div>
      )}
      <div className="mb-8">
        <ScoreBoard players={players} />
      </div>
    </div>
  );
};

export default TypeRacer;
