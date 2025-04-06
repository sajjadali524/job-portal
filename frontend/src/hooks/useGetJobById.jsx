import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setSingleJob } from "../store/slices/jobSlice";
import { useParams } from "react-router-dom";

const useGetJobById = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        const getSingleJob = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get-job-by-id/${id}`, {withCredentials: true});
                dispatch(setSingleJob(response.data.jobs))
            } catch (error) {
                console.log(error)
            }
        };

        getSingleJob();
    }, [])
}

export default useGetJobById;