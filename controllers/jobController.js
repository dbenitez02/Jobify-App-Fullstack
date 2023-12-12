import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";


/** Get all jobs */
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId });
    return res.status(StatusCodes.OK).json({ jobs });
};

/** Create a Job */
export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job })
};

/** Get a single job */
export const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({ job });
};

/** Update a job */
export const updateJob = async (req, res) => {
    const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, });
    res.status(StatusCodes.OK).json({ updateJob });
};

/** Delete a job */
export const deleteJob = async (req, res) => {
    const removeJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ msg: 'Job deleted' });
};