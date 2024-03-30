import React, { useEffect, useState } from "react";
import { useAuth } from "../context/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Recipe = ({ recipe }) => {
  const { _id, name, cookingTime, imageUrl, ingredients, instructions } =
    recipe;

  const { userData, token } = useAuth();

  const [savedrecipes, setSavedRecipes] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const navigate = useNavigate();

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

      const data = await response.json();
      if (response.status === 200) {
        setDisabledButton(true);
        toast.success("Recipe Saved Successfully");
        navigate("/savedrecipe");
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeAlreadySaved = (id) => savedrecipes.includes(id);

  return (
    <div className="capitalize p-5 m-5 border border-2 border-pink-800 rounded-md">
      <h5 className="font-bold text-gray-700 text-3xl tracking-widest">
        {name}
      </h5>
      <h4 className="font-semibold text-gray-600 text-2xl tracking-widest my-1">
        Required Time : {cookingTime} Mins
      </h4>

      <img
        className="w-full h-80 object-cover rounded-md"
        src={imageUrl}
        alt="img"
      />
      <div className="font-light text-gray-500 text-xl my-1 tracking-wider">
        <h4 className="font-semibold text-2xl text-gray-500">Ingredients : </h4>
        {ingredients.map((item) => (
          <li key={item}>{`${item}`}</li>
        ))}
      </div>
      <h4 className="font-semibold text-2xl text-gray-500">Instructions : </h4>
      <p className="font-medium text-gray-400 text-lg tracking-widest">
        {instructions}
      </p>
      <button
        onClick={() => saveRecipe(_id)}
        disabled={isRecipeAlreadySaved(_id)}
        className={`w-fit h-10 px-2 bg-rose-600 text-md text-slate-50 tracking-wide rounded-md outline-none border-none my-2 cursor-pointer ${
          disabledButton ? "cursor-not-allowed" : ""
        }`}
      >
        {isRecipeAlreadySaved(_id) ? "Already Saved" : "save"}
      </button>
    </div>
  );
};

export default Recipe;
