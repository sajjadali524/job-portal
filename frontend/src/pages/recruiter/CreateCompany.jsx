import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/slices/authSlice";
import { setSingleCompany } from "../../store/slices/companySlice";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const CreateCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerCompany = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const response = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {withCredentials: true});
            if(response?.data?.company) {
                dispatch(setSingleCompany(response.data.company));
                toast.success(response.data.message)
                const companyId = response?.data?.company?._id;
                navigate(`/recruiter/companies/${companyId}`)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            
        } finally {
            dispatch(setLoading(false))
        }
    };

  return (
    <div className="flex items-center justify-center w-full pt-16">
        <div className="lg:w-2/4 space-y-10">
            <div className="">
                <h1 className="font-semibold text-[28px]">Your Company Name</h1>
                <p className="opacity-70">What would you like to give your company name.</p>
            </div>
            <div className="flex flex-col">
                <label className="font-medium">Company Name</label>
                <input type="text" placeholder="Jobhunt, Microsoft, etc" name="companyName" className="outline-none border border-slate-300 rounded-md px-3 py-2 opacity-70" onChange={(e) => setCompanyName(e.target.value)} />
            </div>

            <div className="space-x-3">
                <button className="px-3 py-2 rounded-md font-medium text-black border border-slate-200 cursor-pointer hover:bg-gray-100" onClick={() => navigate("/recruiter/companies")}>Cancel</button>
                <button className="px-3 py-2 rounded-md font-medium bg-purple-500 hover:bg-purple-400 text-white cursor-pointer" onClick={registerCompany}>{loading ? <Loader /> : "Continue"}</button>
            </div>
        </div>
    </div>
  )
}

export default CreateCompany;
