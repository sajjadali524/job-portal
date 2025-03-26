import React from "react";
import google from "../assets/google.png";

const JobCard = () => {
  return (
    <div className="w-[380px] p-5 border space-y-3">
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 flex items-center justify-center bg-red-500">
                <img src={google} alt="logo" className="w-5 h-5" />
            </div>
            <div className="">
                <h1 className="text-md font-semibold">Google</h1>
                <p className="text-sm">Lahore, Pakistan</p>
            </div>
        </div>

        <div>
            <h1 className="text-md font-semibold">Frontend Developer</h1>
            <span className="text-green-500 font-semibold text-sm bg-green-100 p-1">Part-time</span>
        </div>

        <p className="text-[15px] opacity-70">CSS, HTML, JAVASCRIPT developer needed</p>

        <div className="flex items-center justify-between pt-3">
            <h1 className="text-md font-semibold">20,000PKR</h1>
            <button className="font-medium bg-green-600 px-3 py-1 rounded-sm text-white cursor-pointer">Apply Now</button>
        </div>
    </div>
  )
}

export default JobCard;