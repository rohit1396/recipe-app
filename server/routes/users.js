import express from "express";
import UserModel from "../Model/Schema.js";
import RecipeModel from "../Model/Recipes.js";
import bcrypt from "bcrypt";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

const genereteToken = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = await user.generateAccessToken();

    return accessToken;
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong while generating token",
    });
  }
};

// registering a user
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

// signing in a user
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        err: "Invalid Credentials",
      });
    }

    const getUser = await UserModel.findOne({ userName: userName });

    if (!getUser) {
      res.status(404).json({
        err: "User Does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, getUser.password);

    if (!isMatch) {
      res.status(404).json({
        err: "Invalid User credentials",
      });
    }

    const accessToken = await genereteToken(getUser._id);

    const loggedInUser = await UserModel.findById(getUser._id).select(
      "-password -confirm_password"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      data: loggedInUser,
      accessToken,
      message: "User Logged In successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

// signinig out user - logout
router.post("/logout", verifyJWT, async (req, res) => {
  console.log(req.user);
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).clearCookie("accessToken", options).json({
      success: true,
      message: "User Logged out Successfully",
    });
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

// get a user
router.get("/getuser/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const getUser = await UserModel.findOne({ userName: email });
    if (!getUser) {
      res.status(404).json({
        status: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        status: true,
        user: getUser,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/current-user", verifyJWT, async (req, res) => {
  let user = req.user;
  return res.status(200).json({ user, msg: "User fetched successfully" });
});

export { router as userRouter };
