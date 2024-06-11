import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import tasteRecipe from "../assets/tasteRecipe.png";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <div className="flex justify-between bg-gradient-to-r from-orange-400 via-yellow-200 to-amber-100 items-center outline-none">
      <Link to="/">
        <img
          src={tasteRecipe}
          alt=""
          className="h-16 w-16 rounded-xl p-0.5 sm:p-1.5 ml-1 sm:ml-4"
        />
      </Link>

      <div className="flex flex-wrap justify-end items-center gap-2 text-sm p-1 py-3 sm:gap-4 sm:p-3 sm:text-xl font-semibold font-serif text-purple-500">
        <Link to="/" className="hover:text-orange-500">
          Home
        </Link>
        <Link to="/createRecipes" className=" hover:text-orange-500">
          Create
        </Link>
        <Link to="/savedRecipes" className="hover:text-orange-500">
          Saved
        </Link>

        {!cookies.access_token ? (
          <Link to="/auth" className=" hover:text-orange-500">
            SignIn
          </Link>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
