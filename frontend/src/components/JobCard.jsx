import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({job}) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full p-5 shadow-lg space-y-5 rounded-md border border-slate-100">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
          <img src={job?.company?.logo} alt="logo" className="w-8 h-8 rounded-full" />
        </div>
        <div className="opacity-90">
          <h1 className="text-md font-semibold">{job?.company?.companyName}</h1>
          <p className="text-sm">{job?.location}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-md font-semibold">{job?.title}</h1>
        <span className="text-green-500 font-semibold text-sm bg-green-100 p-1 px-2">{job?.jobType}</span>
      </div>

      <p className="text-[14px] opacity-70 font-600">{job?.requirement.join(",")}</p>

      <div className="flex items-center justify-between pt-3 gap-24">
        <h1 className="text-md font-semibold">{job?.salary}K</h1>
        <button onClick={() => navigate(`/job/description/${job._id}`)} className="font-medium bg-green-600 px-3 py-1 rounded-sm text-white cursor-pointer">
          Detail
        </button>
      </div>
    </div>
  );
};

export default JobCard;