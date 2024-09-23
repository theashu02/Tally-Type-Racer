import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate(); 
    const handleLogout = async () => {
        try {
          await auth.signOut(); // Sign out the user
          console.log("User logged out successfully");
          navigate("/login");
        } catch (error) {
          console.error("Error logging out: ", error);
        }
    };

    return (
      <div className="flex flex-row justify-between navbar bg-base-300 text-primary-content rounded-lg">
        <div className="text-sm text-blue-100 font-mono font-light ml-5">
          Powered by @daisyUI
        </div>
        <div className="space-x-3">
          <div className="text-2xl font-mono text-blue-100 font-normal mr-5">
            User Name
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
