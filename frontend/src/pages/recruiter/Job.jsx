import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetAllRecruiterJob from "../../hooks/useGetAllRecruiterJob";
import { setSearchJobByText } from "../../store/slices/jobSlice";
import JobsTable from "../../components/recruiter/JobsTable";

const Job = () => {
    useGetAllRecruiterJob();
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(inputText))
    }, [inputText, dispatch])

  return (
    <div className="lg:px-28 md:px-20 px-3 pt-16 space-y-5">
        <div className="flex items-center justify-between">
            <input type="text" placeholder="Filter by company Name or Role" className="outline-none border border-slate-200 px-3 py-2 rounded-md opacity-70" onChange={(e) => setInputText(e.target.value)} />
            <Link to="/recruiter/jobs/create" className="bg-purple-500 lg:px-5 md:px-5 px-2 py-2 rounded-md text-white cursor-pointer font-medium">New Job</Link>
        </div>

        <JobsTable />

        <p className="text-center opacity-50">A list of your recent posted jobs</p>
    </div>
  )
}

export default Job;