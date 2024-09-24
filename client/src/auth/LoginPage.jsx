import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { auth } from "../firebase/config";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { VscSymbolNamespace } from "react-icons/vsc";

const LoginPage = ({ setLoggedInUser }) => {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  console.log(auth);

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    console.log(userCredentials);
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      !userCredentials.email ||
      !userCredentials.username ||
      !userCredentials.password
    ) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        setLoggedInUser(userCredentials.username);

        toast.success("Login successful! Welcome to the Game.");
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`Signup failed: ${error.message}`);
      })
      .finally(() => {
        // Reset loading state after signup completes (success or failure)
        setIsLoading(false);
      });
  }

  function handlePasswordReset() {
    // Get the email from the input field inside the modal
    const email = document.getElementById("resetEmail").value;

    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Email sent! Check your inbox for password reset instructions.");
          // Close the modal after sending the email
          document.getElementById("my_modal_5").close();
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error);
          toast.error("Failed to send reset email. Please try again.");
        });
    } else {
      toast.success("Please enter a valid email address.");
    }
  }

  return (
    <div className="w-1/3 mx-auto flex h-screen">
      <div className="flex-1 flex flex-col justify-center items-center w-1/2">
        <form className="flex gap-4 flex-col w-3/5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold text-white">Login</h1>
          </div>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={(e) => handleCredentials(e)}
            />
          </label>
          {/* Username input */}
          <label className="input input-bordered rounded flex items-center gap-2">
            <VscSymbolNamespace />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              onChange={(e) => handleCredentials(e)}
              required
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={(e) => handleCredentials(e)}
            />
          </label>
          <button
            className="btn rounded-full btn-primary text-white"
            onClick={(e) => {
              handleLogin(e);
            }}
            disabled={isLoading} // Optional: disable the button when loading
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="flex flex-col gap-4 mt-4">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Reset Password
          </button>

          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Reset Your Password</h3>
              <p className="py-4">
                Enter your email to receive password reset instructions:
              </p>

              {/* Email input field */}
              <input
                type="email"
                id="resetEmail"
                placeholder="Enter your email"
                className="input input-bordered w-full mb-4"
              />

              {/* Modal action buttons */}
              <div className="modal-action">
                {/* Submit button */}
                <button className="btn" onClick={handlePasswordReset}>
                  Send Reset Email
                </button>
                {/* Close button */}
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

LoginPage.propTypes = {
  setLoggedInUser: PropTypes.func.isRequired, // setLoggedInUser should be a function and is required
};
