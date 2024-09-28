import { useState, useEffect } from "react";
import socket from "../socketConfig";

const CountDown = () => {
  const [timer, setTimer] = useState({ countDown: "", msg: "" });

  useEffect(() => {
    const handleTimer = (data) => {
      setTimer(data);
    };

    socket.on("timer", handleTimer);

    socket.on("done", () => {
      socket.off("timer", handleTimer); // Use socket.off to remove specific listener
    });

    return () => {
      socket.off("timer", handleTimer); // Cleanup on unmount
    };
  }, []);

  const { countDown, msg } = timer;

  return (
    <div className="flex flex-col space-y-2 text-center">
      <div className="flex justify-center items-center">
        <span className="text-gray-200 countdown font-mono text-2xl">{countDown}</span>
      </div>
      <div className="flex justify-center items-center">
        <h3 className="text-xl text-gray-300">{msg}</h3>
      </div>
    </div>
  );
};

export default CountDown;
