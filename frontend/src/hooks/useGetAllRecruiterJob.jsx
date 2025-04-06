import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setRecruiterJobs } from "../store/slices/jobSlice";

const useGetAllRecruiterJob = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getRecruiterJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get-recruiter-job`, {withCredentials: true});
                dispatch(setRecruiterJobs(response.data.jobs))
            } catch (error) {
                console.log(error)
            }
        };

        getRecruiterJobs();
    }, [])
}

export default useGetAllRecruiterJob;