import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navbar } from "./Navbar";
import { FaBarsStaggered } from "react-icons/fa6";
import google from "../../assets/google.png";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const isLogin = true;

  return (
    <>
      {/* computer view */}
      <div className="lg:flex hidden md:flex item-center justify-between fixed top-0 left-0 w-full lg:px-20 md:px-10 px-3 shadow-sm py-4 z-50 bg-white">
        <div>
          <Link to="/" className="font-semibold">
            JOB<span className="text-purple-500"> HUB</span>
          </Link>
        </div>

        <div className="flex items-center space-x-10">
          {navbar.map((item, index) => {
            return isLogin && item.title === "Login" ? (
              (
                <img
                  src={google}
                  alt="logo"
                  className="w-5 h-5 cursor-pointer"
                  key={index}
                  onClick={() => setIsClick(!isClick)}
                />
              ) || item.path === ""
            ) : (
              <NavLink
                to={item.path}
                key={index}
                className="text-gray-900 font-semibold"
                activeclassname="active"
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div
        className={`flex flex-col py-2 space-y-4 fixed z-50 top-[58px] shadow-lg bg-white transition-transform duration-300 ease-in-out rounded-sm ${
          window.screen.width <= 1023 ? "right-1" : "right-6"
        } ${isClick ? "translate-x-0" : "translate-x-[300px]"}`}
        onClick={() => setIsClick(false)}
      >
        <div className="flex items-center gap-5 py-2 border-b border-slate-200 px-5">
          <img src={google} alt="logo" className="w-7 h-7 cursor-pointer" />
          <div className="opacity-80">
            <h1 className="font-medium text-[13px]">Sajjad Ali</h1>
            <p className="font-normal text-[13px]">Lahore</p>
          </div>
        </div>
        <div className="flex flex-col px-5 space-y-2">
          <div className="flex items-center gap-3">
            <CgProfile />
            <Link to="/view-profile" className="font-medium text-[15px]">
              View Profile
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <TbLogout />
            <button className="cursor-pointer font-medium text-[15px]">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="lg:hidden md:hidden fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between w-full shadow-sm px-3 py-4 bg-white">
          <Link to="/" className="font-semibold">
            JOB<span className="text-purple-500"> HUB</span>
          </Link>
          <div className="flex items-center space-x-5">
            {isLogin && (
              <img
                src={google}
                alt="logo"
                className="w-4 h-4 cursor-pointer"
                onClick={() => setIsClick(!isClick)}
              />
            )}
            <FaBarsStaggered
              className="text-purple-500"
              onClick={() => setMenu(!menu)}
            />
          </div>
        </div>

        <div
          className={`fixed top-[57px] left-0 flex flex-col space-x-10 h-screen bg-white transition-transform duration-300 ease-in-out space-y-5 px-3 pt-10 w-full z-50 ${
            menu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {navbar.map((item, index) => {
            return isLogin && item.title === "Login" ? (
              ""
            ) : (
              <NavLink
                onClick={() => setMenu(false)}
                to={item.path}
                key={index}
                className="text-gray-900 font-semibold"
                activeclassname="active"
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Header;