import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./DB/connect.js";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config({
  path: "/.env",
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://recipe-app-rg.vercel.app"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use("/api", userRouter);
app.use("/api", recipesRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
