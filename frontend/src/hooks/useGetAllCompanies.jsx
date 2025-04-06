import React, { useEffect } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setCompanies } from "../store/slices/companySlice";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get/companies`, {withCredentials: true})
                dispatch(setCompanies(response.data.companies))
            } catch (error) {
                console.log(error)
            }
        };
        fetchAllCompanies();
    }, [])
};

export default useGetAllCompanies;
