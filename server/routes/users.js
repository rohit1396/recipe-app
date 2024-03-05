import express from "express";
import UserModel from "../Model/Schema.js";
import RecipeModel from "../Model/Recipes.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { userName, password, confirm_password } = req.body;

  if (!userName || !password || !confirm_password) {
    return res.status(422).json({
      err: "Please Fill all the required fields",
    });
  }

  try {
    const userExist = await UserModel.findOne({ userName: userName });

    if (userExist) {
      return res.status(422).json({ err: "User Already Exists" });
    } else if (password !== confirm_password) {
      res.status(422).json({ err: "Password Not Matching" });
    } else {
      const user = new UserModel({ userName, password, confirm_password });

      const registerUser = await user.save();

      res.status(201).json({
        message: "User Registered Successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        err: "Invalid Credentials",
      });
    }

    const getUser = await UserModel.findOne({ userName: userName });

    if (getUser) {
      const isMatch = await bcrypt.compare(password, getUser.password);

      if (isMatch) {
        res.status(200).json({
          message: "Login Successfully",
        });
      } else {
        res.status(400).json({
          err: "InCorrect Password",
        });
      }
    } else {
      res.status(400).json({
        err: "invalid Username",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// save a recipe
router.put("/register", async (req, res) => {
  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({
      savedRecipes: user?.savedRecipes,
    });
  } catch (err) {
    console.log(err);
  }
});

export { router as userRouter };
