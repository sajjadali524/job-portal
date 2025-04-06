import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "../../store/slices/companySlice";
import CompaniesTable from "../../components/recruiter/CompaniesTable";

const Companies = () => {
    useGetAllCompanies();
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(inputText))
    }, [inputText])

  return (
    <div className="lg:px-28 md:px-20 px-3 pt-16 space-y-5">
        <div className="flex items-center justify-between">
            <input type="text" placeholder="Filter by name" className="outline-none border border-slate-200 px-3 py-1 rounded-md opacity-70" onChange={(e) => setInputText(e.target.value)} />
            <Link to="/recruiter/companies/create" className="bg-purple-500 px-5 py-2 rounded-md text-white cursor-pointer font-medium">New Company</Link>
        </div>

        <CompaniesTable />

        <p className="text-center opacity-50">A list of your recent registered company</p>
    </div>
  )
}

export default Companies;
