import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useAuth } from "../context/context";
import { SiFoodpanda } from "react-icons/si";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { userLoggedIn } = useAuth();
  return (
    <div className="w-full h-[80px] fixed top-0 flex justify-between items-center bg-rose-700 text-slate-200 text-lg tracking-widest font-semibold transition all duration-300 ">
      {/* Home */}
      <span className="p-5">
        <Link to="/">
          <SiFoodpanda className="w-12 h-16 text-slate-50" />
        </Link>
      </span>

      {/* Route Links */}
      <div className="hidden md:w-4/6 md:flex">
        <ul className="w-full flex items-center justify-around">
          <li>
            <Link to="/createrecipe">Create Recipe</Link>
          </li>
          <li>
            <Link to="/savedrecipe">Saved Recipe</Link>
          </li>
          {userLoggedIn ? (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login/Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
      {/* Responsive Navbar */}
      <div className="flex flex-end md:hidden p-5">
        <div>
          <button
            onClick={() => setShow(!show)}
            className="transition ease-in-out duration-500"
          >
            {show ? (
              <GrClose className="w-8 h-8 text-slate-50" />
            ) : (
              <GiHamburgerMenu className="w-8 h-8 text-slate-50" />
            )}
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
            <Link to="/createrecipe" onClick={() => setShow(!show)}>
              Create Recipe
            </Link>
          </li>
          <li>
            <Link to="/savedrecipe" onClick={() => setShow(!show)}>
              Saved Recipe
            </Link>
          </li>
          {userLoggedIn ? (
            <li>
              <Link to="/logout" onClick={() => setShow(!show)}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={() => setShow(!show)}>
                Login/Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
