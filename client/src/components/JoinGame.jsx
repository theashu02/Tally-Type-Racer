import { useState } from "react";
import socket from "../socketConfig";

const JoinGame = () => {
  const [userInput, setUserInput] = useState({ gameID: "", nickName: "" });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("gave user input at 13",userInput);
    socket.emit("join-game", userInput);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-full max-w-md p-8 border border-slate-300 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-50">
          Join Game
        </h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center space-y-4"
        >
          <div className="flex flex-col space-y-2 items-center">
            <label htmlFor="gameID" className="font-medium text-blue-50">
              Enter Game ID
            </label>
            <input
              type="text"
              name="gameID"
              value={userInput.gameID}
              onChange={onChange}
              placeholder="Enter Game ID"
              className="input input-bordered input-success w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col space-y-2 justify-center items-center">
            <label htmlFor="nickName" className="font-medium text-blue-50">
              Enter Nick Name
            </label>
            <input
              type="text"
              name="nickName"
              value={userInput.nickName}
              onChange={onChange}
              placeholder="Enter Nick Name"
              className="input input-bordered input-success w-full max-w-xs"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn btn-warning w-2/5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGame;
