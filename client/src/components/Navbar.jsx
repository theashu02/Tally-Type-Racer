import { auth } from "../firebase/config";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types"; 
import {useUser} from "../context/useUser"

export default function Navbar() {
  // const navigate = useNavigate();
  const { userName } = useUser();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      toast.success("Logged out successfully");
      console.log("Navigating to home page...");
      // navigate("/"); // Redirect to the home page
      // # bug fixed
      window.location.href = "/login";
      console.log("Navigation command executed.");
    } catch (error) {
      console.error("Error logging out: ", error);
      toast.error("Error logging out: ", error);
    }
  };

  return (
    <div className="flex flex-row justify-between navbar bg-base-300 text-primary-content rounded-lg">
      <div className="text-sm text-blue-100 font-mono font-light ml-5">
        Made by @Ashu Chauhan
      </div>
      <div className="space-x-5 mr-5">
        <div className="text-2xl font-mono text-green-400 font-normal">
          {userName ? userName : "Unknown"}
        </div>
        <div>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  userName: PropTypes.string, // userName should be a string
};