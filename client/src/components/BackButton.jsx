import { MdOutlineArrowBackIos } from "react-icons/md";
import PropTypes from "prop-types";

// button not propr=erly working when hashcode is generrated
export default function BackButton({ onClick }) {
  return (
    <button className="btn btn-square btn-outline" onClick={onClick}>
      <MdOutlineArrowBackIos />
    </button>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
