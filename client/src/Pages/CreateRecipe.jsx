import React, { useState } from "react";
import { useAuth } from "../context/context";

const CreateRecipe = () => {
  const [file, setFile] = useState(null);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    cookingTime: 0,
  });

  const { userData, token } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
    // console.log(recipe);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // console.log(recipe.imageUrl);
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

    const { name, ingredients, cookingTime, instructions } = recipe;
    const formDataToSend = new FormData();

    formDataToSend.append("imageUrl", file);
    formDataToSend.append("name", name);
    formDataToSend.append("ingredients", ingredients);
    formDataToSend.append("cookingTime", cookingTime);
    formDataToSend.append("instructions", instructions);
    formDataToSend.append("userOwner", userData._id);
    try {
      const response = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      const data = await response.json();
      alert("Recipe Created Succesfully");
      setRecipe({
        name: "",
        ingredients: [],
        imageUrl: "",
        cookingTime: "",
        instructions: "",
        userOwner: "",
      });
      setFile(null);
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
          type="file"
          placeholder="image"
          className="w-4/5 p-4 m-2 border border-rose-800 rounded-lg text-gray-800 text-lg font-normal outline-none"
          name="imageUrl"
          // value={recipe.imageUrl}
          onChange={handleFileChange}
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
