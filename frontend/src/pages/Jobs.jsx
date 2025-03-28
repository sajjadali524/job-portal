import React from "react";
import FilterJobsCategory from "../components/FilterJobsCategory";
import JobCard from "../components/JobCard";

const Jobs = () => {
  return (
    <div className="lg:flex block space-y-10 space-x-5 lg:px-20 md:px-10 px-3 lg:pt-10 pt-5">
      <FilterJobsCategory />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  )
}

export default Jobs;