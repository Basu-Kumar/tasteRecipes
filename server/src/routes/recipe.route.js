import express from "express";
import recipeModel from "../models/recipe.model.js";
import userModel from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// to create/post a new recipe by a specific user which gets stored in recipe collection
router.post("/", async (req, res) => {
  try {
    const newRecipe = new recipeModel(req.body);
    const response = await newRecipe.save();
    res.status(200).json(response);
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.put("/", async (req, res) => {
  const { userID, recipeID } = req.body;

  const getUser = await userModel.findById({ userID });
  const getRecipe = await recipeModel.findById({ recipeID });
  getUser.savedRecipes.push(getRecipe);

  try {
    await getUser.save();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UsersModel.getById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UsersModel.getById(req.body.userID);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
