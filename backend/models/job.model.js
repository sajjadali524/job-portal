import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirement: [{
        type: String,
        required: true
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
    }],
}, {timestamps: true});

export const Job = mongoose.model("jobs", jobSchema);