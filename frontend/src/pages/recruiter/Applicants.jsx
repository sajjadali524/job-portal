import React, { useEffect } from "react";
import ApplicantsTable from "../../components/recruiter/ApplicantsTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "../../store/slices/applicantSlice";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";

const Applicants = () => {
    const dispatch = useDispatch();
    const { applicant } = useSelector(store => store.applicant)
    const {id} = useParams();

    useEffect(() => {
        const fetchApplicants = async () => {
            const response = await axios.get(`${APPLICATION_API_END_POINT}/get-applicants/${id}`, {withCredentials: true})
            if(response.data.job) {
                dispatch(setApplicants(response.data.job))
            }
        }
        fetchApplicants();
    }, []);

  return (
    <div className="lg:px-20 md:px-10 px-3 pt-10 space-y-5">
      <h1 className="text-[20px] font-semibold">Applicants ({applicant?.application?.length})</h1>
      <ApplicantsTable />
      <p className="opacity-50 text-center">A list of your recent applied users</p>
    </div>
  )
}

export default Applicants;
