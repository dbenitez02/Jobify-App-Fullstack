import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import mongoose from 'mongoose';
import day from 'dayjs';
import JobModel from "../models/JobModel.js";


/** Get all jobs */
export const getAllJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query;

    // Output list of of jobs based on the user logged in.
    const queryObject = {
        createdBy: req.user.userId,
        
    };
    
    // Check if there is anything in the search form.
    if(search) {
        queryObject.$or = [
            // Regex
            { positon: {$regex: search, $options: 'i'} },
            { company: {$regex: search, $options: 'i'} },
        ];
    }

    if (jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus = jobStatus;
    }

    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }

    // Grouping sorting properties
    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position',
    };

    // Dynamically select the property
    const sortKey = sortOptions[sort] || sortOptions.newest;

    // Setting up pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sort jobs when a sortKey is defined
    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    // Getting total number of jobs
    const totalJobs = await Job.countDocuments(queryObject);

    // Getting total number of pages
    const numOfPages = Math.ceil(totalJobs / limit);
    return res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage:page, jobs });
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

export const showStats = async (req, res) => {

    let stats = await Job.aggregate([
        // Match all jobs based on the userId of the logged in user.
        { $match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)} },
        // Grab the total sum of each job status.
        { $group: {_id: '$jobStatus', count: {$sum: 1}}},
    ]);

    // Reduce to have only the needed information for displaying stats i.e {pending, interview, declined}
    stats = stats.reduce((acc, curr) => {
        const {_id: title, count} = curr
        acc[title] = count
        return acc;
    }, {});

    console.log(stats);

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    };

    let monthlyApplication = await JobModel.aggregate([
        { $match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)} },
        { $group: {
            //  Extract the year and month of each job posting
            _id: {
                year: { $year: '$createdAt' }, 
                month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
        },
    },
    {$sort: { '_id.year': -1, '_id.month': -1} },       // In this line we are sorting by most recent job posting.
    {$limit: 6},                                        // Limit to six objects.
    ])


    // Change the format of the object to display { date: "MMM YY", count }
    monthlyApplication = monthlyApplication.map((item) => {
        const{ _id: {year, month}, count } = item

        const date = day()
            .month(month - 1)
            .year(year)
            .format('MMM YY');

        return {date, count};

    }).reverse();

    res.status(StatusCodes.OK).json({defaultStats, monthlyApplication});
};