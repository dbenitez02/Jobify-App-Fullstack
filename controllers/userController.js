import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPass = user.toJSON();
    
    res.status(StatusCodes.OK).json({ user: userWithoutPass });

}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });
    
}
export const updateUser = async (req, res) => {
    console.log(req.file);

    // Remove password property when updating user info.
    const newUser = { ...req.body };
    delete newUser.password;

    // Check if user is sending the image.
    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path); // returns object
        await fs.unlink(req.file.path); 
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    // removes old avatar if user uploads new avatar
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }

    res.status(StatusCodes.OK).json({msg: 'update User'});
    
}