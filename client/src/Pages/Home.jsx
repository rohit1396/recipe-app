import React, { useState, useEffect } from "react";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getall");
        const data = await response.json();
        console.log(data);
        setRecipes(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div>
      {recipes.map((recipe) => {
        return (
          <div key={recipe._id}>
            <h5>{recipe.name}</h5>
            <span>{recipe.cookingTime}</span>
            <img src={recipe.imageUrl} alt="img" />
            <div>
              {recipe.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </div>
            <p>{recipe.instaructions}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
