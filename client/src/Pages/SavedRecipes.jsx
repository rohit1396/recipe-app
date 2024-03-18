import React, { useEffect, useState } from "react";
import Recipe from "../components/Recipe";
import { useAuth } from "../context/context";

const SavedRecipes = () => {
  const [savedrecipes, setSavedRecipes] = useState([]);

  const { user } = useAuth();
  // console.log(user);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/savedrecipes/${user._id}`
        );
        const data = await response.json();
        console.log(data);
        setSavedRecipes(data.savedRecipes);
        console.log(savedrecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center border border-rose-400">
      <div className="w-1/3 min-w-80">
        {savedrecipes?.map((recipe) => {
          return (
            <div className="text-red-600" key={recipe?._id}>
              <h3>{recipe.cookingTime}</h3>
              <h3>{recipe.instructions}</h3>
              <h3>{recipe.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedRecipes;
