import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"; // For navigation
import GameMenu from "./components/GameMenu";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import socket from "./socketConfig";
import TypeRacer from "./components/TypeRacer";
import Navbar from "./components/Navbar";
import LoginPage from "./auth/LoginPage";
import { auth } from "./firebase/config";
import SignUpPage from "./auth/SignUpPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [gameState, setGameState] = useState({
    _id: "",
    isOpen: false,
    players: [],
    words: [],
  });

  const navigate = useNavigate(); // Programmatic navigation

  const [user, setUser] = useState(null); // User state

  useEffect(() => {
    // Listen for Firebase auth changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);
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
    <div className="flex flex-col h-screen w-screen">
      <Toaster />
      {user ? (
        <>
          <Navbar userName={loggedInUser} />
          <Routes>
            <Route path="/" element={<GameMenu />} />
            <Route path="/game/create" element={<CreateGame />} />
            <Route path="/game/join" element={<JoinGame />} />
            <Route
              path="/game/:gameID"
              element={<TypeRacer gameState={gameState} />}
            />
          </Routes>
        </>
      ) : (
        // If no user is logged in, render the LoginPage
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          {/* Login route */}
          <Route
            path="/login"
            element={<LoginPage setLoggedInUser={setLoggedInUser} />}
          />
          {/* Signup route */}
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
