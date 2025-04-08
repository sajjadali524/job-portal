import React, { useEffect, useState } from "react";
import FilterJobsCategory from "../components/FilterJobsCategory";
import JobCard from "../components/JobCard";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if(searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const jobTitle = job?.title?.toLowerCase() || "";
        const jobLocation = job?.location?.toLowerCase() || "";
        const jobSalary = job?.salary || 0; // Salary stored as a number
      
        let minSalary = null;
        let maxSalary = null;
      
        // Check if the query is in "10K - 30K" format
        const salaryMatch = searchedQuery.match(/(\d+)K\s*-\s*(\d+)K/);
        if (salaryMatch) {
          minSalary = parseInt(salaryMatch[1]); // Extract "10" from "10K"
          maxSalary = parseInt(salaryMatch[2]); // Extract "30" from "30K"
        }
      
        return (
          jobTitle.includes(searchedQuery.toLowerCase()) ||
          jobLocation.includes(searchedQuery.toLowerCase()) ||
          (minSalary !== null && maxSalary !== null
            ? jobSalary >= minSalary && jobSalary <= maxSalary // Salary range check
            : jobSalary.toString().includes(searchedQuery)) // If not a range, check normally
        );
      });
      
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery]);
  
  return (
    <div className="lg:flex block space-x-5 lg:px-20 md:px-10 px-3 lg:mt-10 mt-5">
      <FilterJobsCategory />
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 lg:mt-0 mt-5">
        {
          filterJobs?.length <= 0 ? <span>No jobs available</span> : filterJobs?.map((job) => <JobCard key={job._id} job={job} />)
        }
      </div>
    </div>
  )
}

export default Jobs;