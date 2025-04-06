import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        searchedQuery: "",
        allAppliedJobs: [],
        searchJobByText: "",
        recruiterJobs: [],
        singleJob: null
    },

    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setRecruiterJobs: (state, action) => {
            state.recruiterJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
    }
});

export const { setAllJobs, setSearchedQuery, setAllAppliedJobs, setSearchJobByText, setRecruiterJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;