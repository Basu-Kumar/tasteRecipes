import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();

  const [cookies] = useCookies(["access_token"]);

  const userId = useGetUserId();

  useEffect(() => {
    const getAllrecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipes");
        console.log(response);
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllrecipes();
  }, []);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/ids/${userId}`
        );

        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    if (cookies.access_token) fetchSavedRecipes();
  }, [userId, cookies.access_token]);

  const handleSaveRecipe = async (e, recipeId) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8000/recipes",
        {
          userId,
          recipeId,
        },
        { headers: { authorization: cookies.access_token } }
      );
      console.log(response);

      setSavedRecipes(response.data);
      navigate("/savedRecipes");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-orange-100 flex-col justify-center p-8 text-sm">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-2xl w-wfit  bg-gradient-to-r from-indigo-500 via-purple-530 to-pink-400  m-auto my-6 rounded-xl p-4 flex flex-col flex-wrap shadow-2xl "
        >
          <div className="text-center font-extrabold text-2xl sm:text-3xl font-serif  text-yellow-200 ">
            <span>{recipe.name}</span>
          </div>
          <div className="m-auto overflow-hidden relative w-64 h-52 sm:w-112 sm:h-100 mb-4 mt-4">
            <img
              src={recipe.imageURL}
              alt=""
              className="w-full h-full max-w-full max-h-full object-cover absolute top-0 left-0 rounded-md"
            />
          </div>
          <div className="font-extrabold  text-xs sm:text-lg font-serif  text-yellow-200 ">
            Cooking Time : &nbsp;
            <span className="font-semibold text-white">
              {recipe.cookingTime} minutes
            </span>
          </div>
          <ul>
            <h3 className="font-extrabold text-xs sm:text-lg font-serif  text-yellow-200">
              Ingredients:
            </h3>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="list-disc ml-4 text-white">
                {ingredient}
              </li>
            ))}
          </ul>
          <div className="font-extrabold text-xm sm:text-lg leading-4 font-serif  text-yellow-200  ">
            Instructions: <br />
            <span className="font-normal text-white">
              {" "}
              {recipe.instructions}
            </span>
          </div>

          <button
            className="border-2 rounded max-w-32 m-auto py-1 p-4 my-2 text-white font-semibold text-xs sm:text-lg hover:bg-orange-300"
            onClick={(e) => {
              handleSaveRecipe(e, recipe._id);
            }}
          >
            save
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
