import React from "react";
import back_image from "../assets/background/background-1.jpg";
import JobCard from "../components/JobCard";
import HomeHeroSearchAndCategory from "../components/HomeHeroSearchAndCategory";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);

  return (
    <>
      <div className="relative w-full bg-cover bg-center flex flex-col items-center justify-center lg:px-28 md:px-20 px-3"
        style={{
          backgroundImage: `url(${back_image})`,
          height: "calc(100vh - 56px)",}}>

        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}></div>

        <div className="relative flex flex-col items-center justify-center z-10 text-center text-white space-y-2 w-full">
          <h1 className="font-semibold lg:text-[40px] md:text-[35px] text-[25px]">
            <span className="text-green-500">{allJobs?.length}</span> job available
          </h1>
          <h1 className="font-semibold lg:text-[40px] md:text-[35px] text-[23px]">
            You can choose your dream job
          </h1>
          <p className="lg:text-[14px] md:text-[12px] text-[11px] font-medium">
            Find great job for build your bright career. Have many job in this
            platform.
          </p>

          <HomeHeroSearchAndCategory />

        </div>
      </div>

      <div className="lg:px-20 md:px-10 px-3 pt-10 w-full">
        <div className="flex flex-colietms-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="font-semibold text-[25px] text-center opacity-90">
              RECENT JOB OPENINGS
            </h1>
            <div className="w-24 h-1 bg-purple-500 rounded-md"></div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center justify-items-center pt-10">
          {
            allJobs?.length <= 0 ? <p>No jobs available</p> : allJobs?.slice(0, 6).map((job) => <JobCard key={job._id} job={job} />)
          }
        </div>
      </div>
    </>
  );
};

export default Home;