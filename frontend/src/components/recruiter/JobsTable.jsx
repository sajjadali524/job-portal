import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useGetAllRecruiterJob from "../../hooks/useGetAllRecruiterJob";

const JobsTable = () => {
    useGetAllRecruiterJob();
    const tableHead = ["Company Name", "Role", "Date", "action"];
    const { recruiterJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(recruiterJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = recruiterJobs?.filter((job) => {
            if(!searchJobByText) {
                return true
            };
            return job?.company?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase())
            || job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJob(filteredJobs)
    }, [recruiterJobs, searchJobByText]);

  return (
    <table className="w-full border border-slate-200 rounded-md opacity-70">
            <thead>
                <tr className="border-b border-slate-200">
                    {
                        tableHead.map((item, index) => {
                            return(
                                <th key={index} className={`p-2 ${index === tableHead.length - 1 ? "text-right" : "text-left"}`}>{item}</th>
                            )
                        })
                    }
                </tr>
            </thead>

            <tbody>
               {
                filterJob?.length > 0 ? filterJob.map((item) => {
                    return(
                        <tr key={item._id} className=" relative border-b border-slate-200 opacity-70">
                            <td className="p-2">{item?.company?.companyName}</td>
                            <td className="p-2">{item.title}</td>
                            <td className="p-2">{item.createdAt.split("T")[0]}</td>
                            <td className="cursor-pointer p-2 flex items-center justify-end pt-3" onClick={() => navigate(`/recruiter/jobs/${item._id}/applicants`)}><FiUsers /></td>
                        </tr>
                    )
                }): <tr><td colSpan="4" className="p-4 text-center">Job is not posted yet.</td></tr>
               }
            </tbody>
        </table>
  )
}

export default JobsTable;