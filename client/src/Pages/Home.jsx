import React, { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import { useAuth } from "../context/context";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const { userLoggedIn, userData, token } = useAuth();
  // console.log(userData);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getall", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setRecipes(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, [userData]);
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      {userLoggedIn ? (
        userData ? (
          <div className="w-full md:max-w-lg min-w-80">
            {recipes.map((recipe) => {
              return <Recipe key={recipe._id} recipe={recipe} />;
            })}
          </div>
        ) : (
          <div className="flex relative w-80 h-80 justify-center items-center">
            <Oval
              visible={true}
              height="100"
              width="100"
              color="#9f1239"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center w-1/3 min-w-80 h-72">
          <h3 className="text-slate-500 font-bold m-4">
            User Need To Login First
          </h3>
          <button className="h-10 w-1/4 bg-rose-800 text-slate-50 text-lg tracking-widest rounded-md">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
