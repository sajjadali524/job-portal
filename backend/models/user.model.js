import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String},
        resumeOrigionalName: {type: String},
        company: {type: mongoose.Schema.Types.ObjectId, ref: "companies"},
        profilePhoto: {
            type: String,
            default: ""
        }
    }
}, {timestamps: true});

export const User = mongoose.model("users", userSchema);