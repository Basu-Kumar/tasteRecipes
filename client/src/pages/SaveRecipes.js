import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";

const SaveRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/${userId}`
        );
        // console.log(response.data);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userId]);

  return (
    <div className="flex bg-orange-100 flex-col justify-center p-8 text-sm">
      <h1 className="text-center font-serif font-extrabold text-orange-700 text-2xl mb-2">
        Your Saved Recipes
      </h1>
      {savedRecipes.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-2xl w-wfit  bg-gradient-to-r from-indigo-500 via-purple-530 to-pink-400  m-auto my-6 rounded-2xl p-4 flex flex-col flex-wrap shadow-2xl "
        >
          <div className="text-center font-extrabold text-2xl sm:text-3xl font-serif  text-yellow-200 ">
            <span>{recipe.name}</span>
          </div>
          <div className="m-auto overflow-hidden relative w-64 h-52 sm:w-112 sm:h-100 mb-4 mt-4 rounded-xl">
            <img
              src={recipe.imageURL}
              alt=""
              className="w-full h-full max-w-full max-h-full object-cover absolute top-0 left-0"
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
        </div>
      ))}
    </div>
  );
};

export default SaveRecipes;
