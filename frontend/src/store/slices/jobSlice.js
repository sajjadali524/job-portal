import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        searchedQuery: "",
        allAppliedJobs: []
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
        }
    }
});

export const { setAllJobs, setSearchedQuery, setAllAppliedJobs } = jobSlice.actions;
export default jobSlice.reducer;