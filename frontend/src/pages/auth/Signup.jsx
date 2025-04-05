import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../store/slices/authSlice';
import axios from "axios";
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from "react-toastify";
import Loader from '../../components/Loader';

const Signup = () => {
  const [inputData, setInputData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    profilePhoto: "",
    role: ""
  });

  const dispatch = useDispatch();
  const {loading} = useSelector(store => store.auth);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInputData({...inputData, [e.target.name]: e.target.value})
  };

  const handleFile = (e) => {
    setInputData({...inputData, profilePhoto: e.target.files?.[0]})
  };

  const registerAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(inputData).forEach((key) => {
      formData.append(key, inputData[key])
    });

    console.log(formData)
    
    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      navigate("/login");
      toast.success(response.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="w-full flex justify-center items-center lg:px-20 md:px-10 px-3" style={{height: "calc(100vh - 56px)"}}>
      <form onSubmit={registerAccount} className="bg-purple-300 lg:w-1/3 md:w-1/2 w-1/1 p-5 rounded-md text-center space-y-3">
        <h1 className="font-semibold text-purple-800">Create Account</h1>

        <div className="flex flex-col gap-3">
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleInput} className="outline-none bg-gray-100 border border-slate-200 px-3 py-1 rounded-sm" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleInput} className="outline-none bg-gray-100 border border-slate-200 px-3 py-1 rounded-sm" />
          <input type="email" name="email" placeholder="Email" onChange={handleInput} className="outline-none bg-gray-100 border border-slate-200 px-3 py-1 rounded-sm" />
          <input type="password" name="password" placeholder="Password" onChange={handleInput} className="outline-none bg-gray-100 border border-slate-200 px-3 py-1 rounded-sm" />
          <input type="file" name="profilePhoto" accept="image/*" onChange={handleFile} className="outline-none bg-gray-100 border border-slate-200 px-3 py-1 rounded-sm cursor-pointer" />

          <div className="bg-gray-100 border border-slate-200 py-1 flex items-center justify-center gap-16 rounded-sm">
            <div className="flex items-center gap-2">
              <input type="radio" name="role" value="student" onChange={handleInput} />
              <label htmlFor="">Student</label>
            </div>

            <div className="flex items-center gap-2">
              <input type="radio" name="role" value="recruiter" onChange={handleInput} />
              <label htmlFor="">Recruiter</label>
            </div>
          </div>

          <p className="text-right">Already have an account? <Link to="/login" className="text-purple-950">Login</Link></p>
          <button className="rounded-sm bg-gray-100 py-1 cursor-pointer hover:bg-purple-800 hover:text-white transition-all">{loading ? <Loader /> : "Register Account"}</button>
        </div>
      </form>
    </div>
  )
}

export default Signup;
