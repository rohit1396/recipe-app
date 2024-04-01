import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/context";

const Logout = () => {
  //   const navigate = useNavigate();
  const { logoutUser, token } = useAuth();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch(
        "https://recipe-app-qzae.onrender.com/api/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    };
    logout();
  }, [logoutUser]);

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/login" />;
};

export default Logout;
