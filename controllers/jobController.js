import Job from "../models/JobModel.js";
import { nanoid } from 'nanoid';

let jobs = [
    {id: nanoid(), company: 'apple', position: 'front-end'},
    {id: nanoid(), company: 'google', position: 'back-end'},
];

/** Get all jobs */
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    return res.status(200).json({ jobs });
};

/** Create a Job */
export const createJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(200).json({ job })
};

/** Get a single job */
export const getJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findById(id);

    if(!job) {
        return res.status(404).json({msg: `No job found with id: ${id}`});
    }

    res.status(200).json({ job });
};

/** Update a job */
export const updateJob = async (req, res) => {
    const { id } = req.params;
  
    const updateJob = await Job.findByIdAndUpdate(id, req.body, { new: true, });

    if(!updateJob) {
        return res.status(404).json({msg: `No job found with id: ${id}`});
    }
    res.status(200).json({ updateJob });
};

/** Delete a job */
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removeJob = await Job.findByIdAndDelete(id);

    if(!removeJob) {
        return res.status(404).json({msg: `No job found with id: ${id}`});
    }
    res.status(200).json({ msg: 'Job deleted' });
};