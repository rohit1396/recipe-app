import React, { useEffect, useState } from "react";
import { useAuth } from "../context/context";

const Recipe = ({ recipe }) => {
  const { _id, name, cookingTime, imageUrl, ingredients, instructions } =
    recipe;

  const { userData, token } = useAuth();

  const [savedrecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/savedrecipes/id/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setSavedRecipes(data.savedRecipes);
        // console.log(savedrecipes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, [userData]);

  const saveRecipe = async (_id) => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeID: _id,
          userID: userData._id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-gray-400 p-5 m-5 border border-2 border-pink-800 rounded-md">
      <h5 className="font-bold text-2xl tracking-widest">{name}</h5>
      <span>Required Time : {cookingTime}</span>
      <img src={imageUrl} alt="img" />
      <div>
        Ingridients :
        {ingredients.map((item) => (
          <span key={item}>{` ${item},  `}</span>
        ))}
      </div>
      <p>{instructions}</p>
      <p>Owned By : {userData?.userName}</p>
      <button
        onClick={() => saveRecipe(_id)}
        className="w-1/4 h-10 bg-rose-600 text-slate-50 tracking-wider rounded-md outline-none border-none my-2 pointer"
      >
        Save
      </button>
    </div>
  );
};

export default Recipe;
