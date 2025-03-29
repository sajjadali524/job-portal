import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { profileFields } from "../constants/updateProfileFields";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";

const UpdateProfile = ({setIsFormOpen}) => {
  const dispatch = useDispatch();
  const {user, loading} = useSelector(store => store.auth);
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    bio: "",
    skills: ""
  });

  useEffect(() => {
    if(user) {
      setInputData({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(",") || ""
      })
    }
  }, [user]);

  const handleInput = (e) => {
    setInputData({...inputData, [e.target.name]: e.target.value})
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const response = await axios.put(`${USER_API_END_POINT}/profile/update/${user._id}`, inputData, {withCredentials: true});

      dispatch(setUser(response.data.user));
      setIsFormOpen(false)
      navigate("/view-profile")
      toast.success(response.data.message)
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="relative w-full">
      <RiCloseLine className="absolute top-0 right-0 text-[30px] cursor-pointer" onClick={() => setIsFormOpen(false)} />

      <div className="space-y-5">
        <h1 className="font-semibold">Update Profile</h1>

        <form className="space-y-3" onSubmit={updateProfile}>
          {profileFields.map((fields, index) => {
            return (
              <div className="flex items-center gap-1" key={index}>
                <label htmlFor="" className="text-[14px] w-20">
                  {fields.title}
                </label>
                <input
                  type={`${fields.name === "resume" ? "file" : fields.name === "email" ? "email" : "text"}`}
                  className="outline-none border border-slate-300 rounded-sm px-3 py-1"
                  value={inputData[fields.name] || ""}
                  name={fields.name}
                  onChange={handleInput}
                />
              </div>
            );
          })}

          <div className="flex items-center justify-end">
            <button className="bg-black px-3 py-1 rounded-md text-white opacity-50 cursor-pointer hover:opacity-70">{loading ? <Loader /> : "Update"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;