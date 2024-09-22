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
    <>
      <button
        className="btn btn-secondary"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        View result
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg pb-2">Congratulations!</h3>
          {/* <p className="py-4">You have got {} rank.</p> */}
          <table className="table rounded-lg shadow-md">
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
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-warning">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>

    /* <div
      className="flex flex-col w-screen justify-center border border-gray-400"
      style={{ backgroundColor: "#22215A" }}
    >
      
    </div> */
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
