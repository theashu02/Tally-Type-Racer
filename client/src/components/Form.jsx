import { useState, useRef, useEffect } from "react";
import socket from "../socketConfig";

const Form = ({ isOpen, isOver, gameID }) => {
  const [userInput, setUserInput] = useState("");
  const textInput = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      textInput.current?.focus();
    }
  }, [isOpen]);

  const resetForm = () => {
    setUserInput("");
  };

  const onChange = (e) => {
    let value = e.target.value;
    let lastChar = value.charAt(value.length - 1);
    if (lastChar === " ") {
      socket.emit("userInput", { userInput, gameID });
      resetForm();
    } else {
      setUserInput(e.target.value);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <form className="w-full max-w-sm">
        <div className="mb-4">
          <input
            type="text"
            readOnly={isOpen || isOver}
            onChange={onChange}
            value={userInput}
            className="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring focus:ring-indigo-300"
            ref={textInput}
            placeholder="Type here..."
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
