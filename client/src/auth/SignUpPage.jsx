import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(auth);
  const navigate = useNavigate();

  function handleCredentials(e) {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
    console.log(userCredentials);
  }
  
  function handleSignup(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (
      !userCredentials.email ||
      !userCredentials.password
    ) {
      toast.error("All fields are required!");
      setIsLoading(false); 
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        toast.success("Signup successful! Welcome to the Game.");
        setTimeout(() => {
          toast.success("Please login to update username");
        }, 3000);
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

  return (
    <div className="w-screen mx-auto flex h-screen px-10">
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="mx-auto md:mx-20 flex gap-4 flex-col w-1/4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold text-white">Register</h1>
          </div>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
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
              handleSignup(e);
            }}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="flex flex-col w-1/4 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;