import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = ({ setLoggedIn, loggedIn }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [, setCookies] = useCookies(["access_token"]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        formData
      );
      setCookies("access_token", response.data.access_token);
      window.localStorage.setItem("userId", response.data.userId);

      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="h-screen p-4 bg-gradient-to-r from-orange-400 via-yellow-200 to-amber-100 ">
      <div className="bg-slate-100 p-4 py-6 h-100 max-w-md rounded-xl sm:m-auto shadow-2xl">
        <h1 className="text-center font-semibold p-2 text-lg">Welcome Back</h1>

        <div className="p-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center -3"
          >
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="font-bold min-w-64 text-xl my-0.5 shadow-xl"
              >
                Username
              </label>
              <input
                className="p-2 rounded-md mb-2"
                type="text"
                placeholder="Enter your username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="passwprd"
                className="font-bold min-w-64 text-xl my-0.5 mt-2 shadow-xl"
              >
                Password
              </label>
              <input
                className="p-2 rounded-md mb-1"
                type="password"
                placeholder="Enter your password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-xl m-3 mt-12 min-w-64"
            >
              SignIn
            </button>
            <div>
              <span>New User? </span>
              <span
                onClick={() => setLoggedIn(true)}
                style={{ cursor: "pointer" }}
              >
                signUp
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
