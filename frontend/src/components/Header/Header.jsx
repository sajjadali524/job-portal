import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navbar } from "./Navbar";
import { FaBarsStaggered } from "react-icons/fa6";
import google from "../../assets/google.png";

const Header = () => {
    const [menu, setMenu] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const isLogin = false;

  return (
    <>
      {/* computer view */}
      <div className="lg:flex hidden md:flex item-center justify-between fixed top-0 left-0 w-full lg:px-20 md:px-10 px-3 shadow-sm py-4 z-50 bg-white">
        <div>
          <h1 className="font-semibold">
            JOB<span className="text-purple-500"> HUB</span>
          </h1>
        </div>

        <div className="flex items-center space-x-10">
          {navbar.map((item, index) => {
            return (
              isLogin && item.title === "Login" ? <img src={google} alt="logo" className="w-5 h-5 cursor-pointer" key={index} onClick={() => setIsClick(!isClick)} /> || item.path === "" : <NavLink
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

      <div className={`flex flex-col px-3 py-2 space-y-2 fixed z-50 top-[58px] shadow-lg bg-white transition-transform duration-300 ease-in-out rounded-sm ${window.screen.width <= 1023 ? "right-1" : "right-6"} ${isClick ? "translate-x-0" : "translate-x-[300px]"}`} onClick={() => setIsClick(false)}>
        <Link to="/view-profile" className="shadow-md py-1 px-3 font-medium text-[15px]">View Profile</Link>
        <button className="shadow-md py-1 px-3 cursor-pointer font-medium text-[15px]">Logout</button>
      </div>

      {/* mobile view */}
      <div className="lg:hidden md:hidden fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between w-full shadow-sm px-3 py-4 bg-white">
          <h1 className="font-semibold">
            JOB<span className="text-purple-500"> HUB</span>
          </h1>
          <div className="flex items-center space-x-5">
            {isLogin && <img src={google} alt="logo" className="w-4 h-4 cursor-pointer" onClick={() => setIsClick(!isClick)} />}
            <FaBarsStaggered className="text-purple-500" onClick={() => setMenu(!menu)} />
          </div>
        </div>

        <div className={`fixed top-[57px] left-0 flex flex-col space-x-10 h-screen bg-white transition-transform duration-300 ease-in-out space-y-5 px-3 pt-10 w-full z-50 ${menu ? "translate-x-0" : "-translate-x-full"}`}>
          {navbar.map((item, index) => {
            return (
              isLogin && item.title === "Login" ? "" : <NavLink
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