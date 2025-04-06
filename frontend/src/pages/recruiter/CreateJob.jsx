import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";
import { postJobFields } from "../../constants/createJobFields";
import { toast } from "react-toastify";

const CreateJob = () => {
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: "",
    company: ""
  });

  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);

  const handleInput = (e) => {
    setInputData({...inputData, [e.target.name]: e.target.value})
  };

  const postJob = async (e) => {
    e.preventDefault();
    console.log(inputData)
    try {
        const response = await axios.post(`${JOB_API_END_POINT}/create`, inputData, {withCredentials: true})
        if(response.data.job) {
          toast.success(response.data.message)
          navigate("/recruiter/jobs")
        }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center w-full pt-16">
      <div className="w-1/2 shadow-xl p-5">
          <form className="pt-8 opacity-80" onSubmit={postJob}>
            <div className="grid grid-cols-2 gap-5">
              {
                postJobFields.map((item, index) => {
                    return(
                        <div className="flex flex-col" key={index}>
                            <label className="font-medium">{item.title}</label>
                            <input type="text" name={item.name} className="outline-none border border-slate-200 px-3 py-1 rounded-md" onChange={handleInput} />
                        </div>
                    )
                })
              }

              <select name="company" onChange={handleInput} className="outline-none border border-slate-200 px-3 py-2 rounded-md">
                <option value=""  className="outline-none">Select a Company</option>
                {
                    companies.map((item) => {
                        return(
                            <option value={item._id} key={item._id}>{item.companyName}</option>
                        )
                    })
                }
              </select>
            </div>

            <button className="py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium w-full rounded-md mt-5 cursor-pointer">Post a Job</button>
          </form>
      </div>
    </div>
  )
}

export default CreateJob;