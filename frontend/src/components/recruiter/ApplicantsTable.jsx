import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ApplicantsTable = () => {
    const tableHead = ["Full Name", "Email", "Contact", "Date", "Action"];
    const { applicant } = useSelector(store => store.applicant);
    const navigate = useNavigate();

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
                applicant?.length > 0 ? applicant.map((item) => {
                    return(
                        <tr key={item._id} className="border-b border-slate-200 opacity-70">
                            <td className="p-2"><img src={item.logo} alt="logo" className="w-7 h-7 rounded-full" /></td>
                            <td className="p-2">{item.companyName}</td>
                            <td className="p-2">{item.createdAt.split("T")[0]}</td>
                            <td className="p-2 flex items-center justify-end h-full text-[20px]" onClick={() => navigate(`/recruiter/companies/${item._id}`)}><FiEdit /></td>
                        </tr>
                    )
                }): <tr><td colSpan="5" className="p-4 text-center">Applicants not applied yet..</td></tr>
               }
            </tbody>
        </table>
  )
}

export default ApplicantsTable;