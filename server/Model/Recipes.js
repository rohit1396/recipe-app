import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{ type: String, required: true }],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: String,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
});

const RecipeModel = mongoose.model("RecipeModel", RecipeSchema);

export default RecipeModel;
