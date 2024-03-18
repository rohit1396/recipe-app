import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/context";

const Logout = () => {
  //   const navigate = useNavigate();
  const { logoutUser, token } = useAuth();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });
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
