import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "RecipeModel" }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
    this.confirm_password = await bcrypt.hash(this.confirm_password, 8);
  }
  next();
});

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
