import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";

// register company
export const registerCompany = async (req, res) => {
    const { companyName } = req.body;

    try {
        if(!companyName) {
            return res.status(400).json({message: "CompanyName is required!"})
        };

        let company = await Company.findOne({ name: companyName });
        if(company) {
            return res.status(400).json({message: "Company already exist!"})
        };

        company = await Company.create({name: companyName, userId: req.user._id});
        return res.status(200).json({message: "Company registred successfully!", company})

    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};

// fetch all companies
export const getCompany = async (req, res) => {
    const userId = req.user._id;
    
    try {
        const companies = await Company.find({ userId })
        if(!companies) {
            return res.status(400).json({message: "No companies found!"})
        }
        
        return res.status(200).json({message: "Companies fetch", companies})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};

// fetch all companies
export const getCompanyById = async (req, res) => {
    const companyId = req.params.id;
    
    try {
        const company = await Company.findById(companyId)
        if(!company) {
            return res.status(400).json({message: "No company found!"})
        }
        
        return res.status(200).json({message: "Company fetch", company})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
};


// update company
export const updateCompany = async (req, res) => {
    const { name, description, website, location } = req.body;

    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {name, description, website, location}, {new: true})
        if(!company) {
            return res.status(400).json({message: "Company not found!"})
        };

        return res.status(200).json({message: "Company updated!", company});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }

};