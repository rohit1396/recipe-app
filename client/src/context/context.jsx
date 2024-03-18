import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  useEffect(() => {
    const getLoggedInUSer = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/current-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setUser(data?.user);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    getLoggedInUSer();
  }, [token]);

  const setLocalStorage = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let userLoggedIn = !!token;
  console.log(userLoggedIn);

  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, userLoggedIn, setLocalStorage, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
