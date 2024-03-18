import React, { useState } from "react";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    imageUrl: "",
    instructions: "",
    cookingTime: 0,
    userOwner: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
    // console.log(recipe);
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, ingredients, imageUrl, cookingTime, instructions } = recipe;
    try {
      const response = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          ingredients: ingredients,
          imageUrl: imageUrl,
          cookingTime: cookingTime,
          instructions: instructions,
          userOwner: "65dc0aa6e4cc6b07a994bb51",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-slate-200 w-full min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 min-w-80 md:w-2/6 h-auto flex flex-col m-10 justify-center items-center border border-slate-400 rounded-md"
      >
        <input
          type="text"
          placeholder="name"
          className="w-4/5 p-4 m-2 border border-rose-800 rounded-lg text-gray-800 text-lg font-normal outline-none"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            placeholder="ingredients"
            className="w-4/5 p-4 m-2 border border-rose-800 rounded-lg text-gray-800 text-lg font-normal outline-none"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, idx)}
          />
        ))}
        <button
          type="button"
          className="w-4/5 h-8 p-1 m-1 bg-rose-800 rounded-lg text-slate-50 text-sm font-normal outline-none tracking-widest"
          onClick={handleAddIngredient}
        >
          Add Ingridients
        </button>
        <input
          type="text"
          placeholder="image"
          className="w-4/5 p-4 m-2 border border-rose-800 rounded-lg text-gray-800 text-lg font-normal outline-none"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="instructions"
          className="w-4/5 p-4 m-2 border border-rose-800 rounded-lg text-gray-800 text-lg font-normal outline-none"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="cooking time"
          className="w-4/5 p-4 m-2 border border-rose-800 rounded-lg text-gray-800 text-lg font-normal outline-none"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-4/5 p-4 m-2 bg-rose-800 rounded-md text-slate-50 text-lg font-normal outline-none tracking-widest"
        >
          Create Recipe{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
