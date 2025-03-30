import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllAppliedJobs } from "../store/slices/jobSlice";

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${APPLICATION_API_END_POINT}/get-applied-jobs`, { withCredentials: true});
                console.log(response.data.application)
                dispatch(setAllAppliedJobs(response.data.application))
            } catch (error) {
                console.log(error)
            }
        };

        fetchAppliedJobs();
    }, []);
}

export default useGetAllAppliedJobs;
