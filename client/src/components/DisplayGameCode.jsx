import { useRef, useState } from "react";
import PropTypes from "prop-types";

const DisplayGameCode = ({ gameID }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textInputRef = useRef(null);

  const copyToClipboard = () => {
    // Modern clipboard API
    navigator.clipboard.writeText(gameID).then(
      () => {
        setCopySuccess(true);
      },
      (err) => {
        console.error("Failed to copy: ", err);
        setCopySuccess(false);
      }
    );
  };

  return (
    <div className="flex justify-center items-center my-6">
      <div
        className="w-full max-w-md p-6 rounded-lg shadow-md"
        style={{ backgroundColor: "#22215A" }}
      >
        <h4 className="text-center text-lg text-gray-500 font-semibold mb-4 font-mono">
          Send this Code to Your Friends to Join
        </h4>
        <div className="flex items-center mb-3">
          <input
            type="text"
            ref={textInputRef}
            value={gameID}
            readOnly
            className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="ml-3 px-4 py-2 btn btn-info font-semibold rounded-md"
            onClick={copyToClipboard}
          >
            Copy Game Code
          </button>
        </div>
        {copySuccess ? (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Successfully copied to clipboard</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

DisplayGameCode.propTypes = {
  gameID: PropTypes.string.isRequired, // gameID should be a string and is required
};
export default DisplayGameCode;
