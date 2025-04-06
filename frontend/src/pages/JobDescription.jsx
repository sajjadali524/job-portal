import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constant";
import { setSingleJob } from "../store/slices/jobSlice";
import { useParams } from "react-router-dom";

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get-job-by-id/${id}`, { withCredentials: true });
                if (response.data.job) {
                    dispatch(setSingleJob(response.data.job));
                    setIsApplied(response.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [id, dispatch, user?._id]);

    const applyJob = async () => {
        try {
            const response = await axios.post(`${APPLICATION_API_END_POINT}/apply/${singleJob._id}`, {}, { withCredentials: true });
            if (response.data.newApplication) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="lg:px-20 md:px-10 px-3 pt-10">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-medium">{singleJob.title}</h1>
                    <button
                        className={`px-3 py-2 font-medium rounded-md text-white cursor-pointer ${isApplied ? "bg-gray-500" : "bg-purple-500 hover:bg-purple-600"}`}
                        disabled={isApplied}
                        onClick={isApplied ? null : applyJob}
                    >
                        {isApplied ? "Applied" : "Apply Now"}
                    </button>
                </div>
                <div className="flex items-center gap-5">
                    <span className="px-3 py-1 font-medium rounded-md border border-slate-200 text-blue-600">{singleJob.position} Position</span>
                    <span className="px-3 py-1 font-medium rounded-md border border-slate-200 text-green-500">{singleJob.jobType}</span>
                    <span className="px-3 py-1 font-medium rounded-md border border-slate-200 text-purple-500">{singleJob.salary}K</span>
                </div>

                <h1 className="w-full border-b border-slate-300 font-medium pt-5">Job Description</h1>

                <div className="space-y-2">
                    <h1 className="font-medium text-[17px]">Role : <span className="font-normal"> {singleJob.title}</span></h1>
                    <h1 className="font-medium text-[17px]">Location : <span className="font-normal"> {singleJob.location}</span></h1>
                    <h1 className="font-medium text-[17px]">Description : <span className="font-normal"> {singleJob.description}</span></h1>
                    <h1 className="font-medium text-[17px]">Experience : <span className="font-normal"> {singleJob.experienceLevel}</span></h1>
                    <h1 className="font-medium text-[17px]">Requirements : <span className="font-normal"> {singleJob.requirement.join(",")}</span></h1>
                    <h1 className="font-medium text-[17px]">Salary : <span className="font-normal"> {singleJob.salary}K</span></h1>
                    <h1 className="font-medium text-[17px]">Total Applicants : <span className="font-normal"> {singleJob.applications?.length}</span></h1>
                    <h1 className="font-medium text-[17px]">Posted Date : <span className="font-normal"> {singleJob.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;