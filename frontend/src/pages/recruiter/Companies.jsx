import React from "react";
import { Link } from "react-router-dom";

const Companies = () => {
    const tableHead = ["Logo", "Name", "Date", "action"];
  return (
    <div className="lg:px-28 md:px-20 px-3 pt-16 space-y-5">
        <div className="flex items-center justify-between">
            <input type="text" placeholder="Filter by name" className="outline-none border border-slate-200 px-3 py-1 rounded-md opacity-70" />
            <Link to="/recruiter/companies/create" className="bg-purple-500 px-5 py-2 rounded-md text-white cursor-pointer font-medium">New Company</Link>
        </div>

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
                <tr className="border-b border-slate-200">
                    <td className="p-2">ho</td>
                    <td className="p-2">ho</td>
                    <td className="p-2">ho</td>
                    <td className="text-right p-2">...</td>
                </tr>
            </tbody>
        </table>

        <p className="text-center opacity-50">A list of your recent registered company</p>
    </div>
  )
}

export default Companies;
