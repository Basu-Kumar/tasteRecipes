import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
const CreateRecipes = () => {
  const userId = useGetUserId();
  const [cookies] = useCookies(["access_token"]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userId,
  });

  const navigate = useNavigate();

  const addIngredient = (e) => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;

    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/recipes",
        recipe,
        { headers: { authorization: cookies.access_token } }
      );
      console.log(response);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className=" bg-orange-100 p-2 ">
      {errorMessage && (
        <div className="m-auto text-center text-lg text-orange-700 mb-4 p-2 bg-red-200 w-44 rounded-md">
          {errorMessage}
        </div>
      )}
      <h1 className="text-center font-serif font-extrabold text-orange-700 text-2xl mb-2">
        Add Your Favourite Recipe
      </h1>
      <div className="p-4 shadow-2xl max-w-xl m-auto rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-bold text-xl font-serif my-0.5 mt-2 text-orange-700"
            >
              Name of Recipe:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="p-2 rounded-md w-56 mb-1 oulined outline-red-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="ingredients"
              className="font-bold text-xl font-serif my-0.5 mt-2 text-orange-700"
            >
              Ingredients:
            </label>
            {recipe.ingredients.map((ingredient, idx) => (
              <input
                className="p-2 rounded-md w-56 mb-1 outlined outline-red-400"
                key="idx"
                type="text"
                name="ingredients"
                id="ingredient"
                value={ingredient}
                onChange={(e) => {
                  handleIngredientChange(e, idx);
                }}
              />
            ))}

            <button
              onClick={addIngredient}
              type="button"
              className="border-2 rounded-md max-w-40  p-1  text-white font-semibold text-lg bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              Add Ingredient
            </button>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="instructions"
              className="font-bold text-xl font-serif my-0.5 mt-2 text-orange-700 "
            >
              Instructions:
            </label>
            <textarea
              type="text"
              id="instructions"
              name="instructions"
              onChange={handleChange}
              className="p-2 rounded-md w-full h-40 mb-1 overflow-auto  outline-red-400"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="imageURL"
              className="font-bold text-xl font-serif my-0.5 mt-2 text-orange-700"
            >
              ImageURL:
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              onChange={handleChange}
              className="p-2 rounded-md w-72 outline-red-400 mb-1 "
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="cookingTime"
              className="font-bold text-xl font-serif my-0.5 mt-2 text-orange-700"
            >
              cookingTime (in Minutes):
            </label>
            <input
              type="Number"
              id="cookingTime"
              name="cookingTime"
              onChange={handleChange}
              className="p-2 rounded-md w-56  outline-red-400 mb-1"
            />
          </div>
          <button
            type="submit"
            className="border-2 rounded-md max-w-48 mt-2  m-auto p-2 px-6  text-white font-semibold text-lg bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipes;
