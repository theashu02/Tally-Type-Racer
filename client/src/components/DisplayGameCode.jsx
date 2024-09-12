import { useRef, useState } from "react";

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
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h4 className="text-center text-lg font-semibold mb-4">
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
            className="ml-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={copyToClipboard}
          >
            Copy Game Code
          </button>
        </div>
        {copySuccess ? (
          <div className="text-center text-green-600 mt-2">
            Successfully Copied Game Code
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DisplayGameCode;
