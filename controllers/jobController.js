import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import { nanoid } from 'nanoid';
import { NotFoundError } from "../errors/customError.js";

let jobs = [
    {id: nanoid(), company: 'apple', position: 'front-end'},
    {id: nanoid(), company: 'google', position: 'back-end'},
];

/** Get all jobs */
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    return res.status(StatusCodes.OK).json({ jobs });
};

/** Create a Job */
export const createJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job })
};

/** Get a single job */
export const getJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findById(id);

    if(!job) {
        throw new NotFoundError(`No job with id: ${id}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

/** Update a job */
export const updateJob = async (req, res) => {
    const { id } = req.params;
  
    const updateJob = await Job.findByIdAndUpdate(id, req.body, { new: true, });

    if(!updateJob) {
        throw new NotFoundError(`No job with id: ${id}`);
    }
    res.status(StatusCodes.OK).json({ updateJob });
};

/** Delete a job */
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removeJob = await Job.findByIdAndDelete(id);

    if(!removeJob) {
        throw new NotFoundError(`No job with id: ${id}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Job deleted' });
};