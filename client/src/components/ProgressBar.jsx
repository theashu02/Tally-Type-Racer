import PropTypes from "prop-types";

const calculatePercentage = (player, wordsLength) => {
  if (player.currentWordIndex !== 0) {
    return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";
  }
  return "0%";
};

const ProgressBar = ({ player, players, wordsLength }) => {
  const percentage = calculatePercentage(player, wordsLength);

  return (
    <div className="space-y-4">
      {/* Display current player's progress */}
      <div key={player._id} className="flex flex-col">
        <div className="flex flex-col pt-1 justify-center items-center">
          <h5 className="text-left text-2xl font-semibold font-mono">
            Name: {player.nickName}
          </h5>
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium text-gray-100 mb-2">
              {percentage}
            </div>
          </div>

          <div className="flex w-10/12 bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: percentage }}
              role="progressbar"
            ></div>
          </div>
        </div>
      </div>

      {/* Display other players' progress */}
      {players
        .filter((playerObj) => playerObj._id !== player._id)
        .map((playerObj) => {
          const playerPercentage = calculatePercentage(playerObj, wordsLength);
          return (
            <div key={playerObj._id} className="flex flex-col">
              <h5 className="text-left text-lg font-semibold">
                {playerObj.nickName}
              </h5>
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-blue-600">
                    {playerPercentage}
                  </div>
                </div>
                <div className="flex w-10/12 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: playerPercentage }}
                    role="progressbar"
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

ProgressBar.propTypes = {
  player: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    currentWordIndex: PropTypes.number.isRequired,
  }).isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      nickName: PropTypes.string.isRequired,
      currentWordIndex: PropTypes.number.isRequired,
    })
  ).isRequired,
  wordsLength: PropTypes.number.isRequired,
};


export default ProgressBar;
