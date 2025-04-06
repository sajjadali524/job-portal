import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";

const CompanySetup = () => {
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: ""
  });
  const {id} = useParams();
  const navigate = useNavigate();
  const { singleCompany } = useSelector(store => store.company);


  const handleInput = (e) => {
    setInputData({...inputData, [e.target.name]: e.target.value})
  };

  const handleFile = (e) => {
    setInputData({...inputData, logo: e.target.files?.[0]})
  };

  const updateCompany = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(inputData).forEach((key) => {
      formData.append(key, inputData[key])
    });

    try {
      const response = await axios.put(`${COMPANY_API_END_POINT}/update/company/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if(response.data.company) {
        navigate("/recruiter/companies")
      };

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if(singleCompany) {
      setInputData({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
      })
    }
  }, [singleCompany]);

  return (
    <div className="flex items-center justify-center w-full pt-16">
      <div className="w-1/2 shadow-xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer opacity-70" onClick={() => navigate("/recruiter/companies/create")}>
            <FaArrowLeftLong />
            <p className="font-medium">Back</p>
          </div>
          <h1 className="text-[20px] font-medium opacity-90">Company Setup</h1>
          </div>

          <form className="pt-8 opacity-80" onSubmit={updateCompany}>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="font-medium">Company Name</label>
                <input type="text" name="name" value={inputData.name} className="outline-none border border-slate-200 px-3 py-1 rounded-md" disabled onChange={handleInput} />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Description</label>
                <input type="text" name="description" value={inputData.description} className="outline-none border border-slate-200 px-3 py-1 rounded-md" onChange={handleInput} />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Website</label>
                <input type="text" name="website" value={inputData.website} className="outline-none border border-slate-200 px-3 py-1 rounded-md" onChange={handleInput} />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Location</label>
                <input type="text" name="location" value={inputData.location} className="outline-none border border-slate-200 px-3 py-1 rounded-md" onChange={handleInput} />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Logo</label>
                <input type="file" name="logo" className="outline-none border border-slate-200 px-3 py-1 rounded-md" onChange={handleFile} />
              </div>
            </div>

            <button className="py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium w-full rounded-md mt-5 cursor-pointer">Update</button>
          </form>
      </div>
    </div>
  )
}

export default CompanySetup;
