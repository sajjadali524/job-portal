import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { navbar } from "./Navbar";
import { FaBarsStaggered } from "react-icons/fa6";

const Header = () => {
    const [menu, setMenu] = useState(false);

  return (
    <>
      {/* computer view */}
      <div className="lg:flex hidden md:flex item-center justify-between fixed top-0 left-0 w-full lg:px-20 md:px-10 px-3 shadow-sm py-4 z-50 bg-white">
        <div>
          <h1 className="font-semibold">
            JOB<span className="text-purple-500"> HUB</span>
          </h1>
        </div>

        <div className="space-x-10">
          {navbar.map((item, index) => {
            return (
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

      {/* mobile view */}
      <div className="lg:hidden md:hidden fixed top-0 left-0 w-full">
        <div className="flex items-center justify-between w-full shadow-sm px-3 py-4">
          <h1 className="font-semibold">
            JOB<span className="text-purple-500"> HUB</span>
          </h1>
        <FaBarsStaggered className="text-purple-500" onClick={() => setMenu(!menu)} />
        </div>

        <div className={`flex flex-col space-x-10 h-screen w-full bg-white transition-transform duration-300 ease-in-out space-y-5 px-3 pt-10 ${menu ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}`}>
          {navbar.map((item, index) => {
            return (
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