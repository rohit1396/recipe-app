import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connect from "./DB/connect.js";
import UserModel from "./Model/Schema.js";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config({
  path: "/.env",
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/api", userRouter);
app.use("/api", recipesRouter);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
