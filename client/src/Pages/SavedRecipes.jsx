import React, { useEffect, useState } from "react";
import Recipe from "../components/Recipe";
import { useAuth } from "../context/context";

const SavedRecipes = () => {
  const [savedrecipes, setSavedRecipes] = useState([]);

  const { userData, token } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/savedrecipes/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
            <div
              key={recipe._id}
              className="text-gray-400 p-5 m-5 border border-2 border-pink-800 rounded-md"
            >
              <h5 className="font-bold text-2xl tracking-widest">
                {recipe.name}
              </h5>
              <span>Required Time : {recipe.cookingTime}</span>
              <img src={recipe.imageUrl} alt="img" />
              <div>
                Ingridients :
                {recipe.ingredients.map((item) => (
                  <span key={item}>{` ${item},  `}</span>
                ))}
              </div>
              <p>{recipe.instructions}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedRecipes;
