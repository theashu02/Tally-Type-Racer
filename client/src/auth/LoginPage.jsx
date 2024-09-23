import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [userCredentials, setUserCredentials] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    console.log(auth);

    function handleCredentials(e) {
      setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
      console.log(userCredentials);
    }

    function handleLogin(e) {
        e.preventDefault();
        setError("");
        signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
        )
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("Login successful! Welcome to the Game.");
            navigate("/");
        })
        .catch((error) => {
            setError(error.message);
            toast.error(`Signup failed: ${error.message}`);
        });
    }

    function handlePasswordReset(){
      const email = prompt('Please enter your email');
      sendPasswordResetEmail(auth, email)
      alert('Email sent! Check your inbox for password reset instructions.')
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
          >
            {/* {isPending ? "Loading..." : "Login"} */}
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="flex flex-col gap-4 mt-4">
          <p
            className="text-white text-lg cursor-pointer hover:text-red-400"
            onClick={handlePasswordReset}
          >
            Forgot-password
          </p>
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
