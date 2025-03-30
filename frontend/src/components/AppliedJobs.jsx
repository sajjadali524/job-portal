import React from "react";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  const tableHead = ["Date", "Job Role", "Company", "Status"];
  const {allAppliedJobs} = useSelector(store => store.job);

  return (
    <div className="overflow-x-auto">
      <table
        className={`w-full text-left ${
          window.screen.width < 500 && "min-w-max"
        }`}
      >
        <thead>
          <tr className="border-b border-slate-200">
            {tableHead.map((item, index) => {
              return (
                <th key={index} className="px-3 py-2 opacity-80">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {allAppliedJobs?.map((job, index) => {
            return (
              <tr
                key={index}
                className={`${
                  index === allAppliedJobs?.length - 1
                    ? ""
                    : "border-b border-slate-200"
                }`}
              >
                <td className="px-3 py-2 opacity-70 text-[15px]">
                  {job?.createdAt?.split("T")[0]}
                </td>
                <td className="px-3 py-2 opacity-70 text-[15px]">
                  {job?.job?.title}
                </td>
                <td className="px-3 py-2 opacity-70 text-[15px]">
                  {job?.job?.company?.name}
                </td>
                <td className={`px-3 opacity-80 text-[15px] font-medium ${job.status === "Accepted" ? "text-green-500" : job.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                  {job?.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobs;