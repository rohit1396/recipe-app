import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/context";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLocalStorage } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://recipe-app-qzae.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
          body: JSON.stringify({
            userName: userName,
            password: password,
          }),
        }
      );

      const data = await response.json();
      // console.log(data);

      if (response.status === 400) {
        toast.error("Please Fill The Required Fields");
      } else if (response.status === 404) {
        toast.error("Invalid Username Or Email Id");
      } else if (response.status === 401) {
        toast.error("Invalid User Credentials");
      } else {
        toast.success("Login Successfully");
        setLocalStorage(data.accessToken);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-200 flex justify-center items-center">
      <div className="min-w-72 w-1/4 h-3/5 border bg-slate-50 border-slate-600 rounded-xl flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col w-full ">
          <input
            type="text"
            placeholder="username"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-8/10 border border-red-700 rounded-lg outline-none text-xl text-gray-800 p-4 m-2"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-8/10 border border-red-700 rounded-lg outline-none text-xl text-gray-800 p-4 m-2"
          />
          <button
            type="submit"
            className="w-8/10 border border-red-700 rounded-lg p-4 m-2 font-semibold text-lg tracking-widest text-slate-100 bg-rose-700 "
          >
            Login
          </button>
          <div className="text-center text-lg text-gray-800">
            Don't have an account{" "}
            <Link
              to="/register"
              className="text-rose-700 hover:text-rose-800 hover:underline hover:underline-offset-4"
            >
              {" "}
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
