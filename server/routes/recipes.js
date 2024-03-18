import express from "express";
import RecipeModel from "../Model/Recipes.js";
import UserModel from "../Model/Schema.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

// creating a recipe
router.post("/create", async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } =
    req.body;

  try {
    const recipe = new RecipeModel({
      name,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      userOwner,
    });

    const RecipeCreated = await recipe.save();
    // res.send(RecipeCreated);

    res.status(201).json({
      status: true,
      message: "Recipe Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: err,
    });
  }
});

// get all recipes
router.get("/getall", verifyJWT, async (req, res) => {
  const user = req.user;
  try {
    const getRecipes = await RecipeModel.find({});

    res.status(200).json({
      status: true,
      data: getRecipes,
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: err,
    });
  }
});

// get saved recipes
router.get("/savedrecipes/id/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(200).json({
      savedRecipes: user?.savedRecipes,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/savedrecipes/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user?.savedRecipes },
    });
    res.status(200).json({
      savedRecipes,
    });
  } catch (err) {
    console.log(err);
  }
});

export { router as recipesRouter };
