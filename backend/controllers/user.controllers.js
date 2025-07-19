import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinaryconfig.js";

// register user
export const registerAccount = async (req, res) => {
    const {fullName, phoneNumber, email, password, role} = req.body;
    try {
        if(!fullName || !phoneNumber || !email || !password || !role){
            return res.status(400).json({message: "All field are required!"});
        };

        if(!req.file) {
            return res.status(400).json({message: "No image Found"});
        };

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "jobPortal/profiles"},
                (error, result) => {
                    if(error) {
                        reject(new error("Cloudinary upload failed"))
                    } else {
                        resolve(result)
                    }
                }
            );
            stream.end(req.file.buffer)
        });

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({message: "User already exist!"})
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const createAccount = await User.create({
            fullName, phoneNumber, email, password: hashPassword, profile: {profilePhoto: result.secure_url}, role
        });

        return res.status(200).json({message: "Account created successfully!", createAccount})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error});
    }
};

// login
export const loginAccount = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if(!email || !password || !role){
            return res.status(400).json({message: "All field are required!"});
        };

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({message: "Account not registerd!"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({message: "Incorrect email or password!"});
        }

        if(role !== user.role) {
            return res.status(400).json({message: "Account doesn't exist with current role!"});
        }

        const token = jwt.sign({user: user}, process.env.TOKEN_SECRET, {expiresIn: "1d"});
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: 'true' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error});
    }
};

// logout
export const logoutAccount = async (req, res) => {
    try {
        return await res.status(200).cookie("token", "", { httpOnly: true, maxAge: 0}).json({
            message: "Account logout successfully!"
        })
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error});
    }
};

// update profile
export const updateAccountProfile = async (req, res) => {
    const { fullName, phoneNumber, email, bio, skills } = req.body;
    try {
        if(!req.file) {
            return res.status(400).json({message: "No resume Found"});
        };

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "jobPortal/resumes" },
                (error, result) => {
                    if(error) {
                        reject(new error("resume upload failed"))
                    } else {
                        resolve(result)
                    }
                }
            );
            stream.end(req.file.buffer)
        });

        let skillsArray;
        if(skills) {
            skillsArray = skills.split(",")
        };

        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({message: "User not found!"})
        };

        // updating data
        if(fullName) user.fullName = fullName;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(email) user.email = email;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
        if (result?.secure_url) {
            user.profile.resume = result.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
          }

        await user.save();

        return res.status(200).json({message: "Profile Updated!", user});
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error});
    }
};
