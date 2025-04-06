import { Job } from "../models/job.model.js";

// create job recruiter
export const createJob = async (req, res) => {
    const { title, description, requirement, salary, experienceLevel, location, jobType, position, company, created_by } = req.body;
    const userId = req.user._id;
    try {
        if(!title || !description || !requirement || !salary || !experienceLevel || !location || !jobType || !position || !company) {
            return res.status(400).json({message: "All fields are required!"})
        };

        let requirementArray;
        if(requirement) {
            requirementArray = requirement.split(",")
        };

        const job = await Job.create({ title, description, requirement: requirementArray, salary, experienceLevel, location, jobType, position, company, created_by: userId });
        return res.status(200).json({message: "Job posted successfully!", job});

    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};

// get all job student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});
        if(!jobs) {
            return res.status(400).json({message: "Jobs not found!"})
        };

        return res.status(200).json({message: "Jobs fetch successfully!", jobs})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};

// get job by id student
export const getJobById = async(req, res) => {
    const jobId = req.params.id;
    try {
        const job = await Job.findById(jobId);
        if(!job) {
            return res.status(400).json({message: "Job not found!"})
        };

        return res.status(200).json({message: "Job fetch successfully!", job})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};

// get recruiter job
export const getRecruiterJobs = async(req, res) => {
    const adminId = req.user._id;
    try {
        const jobs = await Job.find({created_by: adminId}).populate({
            path: "company"
        }).sort({createdAt: -1});
        
        if(!jobs) {
            return res.status(400).json({message: "Job not found!"})
        };

        return res.status(200).json({message: "Job fetch successfully!", jobs})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
};