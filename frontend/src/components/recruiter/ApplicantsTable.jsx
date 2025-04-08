import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const ApplicantsTable = () => {
    const tableHead = ["Full Name", "Email", "Contact", "Resume", "Date", "Action"];
    const [status, setStatus] = useState("Pending");
    const { applicants } = useSelector(store => store.applicant);

    const statusUpdate = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${APPLICATION_API_END_POINT}/update-status/${id}`, {status: e.target.value}, {withCredentials: true});
            setStatus(response.data.application.status)
        } catch (error) {
            console.log(error)
        }
    };

  return (
    <div className="w-full overflow-x-auto">
        <table className={`w-full text-left border border-slate-200 rounded-md opacity-70 min-w-[800px]`}>
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
                applicants?.applications?.length > 0 ?  applicants.applications.map((item) => {
                    return(
                        <tr key={item._id} className="border-b border-slate-200 opacity-70">
                            <td className="p-2">{item?.applicant?.fullName}</td>
                            <td className="p-2">{item?.applicant?.email}</td>
                            <td className="p-2">{item?.applicant?.phoneNumber}</td>
                            {
                                item?.applicant?.profile?.resume ? <td className="p-2"><a href={item?.applicant?.profile?.resume} target="_blank" className="text-blue-400 underline opacity-90">{item?.applicant?.profile?.resumeOriginalName}</a></td> : <td className="p-2">NA</td>
                            }
                            <td className="p-2">{item?.createdAt.split("T")[0]}</td>
                            <td className="flex items-center justify-end p-2 pt-3">
                                <select className="outline-none" value={item?.status}  name="status" onChange={(e) => {setStatus(e.target.value); statusUpdate(e, item?._id)}} disabled={item?.status === "Rejected" || item?.status === "Accepted"}>
                                    <option value="">{item?.staus === "Pending" ? "Pending" : status }</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Accepted">Accepted</option>
                                </select>
                            </td>
                        </tr>
                    )
                }) : <tr><td colSpan="6" className="p-4 text-center">Applicants not applied yet..</td></tr>
               }
            </tbody>
        </table>
    </div>
  )
}

export default ApplicantsTable;