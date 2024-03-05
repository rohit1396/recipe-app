import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CreateRecipe from "./Pages/CreateRecipe";
import SavedRecipes from "./Pages/SavedRecipes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/createrecipe"
          element={
            <>
              <Navbar />
              <CreateRecipe />
            </>
          }
        />
        <Route
          path="/savedrecipe"
          element={
            <>
              <Navbar />
              <SavedRecipes />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Signup />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
