import React from "react";

const AppliedJobs = () => {
  const tableHead = ["Date", "Job Role", "Company", "Status"];
  const tableData = [
    {
      date: "2024-03-28",
      role: "Software Engineer",
      company: "Google",
      status: "Pending",
    },
    {
      date: "2024-03-27",
      role: "Frontend Developer",
      company: "Meta",
      status: "Accepted",
    },
    {
      date: "2024-03-26",
      role: "Backend Developer",
      company: "Amazon",
      status: "Rejected",
    },
  ];
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
          {tableData.map((item, index) => {
            return (
              <tr
                key={index}
                className={`${
                  index === tableData.length - 1
                    ? ""
                    : "border-b border-slate-200"
                }`}
              >
                <td className="px-3 py-2 opacity-80 text-[15px]">
                  {item.date}
                </td>
                <td className="px-3 py-2 opacity-80 text-[15px]">
                  {item.role}
                </td>
                <td className="px-3 py-2 opacity-80 text-[15px]">
                  {item.company}
                </td>
                <td className="px-3 py-2 opacity-80 text-[15px]">
                  {item.status}
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