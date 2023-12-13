import { Router } from "express";
import { validateJobInput, validateIdParam } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
const router = Router();

import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} from '../controllers/jobController.js';


// routes after /api/jobs
router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob);
router.route('/:id')
    .get(validateIdParam, getJob)
    .patch(checkForTestUser, validateIdParam, validateJobInput, updateJob)
    .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;