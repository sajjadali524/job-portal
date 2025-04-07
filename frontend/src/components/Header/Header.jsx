import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { navbar } from "./Navbar";
import { FaBarsStaggered } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../store/slices/authSlice";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const logoutUser = async () => {
    try {
      const response = await axios.post(`${USER_API_END_POINT}/logout`, {}, {withCredentials: true});

      dispatch(setUser(null));
      navigate("/");
      toast.success(response.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      {/* computer view */}
      <div className="lg:flex hidden md:flex item-center justify-between fixed top-0 left-0 w-full lg:px-20 md:px-10 px-3 shadow-sm py-4 z-50 bg-white">
        <div>
          <Link to="/" className="font-semibold">JOB<span className="text-purple-500"> HUB</span></Link>
        </div>

        <div className="flex items-center space-x-10">
            {user?.role === "recruiter" ? (
            <>
              <NavLink to="/recruiter/companies" className="text-gray-900 font-semibold" activeclassname="active">Companies</NavLink>
              <NavLink to="/recruiter/jobs" className="text-gray-900 font-semibold" activeclassname="active">Jobs</NavLink>
              <img src={user?.profile?.profilePhoto} alt="profile" className="w-7 h-7 rounded-full cursor-pointer" onClick={() => setIsClick(!isClick)} />
            </>
            ) : (
            navbar.map((item, index) => {
              if (user && item.title === "Login") {
              return (
                <img key={index} src={user?.profile?.profilePhoto} alt="profile" className="w-7 h-7 rounded-full cursor-pointer" onClick={() => setIsClick(!isClick)} />
              )
            }

            return (
              <NavLink key={index} to={item.path} className="text-gray-900 font-semibold" activeclassname="active">
                {item.title}
              </NavLink>
            )
          })
        )}
        </div>
      </div>

      <div className={`flex flex-col py-2 space-y-4 fixed z-50 top-[58px] shadow-lg bg-white transition-transform duration-300 ease-in-out rounded-sm ${
          window.screen.width <= 1023 ? "right-1" : "right-6"
        } ${isClick ? "translate-x-0" : "translate-x-[300px]"}`}
        onClick={() => setIsClick(false)}>

        <div className="flex items-center gap-5 py-2 border-b border-slate-200 px-5">
          <img src={user?.profile?.profilePhoto} alt="profile" className="w-7 h-7 rounded-full cursor-pointer" />
          <div className="opacity-80">
            <h1 className="font-medium text-[13px]">{user?.fullName || "Guest"}</h1>
          </div>
        </div>

        <div className="flex flex-col px-5 space-y-2">
          {user?.role === "recruiter" ? null :<div className="flex items-center gap-3">
            <CgProfile />
            <Link to="/view-profile" className="font-medium text-[15px]">View Profile</Link>
          </div> }

          <div className="flex items-center gap-3">
            <TbLogout />
            <button className="cursor-pointer font-medium text-[15px]" onClick={logoutUser}>Logout</button>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="lg:hidden md:hidden fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between w-full shadow-sm px-3 py-4 bg-white">
          <Link to="/" className="font-semibold">JOB<span className="text-purple-500"> HUB</span></Link>
          <div className="flex items-center space-x-5">
            {user && (
              <img src={user?.profile?.profilePhoto} alt="profile" className="w-5 h-5 rounded-full cursor-pointer" onClick={() => setIsClick(!isClick)} />
            )}
            <FaBarsStaggered className="text-purple-500" onClick={() => setMenu(!menu)} />
          </div>
        </div>

        <div
          className={`fixed top-[57px] left-0 flex flex-col space-x-10 h-screen bg-white transition-transform duration-300 ease-in-out space-y-5 px-3 pt-10 w-full z-50 ${
            menu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col lg:space-x-10 space-y-5">
            {user?.role === "recruiter" ?
            <>
              <NavLink to="/recruiter/companies" className="text-gray-900 font-semibold" activeclassname="active">Companies</NavLink>
              <NavLink to="/recruiter/jobs" className="text-gray-900 font-semibold" activeclassname="active">Jobs</NavLink>
            </>
            :
            navbar.map((item, index) => {
              if (user && item.title === "Login") {
              return (
                <img key={index} src={user?.profile?.profilePhoto} alt="profile" className="w-7 h-7 rounded-full cursor-pointer" onClick={() => setIsClick(!isClick)} />
              );
            };

            return (
              <NavLink key={index} to={item.path} className="text-gray-900 font-semibold" activeclassname="active">
                {item.title}
              </NavLink>
            )
          }
        )}
        </div>
        </div>
      </div>
    </>
  );
};

export default Header;