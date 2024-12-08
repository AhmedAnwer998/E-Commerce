import React, { useState } from "react";
import logo from "/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext"; // Import the useTheme hook

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Access the dark mode state

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleThirdPartySignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const isNewUser = result._tokenResponse.isNewUser;

      if (isNewUser) {
        alert("Welcome! Please complete your profile.");
        navigate("/SignUp");
      } else {
        alert(
          `Welcome back, ${user.displayName}! Please complete your profile.`
        );
        navigate("/SignUp");
      }
    } catch (error) {
      console.error("Error during third-party sign-in:", error);
      alert("An error occurred while signing in. Please try again.");
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/CheckOut");
    } catch (error) {
      navigate("/SignUp");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div
      className={`flex justify-center items-center h-screen p-2 ${
        isDarkMode ? "bg-dark text-white" : "bg-white text-black"
      }`}
    >
      <form
        onSubmit={signIn}
        className={`flex flex-col shadow-[0_1px_18px_rgba(0,0,0,0.4)] p-5 rounded-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } w-full max-w-md`}
      >
        <div className="flex justify-center items-center flex-col">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="text-2xl text-center font-semibold">Log In to Easy Shopping</h1>
          <span className="text-sm text-gray-500">
            Welcome, please sign in to continue
          </span>
        </div>
        <div className="flex flex-col mt-3">
          <button
            onClick={() => handleThirdPartySignIn(facebookProvider)}
            type="button"
            className="flex justify-center items-center gap-2 border border-sky-400 py-1 rounded-md hover:bg-blue-50 w-full my-1"
          >
            <FaFacebook className="text-2xl text-blue-500" />
            <span className="text-gray-600 font-sans text-md">
              Sign In with Facebook
            </span>
          </button>
          <button
            onClick={() => handleThirdPartySignIn(googleProvider)}
            type="button"
            className="flex justify-center items-center gap-2 border border-sky-400 py-1 rounded-md hover:bg-blue-50 w-full my-1"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-gray-600 font-sans text-md">
              Sign In with Google
            </span>
          </button>
        </div>
        <div className="my-2 flex items-center justify-center">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-2 text-[17px] text-gray-400">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        <div className="relative mb-3">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full px-2 py-1 border !border-gray-900 rounded-md focus:outline-none focus:!border-blue-400 text-black"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className={`absolute px-1 bg-white left-3 transition-all ${
              email
                ? "top-[-10px] bg-white text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            }`}
          >
            Email
          </label>
        </div>
        <div className="relative mb-3">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full px-2 py-1 border !border-gray-900 rounded-md focus:outline-none focus:!border-blue-400 text-black"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className={`absolute bg-white px-1 left-3 transition-all ${
              password
                ? "top-[-10px] bg-white text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            }`}
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="my-1 text-md text-blue-500 border border-sky-500 py-1 rounded-md hover:bg-blue-50"
        >
          Log In
        </button>
        <Link
          to="/SignUp"
          className="flex justify-center items-center no-underline text-md text-sky-700 py-1 rounded-md hover:bg-blue-50"
        >
          Create Account
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
