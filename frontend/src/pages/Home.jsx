import React from "react";
import back_image from "../assets/background/background-1.jpg";
import { IoSearch } from "react-icons/io5";
import JobCard from "../components/JobCard";

const Home = () => {
  return (
    <>
      <div
        className="relative w-full bg-cover bg-center flex flex-col items-center justify-center lg:px-28 md:px-20 px-3"
        style={{
          backgroundImage: `url(${back_image})`,
          height: "calc(100vh - 56px)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        ></div>

        <div className="relative z-10 text-center text-white space-y-2">
          <h1 className="font-semibold lg:text-[40px] md:text-[35px] text-[20px]">
            <span className="text-green-500">2,568</span> job available
          </h1>
          <h1 className="font-semibold lg:text-[40px] md:text-[35px] text-[20px]">
            You can choose your dream job
          </h1>
          <p className="lg:text-[14px] md:text-[12px] text-[10px] font-medium">
            Find great job for build your bright career. Have many job in this
            platform.
          </p>

          <div className="relative z-10 flex items-center bg-white rounded-full shadow-lg mt-7">
            <input
              type="text"
              placeholder="Find your job"
              className="outline-none px-4 py-2 w-full text-black rounded-l-full"
            />
            <button className="bg-green-500 p-3 cursor-pointer rounded-r-full">
              <IoSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:px-20 md:px-10 px-3 pt-10 w-full">
        <div className="flex flex-colietms-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="font-semibold text-[30px] text-center text-purple-500">
              Recent Jobs Opening
            </h1>
            <div className="w-24 h-1 bg-green-500 rounded-md"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 items-center justify-items-center pt-10">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </>
  );
};

export default Home;