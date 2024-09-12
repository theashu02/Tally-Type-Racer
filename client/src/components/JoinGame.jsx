import { useState } from "react";
import socket from "../socketConfig";

const JoinGame = () => {
  const [userInput, setUserInput] = useState({ gameID: "", nickName: "" });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
    socket.emit("join-game", userInput);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Join Game</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="gameID" className="font-medium">
              Enter Game ID
            </label>
            <input
              type="text"
              name="gameID"
              value={userInput.gameID}
              onChange={onChange}
              placeholder="Enter Game ID"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="nickName" className="font-medium">
              Enter Nick Name
            </label>
            <input
              type="text"
              name="nickName"
              value={userInput.nickName}
              onChange={onChange}
              placeholder="Enter Nick Name"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinGame;
