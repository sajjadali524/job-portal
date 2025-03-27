import React from "react";
import google from "../assets/google.png";

const JobCard = () => {
  return (
    <div className="w-full p-5 shadow-lg space-y-3 rounded-md border border-slate-100">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
          <img src={google} alt="logo" className="w-5 h-5" />
        </div>
        <div className="">
          <h1 className="text-md font-semibold">Google</h1>
          <p className="text-sm">Lahore, Pakistan</p>
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-md font-semibold">Frontend Developer</h1>
        <span className="text-green-500 font-semibold text-sm bg-green-100 p-1 px-2">
          Part-time
        </span>
      </div>

      <p className="text-[14px] opacity-70 font-600">
        CSS, HTML, JAVASCRIPT developer needed
      </p>

      <div className="flex items-center justify-between pt-3">
        <h1 className="text-md font-semibold">20,000PKR</h1>
        <button className="font-medium bg-green-600 px-3 py-1 rounded-sm text-white cursor-pointer">
          Detail
        </button>
      </div>
    </div>
  );
};

export default JobCard;