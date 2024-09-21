import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // For navigation
import GameMenu from "./components/GameMenu";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import socket from "./socketConfig";
import TypeRacer from "./components/TypeRacer";

function App() {
  const [gameState, setGameState] = useState({
    _id: "",
    isOpen: false,
    players: [],
    words: [],
  });

  const navigate = useNavigate(); // Programmatic navigation

  useEffect(() => {
    // Listen for game updates from the server
    socket.on("updateGame", (game) => {
      console.log(game);
      setGameState(game);
    });

    return () => {
      // Cleanup listeners when component unmounts
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (gameState._id !== "") {
      // Navigate to game route when gameState._id is set
      navigate(`/game/${gameState._id}`);
    }
  }, [gameState._id, navigate]);

  return (
    <div className="flex h-screen w-screen">
      <Routes>
        <Route path="/" element={<GameMenu />} />
        <Route path="/game/create" element={<CreateGame />} />
        <Route path="/game/join" element={<JoinGame />} />
        <Route
          path="/game/:gameID"
          element={<TypeRacer gameState={gameState} />}
        />
      </Routes>
    </div>
  );
}



export default App;
