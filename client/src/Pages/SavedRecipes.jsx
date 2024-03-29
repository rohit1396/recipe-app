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
      <div className="w-full md:max-w-lg">
        {savedrecipes?.map((recipe) => {
          return (
            <div
              key={recipe._id}
              className="text-gray-400 p-5 m-5 border border-2 border-pink-800 rounded-md"
            >
              <h5 className="capitalize font-bold text-gray-700 text-3xl tracking-widest">
                {recipe.name}
              </h5>
              <h4 className="font-semibold text-gray-600 text-2xl tracking-widest my-1">
                Required Time : {recipe.cookingTime}
              </h4>
              <img
                className="w-full h-80 object-cover"
                src={recipe.imageUrl}
                alt="img"
              />
              <div className="font-light text-gray-500 text-xl my-1 tracking-wider">
                <h4 className="font-semibold text-2xl text-gray-500">
                  Ingredients :{" "}
                </h4>
                {recipe.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </div>
              <h4 className="font-semibold text-2xl text-gray-500 my-1">
                Instructions :{" "}
              </h4>
              <p className="font-medium text-gray-400 text-lg tracking-widest">
                {recipe.instructions}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedRecipes;
