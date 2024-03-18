import jwt from "jsonwebtoken";
import UserModel from "../Model/Schema.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "unathorized token access",
      });
    }

    const decodeToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await UserModel.findById(decodeToken._id).select(
      "-password -confirm_password"
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "invalid access token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
