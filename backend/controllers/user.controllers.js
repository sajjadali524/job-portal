import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
export const registerAccount = async (req, res) => {
    const {fullName, phoneNumber, email, password, role} = req.body;
    try {
        if(!fullName || !phoneNumber || !email || !password || !role){
            return res.status(400).josn({message: "All field are required!"});
        };

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({message: "User already exist!"})
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const createAccount = await User.create({
            fullName, phoneNumber, email, password: hashPassword, role
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
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
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

        await user.save();

        return res.status(200).json({message: "Profile Updated!", user});
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error});
    }
};