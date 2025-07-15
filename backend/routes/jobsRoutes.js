import express from "express";
import {
  deleteAJob,
  getJobs,
  getJobsByUser,
  postAJob,
  updateAJob,
} from "../controllers/jobsController.js";

const router = express.Router();

// GET list of jobs
router.get("/jobs", getJobs);

// GET Jobs by user
router.get("/jobs/user", getJobsByUser);

// POST a job
router.post("/jobs", postAJob);

// UPDATE
router.put("/jobs/:id", updateAJob);

// DELETE a job
router.delete("/jobs/:id", deleteAJob);

export default router;
