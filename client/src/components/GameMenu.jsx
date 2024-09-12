import { useNavigate } from "react-router-dom";
import Discription from "./Discription";

const GameMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col"> 
        <div className="flex flex-col space-y-3 rounded-md w-full h-96 text-center justify-center">
          <div>
            <h1 className="text-4xl font-bold mb-8">
              Welcome to Tally Type-Racer
            </h1>
          </div>
          <div>
            <div>
              <button
                type="button"
                onClick={() => navigate("/game/create")}
                className="btn btn-active btn-secondary hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded-lg mr-4"
              >
                Create Game
              </button>
              <button
                type="button"
                onClick={() => navigate("/game/join")}
                className="btn btn-warning hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded-lg"
              >
                Join Game
              </button>
            </div>
          </div>
        </div>
        <Discription />
      </div>
    </>
  );
};

export default GameMenu;
