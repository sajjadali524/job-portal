import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../store/slices/jobSlice";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get-all-jobs?keyword=${searchedQuery}`, {withCredentials: true});
                dispatch(setAllJobs(response.data.jobs))
            } catch (error) {
                console.log(error)
            }
        };

        getAllJobs();
    }, [])
}

export default useGetAllJobs;