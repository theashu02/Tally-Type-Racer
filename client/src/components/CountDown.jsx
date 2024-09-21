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
    <div className="text-center my-5">
      <h1 className="text-4xl font-bold text-green-600">{countDown}</h1>
      <h3 className="text-xl text-gray-500">{msg}</h3>
    </div>
  );
};

export default CountDown;
