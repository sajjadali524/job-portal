import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// apply for job
export const applyForJob = async (req, res) => {
    const userId = req.user._id;
    const jobId = req.params.id;
    try {
        if(!jobId) {
            return res.status(400).json({message: "Job not found1"})
        };

        // check is user alredy applied for this job
        const existingApplication = await Application.findOne({job: jobId, applicant: userId});
        if(existingApplication) {
            return res.status(400).json({message: "You have already applied for this job!"})
        };

        // check as the job exist
        const job = await Job.findById(jobId);
        if(!job) {
            return res.status(400).json({message: "Job not exist!"})
        };

        // create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id)
        await job.save();
        return res.status(200).json({message: "Job applied successfully!", newApplication})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal serveer error"})
    }
};

// get applied jobs 
export const getAppliedJobs = async(req, res) => {
    const userId = req.user._id;
    try {
        const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: "job",
            options:{sort:{createdAt: -1}},
            populate:{
                path: "company",
                options:{sort:{createdAt: -1}},
            }
        })
        if(!application) {
            return res.status(400).json({message: "No Applications exist!"})
        };

        return res.status(200).json({message: "Application found!", application});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};

// admin dekhe ga kitne loogo ne apply kiya hy
export const getApplicants = async(req, res) => {
    const jobId = req.params.id;
    try {
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path: "applicant"
            }
        })
        if(!job) {
            return res.status(400).json({message: "Job not found!"})
        };

        return res.status(200).json({message: "jobs found!", job});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};

//update status
export const updateStatus = async (req, res) => {
    const { status } = req.body;
    const applicationId = req.params.id;
    console.log(applicationId)
    try {
        if(!status){
            return res.status(400).json({message:"status is required"})
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({message:"Application not found."})
        };

        // update status
        application.status = status;
        await application.save();

        return res.status(200).json({message: "Status changes successfully!"});

    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};