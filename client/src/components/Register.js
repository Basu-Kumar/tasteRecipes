import axios from "axios";
import React, { useState } from "react";

const Register = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/auth/register", formData);
      alert("registration successfull");
      setLoggedIn(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="h-screen p-4 bg-gradient-to-r from-orange-400 via-yellow-200 to-amber-100 ">
      <div className="bg-slate-100 p-4 py-6 h-100 max-w-md rounded-xl sm:m-auto shadow-2xl">
        <h1 className="text-center font-semibold p-2 text-lg">Register Now</h1>

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
              SignUp
            </button>
            <div>
              <span>Already Registered? </span>
              <span
                onClick={() => setLoggedIn(false)}
                style={{ cursor: "pointer" }}
              >
                SignIn
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
