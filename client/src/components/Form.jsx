import { useState, useRef, useEffect } from "react";
import socket from "../socketConfig";
import PropTypes from "prop-types";

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
        <div className="flex justify-center mb-4">
          <input
            type="text"
            readOnly={isOpen || isOver}
            onChange={onChange}
            value={userInput}
            className="input input-bordered input-info max-w-xs w-full px-3 py-2 text-blue-100 border rounded shadow focus:outline-none focus:ring focus:ring-indigo-300"
            ref={textInput}
            placeholder="Type here..."
          />
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen must be a boolean and is required
  isOver: PropTypes.bool.isRequired, // isOver must be a boolean and is required
  gameID: PropTypes.string.isRequired, // gameID must be a string and is required
};
export default Form;
