import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    role: ""
  });

  const handleInput = (e) => {
    setInputData({...inputData, [e.target.name]: e.target.value})
  };

  const LoginAccount = (e) => {
    e.preventDefault();
    console.log(inputData)
  };

  return (
    <div className="w-full flex justify-center items-center lg:px-20 md:px-10 px-3" style={{height: "calc(100vh - 56px)"}}>
      <form onSubmit={LoginAccount} className="bg-purple-300 lg:w-1/3 md:w-1/2 w-1/1 p-5 rounded-md text-center space-y-3">
        <h1 className="font-semibold text-purple-800">Login Account</h1>

        <div className="flex flex-col gap-3">
          <input type="email" name="email" placeholder="Email" onChange={handleInput} className="outline-none bg-gray-100 border border-slate-200 px-3 py-1 rounded-sm" />
          <input type="password" name="password" placeholder="Password" onChange={handleInput} className="outline-none bg-gray-100 border border-slate-200 px-3 py-1 rounded-sm" />

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

          <p className="text-right">Don't have an account? <Link to="/signup" className="text-purple-950">Register</Link></p>
          <button className="rounded-sm bg-gray-100 py-1 cursor-pointer hover:bg-purple-800 hover:text-white transition-all">Login Account</button>
        </div>
      </form>
    </div>
  )
}

export default Login;