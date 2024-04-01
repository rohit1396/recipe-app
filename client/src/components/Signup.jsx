import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://recipe-app-qzae.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userName: userName,
            password: password,
            confirm_password: confirm_password,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 400) {
        toast.error("Please Fill The Required Fields");
      } else if (response.status === 409) {
        toast.error("User Already Exists");
      } else if (response.status === 401) {
        toast.error("Passwords Not Matching");
      } else {
        toast.success("User Registered Successfull");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200">
      <div className="min-w-72 w-1/4 h-3/5 flex justify-center bg-slate-50 items-center border border-slate-600 rounded-md">
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <input
            type="text"
            placeholder="username"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-8/10 text-lg text-gray-800 border border-red-700 rounded-md outline-none p-4 m-2"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-8/10 text-lg text-gray-800 border border-red-700 rounded-md outline-none p-4 m-2"
          />
          <input
            type="password"
            placeholder="confirm password"
            name="confirm_password"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
            className="w-8/10 text-lg text-gray-800 border border-red-700 rounded-md outline-none p-4 m-2"
          />
          <button
            type="submit"
            className="w-8/10 text-lg text-slate-100 bg-rose-700 tracking-widest border rounded-md outline-none p-4 m-2"
          >
            Register
          </button>
          <div className="text-center text-lg text-gray-800">
            Already have an account{" "}
            <Link
              to="/login"
              className="text-rose-700 hover:text-rose-800 hover:underline hover:underline-offset-4"
            >
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
