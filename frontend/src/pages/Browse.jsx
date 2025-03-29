import React, { useEffect } from "react";
import JobCard from "../components/JobCard";
import { useSelector, useDispatch } from "react-redux";
import { setSearchedQuery } from "../store/slices/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(""))
  }, []);

  return (
    <div className=" lg:px-20 md:px-10 px-3 mt-10 space-y-5">
      <h1 className="font-medium">All Jobs <span className="font-semibold">{`(${allJobs?.length})`}</span></h1>
      <div className="grid lg:grid-cols-3 md:grid-cos-2 grid-cols-1 gap-5">
        {
          allJobs?.length <= 0 ? <span>No jobs available</span> : allJobs?.map((job) => <JobCard key={job._id} job={job} />)
        }
      </div>
    </div>
  )
}

export default Browse;