import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const setLocalStorage = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let userLoggedIn = !!token;
  console.log("Is login : ", userLoggedIn);

  const logoutUser = () => {
    setToken("");
    setUserData(null);
    setRecipes([]);
    return localStorage.removeItem("token");
  };

  const getCurrentUser = async () => {
    try {
      const response = await fetch(
        "https://recipe-app-qzae.onrender.com/api/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setUserData(data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        userLoggedIn,
        recipes,
        setRecipes,
        setLocalStorage,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
