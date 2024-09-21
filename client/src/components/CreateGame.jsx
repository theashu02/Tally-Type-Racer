import { useState } from "react";
import socket from "../socketConfig.js";

const CreateGame = () => {
  // console.log(props);
  
  const [nickName, setNickName] = useState("");

  const onChange = (e) => {
    setNickName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("check nickname", nickName);
    
    socket.emit("create-game", nickName);
    console.log("button pressed")
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      <div className="space-y-9 w-full max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-center text-zinc-100 hover:text-gray-200 text-4xl font-bold mb-6">
          Create Game
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col text-center mb-4 space-y-3">
            <label
              htmlFor="nickName"
              className="block text-orange-200 font-medium mb-2"
            >
              In Game Name
            </label>
            <input
              type="text"
              name="nickName"
              value={nickName}
              onChange={onChange}
              placeholder="Enter Nick Name"
              className="input input-bordered input-success w-full px-4 py-2 shadow-sm "
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline btn-secondary w-full mt-5 font-bold py-2 px-4 rounded-md"
            style={{ cursor: "pointer" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
