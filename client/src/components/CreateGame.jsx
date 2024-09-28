import { useContext } from "react";
import socket from "../socketConfig.js";
import { UserContext } from "../context/UserContext";
import BackButton from "./BackButton.jsx";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const { userName } = useContext(UserContext);
  const navigate = useNavigate();
  
  const onSubmit = (e) => {
    e.preventDefault();

    if (userName) {
      console.log("Creating game with nickname:", userName, "button pressed");
      // Emit the create-game event with the userName from context
      socket.emit("create-game", userName);
    } else {
      console.log("No user is logged in");
    }
  };
   
  const handleClick = () => {
    // window.location.href = "/";
    navigate("/");
  }

  return (
    <>
      <div className="ml-5 mt-5">
        <BackButton onClick={handleClick}/>
      </div>

      <div className="flex justify-center items-center h-screen w-screen">
        <div className="space-y-9 w-full max-w-md p-8 rounded-lg shadow-lg border-2 border-current">
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
                value={userName || ""}
                readOnly
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
    </>
  );
};

export default CreateGame;
