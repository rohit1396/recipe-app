import React, { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import { useAuth } from "../context/context";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getall", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
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
    <div className="w-full h-auto flex flex-col justify-center items-center border border-rose-400">
      <div className="w-1/3 min-w-80">
        {recipes.map((recipe) => {
          return <Recipe key={recipe._id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default Home;
