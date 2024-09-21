import PropTypes from "prop-types";

const getScoreboard = (players) => {
  const scoreBoard = players.filter((player) => player.WPM !== -1);
  return scoreBoard.sort((a, b) =>
    a.WPM > b.WPM ? -1 : b.WPM > a.WPM ? 1 : 0
  );
};

const ScoreBoard = ({ players }) => {
  const scoreBoard = getScoreboard(players);

  if (scoreBoard.length === 0) return null;

  return (
    <div
      className="flex flex-col w-screen justify-center border border-gray-400"
      style={{ backgroundColor: "#22215A" }}
    >
      <table className="table rounded-lg shadow-md">
        {/* <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="px-4 py-2 border-b">#</th>
            <th className="px-4 py-2 border-b">User</th>
            <th className="px-4 py-2 border-b">WPM</th>
          </tr>
        </thead> */}
        <thead className="text-center text-lg">
          <tr>
            <th className="px-4 py-2 border-b">#</th>
            <th className="px-4 py-2 border-b">Player Name</th>
            <th className="px-4 py-2 border-b">WPM</th>
          </tr>
        </thead>
        <tbody className="text-center text-lg">
          {scoreBoard.map((player, index) => (
            <tr key={player._id} className="hover font-mono text-slate-300">
              <td>{index + 1}</td>
              <td>{player.nickName}</td>
              <td>{player.WPM}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ScoreBoard.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Each player should have a unique id
      nickName: PropTypes.string.isRequired, // Each player should have a nickname
      WPM: PropTypes.number.isRequired, // WPM should be a number, and it's required
    })
  ).isRequired, // players is a required array
};
export default ScoreBoard;
