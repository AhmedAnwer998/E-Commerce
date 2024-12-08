import React, { useState, useEffect } from "react";
import logo from "/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";

const SignUp = () => {
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const navigate = useNavigate();

  const {isDarkMode} = useTheme();


  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();




  const handleThirdPartySignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Successfully signed in as ${result.user.displayName}`);
      navigate("/CheckOut");
    } catch (error) {
      alert(error.message);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setConfirm_password("");
      navigate("/CheckOut");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen p-2 ${isDarkMode ? "bg-dark" : "bg-white"}`}
    >
      <form
        onSubmit={signUp}
        className={`flex flex-col shadow-[0_1px_18px_rgba(0,0,0,0.4)] p-5 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex justify-center items-center flex-col text-center">
          <img src={logo} alt="logo" className="w-10" />
          <h1
            className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Welcome, in Easy Shopping
          </h1>
          <span
            className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
          >
             Please create your account to continue
          </span>
        </div>
        <div className="flex flex-col mt-3 gap-[]">
          <button
            onClick={() => handleThirdPartySignIn(facebookProvider)}
            type="button"
            className="flex justify-center items-center gap-2 border border-sky-400 py-1 rounded-md hover:bg-blue-50 w-full my-1"
          >
            <FaFacebook className="text-2xl text-blue-500" />
            <span className="text-gray-600 font-sans text-md">
              Sign Up with Facebook
            </span>
          </button>
          <button
            onClick={() => handleThirdPartySignIn(googleProvider)}
            type="button"
            className="flex justify-center items-center gap-2 border border-sky-400 py-1 rounded-md hover:bg-blue-50 w-full my-1"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-gray-600 font-sans text-md">
              Sign Up with Google
            </span>
          </button>
        </div>
        {/* Divider with "or" */}
        <div className="my-2 flex items-center justify-center">
          <hr className="flex-grow border-gray-600" />
          <span className=" mx-2 text-[17px] text-gray-400"> or </span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Floating Labels for Inputs */}
        {/* Name Field */}
        <div className="relative mb-3">
          <input
            type="text"
            id="user_name"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            className={`peer w-full px-2 py-1 border !border-gray-900 rounded-md focus:outline-none focus:!border-blue-400 ${isDarkMode ? "bg-white text-gray-700" : "bg-white"}`}
            placeholder=" "
            required
          />
          <label
            htmlFor="user_name"
            className={`absolute px-1 bg-white left-3 transition-all ${
              user_name
                ? "top-[-10px] bg-white text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            }`}
          >
            Your name
          </label>
        </div>
        {/* Email Field */}
        <div className="relative mb-3">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`peer w-full px-2 py-1 border !border-gray-900 rounded-md focus:outline-none focus:!border-blue-400 ${isDarkMode ? "bg-white text-gray-700" : "bg-white"}`}
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
        {/* Password Field */}
        <div className="relative mb-3">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`peer w-full px-2 py-1 border !border-gray-900 rounded-md focus:outline-none focus:!border-blue-400 ${isDarkMode ? "bg-white text-gray-700" : "bg-white"}`}
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className={`absolute px-1 bg-white left-3 transition-all ${
              password
                ? "top-[-10px] bg-white text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            }`}
          >
            Password
          </label>
        </div>
        {/* Confirm Password Field */}
        <div className="relative mb-3">
          <input
            type="password"
            id="confirm_password"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
            className={`peer w-full px-2 py-1 border !border-gray-900 rounded-md focus:outline-none focus:!border-blue-400 ${isDarkMode ? "bg-white text-gray-700" : "bg-white"}`}
            placeholder=" "
            required
          />
          <label
            htmlFor="confirm_password"
            className={`absolute px-1 bg-white left-3 transition-all ${
              confirm_password
                ? "top-[-10px] bg-white text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            }`}
          >
            Re-enter password
          </label>
        </div>
        <button
          type="submit"
          className={`my-4 text-sm border border-sky-500 py-1 text-sky-700 rounded-md hover:bg-blue-50 `}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
