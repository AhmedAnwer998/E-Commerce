import React, { useState } from "react";
import logo from "/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";

const SignUp = () => {
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const googleProvider = new GoogleAuthProvider();

  const handleThirdPartySignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Successfully signed in as ${result.user.displayName}`);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setConfirm_password("");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen p-2 ${
        isDarkMode ? "bg-dark" : "bg-white"
      }`}
    >
      <form
        onSubmit={signUp}
        className={`flex flex-col shadow-[0_1px_18px_rgba(0,0,0,0.4)] p-5 rounded-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } w-full max-w-md`}
      >
        <div className="flex justify-center items-center flex-col text-center">
          <img src={logo} alt="logo" className="w-10" />
          <h1
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to Easy Shopping
          </h1>
          <span
            className={`text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Please create your account to continue
          </span>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}
        <div className="flex flex-col mt-3 gap-2">
 
          <button
            onClick={() => handleThirdPartySignIn(googleProvider)}
            type="button"
            className={`flex justify-center items-center gap-2 border border-sky-400 py-1 rounded-md hover:bg-blue-50 w-full ${
              isDarkMode ? "text-white" : "text-gray-600"
            }`}
            aria-label="Sign up with Google"
          >
            <FcGoogle className="text-2xl" />
            <span>Sign Up with Google</span>
          </button>
        </div>
        <div className="my-2 flex items-center justify-center">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-2 text-[17px] text-gray-400">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        <div className="relative mb-3">
          <input
            type="text"
            id="user_name"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            className={`peer w-full px-2 py-1 border ${
              isDarkMode ? "border-gray-600" : "border-gray-900"
            } rounded-md focus:outline-none focus:border-blue-400 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
            }`}
            placeholder=" "
            required
          />
          <label
            htmlFor="user_name"
            className={`absolute px-1 left-3 transition-all ${
              user_name
                ? "top-[-10px] text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            Your name
          </label>
        </div>
        <div className="relative mb-3">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`peer w-full px-2 py-1 border ${
              isDarkMode ? "border-gray-600" : "border-gray-900"
            } rounded-md focus:outline-none focus:border-blue-400 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
            }`}
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className={`absolute px-1 left-3 transition-all ${
              email
                ? "top-[-10px] text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
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
            className={`peer w-full px-2 py-1 border ${
              isDarkMode ? "border-gray-600" : "border-gray-900"
            } rounded-md focus:outline-none focus:border-blue-400 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
            }`}
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className={`absolute px-1 left-3 transition-all ${
              password
                ? "top-[-10px] text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            Password
          </label>
        </div>
        <div className="relative mb-3">
          <input
            type="password"
            id="confirm_password"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
            className={`peer w-full px-2 py-1 border ${
              isDarkMode ? "border-gray-600" : "border-gray-900"
            } rounded-md focus:outline-none focus:border-blue-400 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
            }`}
            placeholder=" "
            required
          />
          <label
            htmlFor="confirm_password"
            className={`absolute px-1 left-3 transition-all ${
              confirm_password
                ? "top-[-10px] text-[13px] text-sky-500"
                : "top-1 text-gray-500"
            } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            Re-enter password
          </label>
        </div>
        <button
          type="submit"
          className={`my-4 text-sm border border-sky-500 py-1 text-sky-700 rounded-md hover:bg-blue-50 ${
            isDarkMode ? "text-white" : "text-sky-700"
          }`}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
