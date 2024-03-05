import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full h-[80px] flex justify-between items-center bg-rose-700 text-slate-200 text-lg tracking-widest font-semibold transition all duration-300 ">
      {/* Home */}
      <span className="p-5">
        <Link to="/">Home</Link>
      </span>
      {/* Route Links */}
      <div className="hidden md:w-4/6 md:flex">
        <ul className="w-full flex justify-around">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createrecipe">Create Recipe</Link>
          </li>
          <li>
            <Link to="/savedrecipe">Saved Recipe</Link>
          </li>
          <li>
            <Link to="/login">Login/Sign Up</Link>
          </li>
        </ul>
      </div>
      {/* Responsive Navbar */}
      <div className="flex flex-end md:hidden p-5">
        <div>
          <button
            onClick={() => setShow(!show)}
            className="transition ease-in-out duration-500"
          >
            {show ? <GrClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>
      {/* Responsive Nav Links */}
      <div
        className={`fixed top-[80px] w-full h-full p-5 bg-rose-700 md:hidden ${
          show ? "translate-x-0" : "translate-x-full"
        } transition ease-in-out duration-700`}
      >
        <ul className="flex flex-col h-4/6 justify-evenly items-center">
          <li>
            <Link to="/" onClick={() => setShow(!show)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/createrecipe" onClick={() => setShow(!show)}>
              Create Recipe
            </Link>
          </li>
          <li>
            <Link to="/savedrecipe" onClick={() => setShow(!show)}>
              Saved Recipe
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setShow(!show)}>
              Login/Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
