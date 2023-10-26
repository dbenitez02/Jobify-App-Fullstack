import { nanoid } from 'nanoid';

let jobs = [
    {id: nanoid(), company: 'apple', position: 'front-end'},
    {id: nanoid(), company: 'google', position: 'back-end'},
];

/** Get all jobs */
export const getAllJobs = async (req, res) => {
    return res.status(200).json({ jobs });
};

/** Create a Job */
export const createJob = async (req, res) => {
    const {company, position} = req.body
    if(!company || !position) {
        return res.status(400).json({msg: 'Provide BOTH company and position'});
    }

    const id = nanoid(10);
    const job = {id, company, position};
    jobs.push(job);

    res.status(200).json({ job })
};

/** Get a single job */
export const getJob = async (req, res) => {
    const {id} = req.params
    const job = jobs.find((job) => job.id === id);

    if(!job) {
        return res.status(404).json({msg: `No job found with id: ${id}`});
    }

    res.status(200).json({ job });
};

/** Update a job */
export const updateJob = async (req, res) => {
    const {company, position} = req.body;
    if(!company || !position) {
        return res.status(400).json({msg: 'Provide BOTH company and position'});
    }

    const {id} = req.params;
    const job = jobs.find((job) => job.id === id);

    if(!job) {
        return res.status(404).json({msg: `No job found with id: ${id}`});
    }

    job.company = company;
    job.position = position;

    res.status(200).json({ job });
};

/** Delete a job */
export const deleteJob = async (req, res) => {
    const {id} = req.params;
    const job = jobs.find((job) => job.id === id);

    if(!job) {
        return res.status(404).json({msg: `No job found with id: ${id}`});
    }

    const newJobs = jobs.filter((job) => job.id !== id);
    jobs = newJobs;

    res.status(200).json({ msg: 'Job deleted' });
};