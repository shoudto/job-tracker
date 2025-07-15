import express from "express";
import {
  deleteAJob,
  getJobs,
  listOfJobs,
  postAJob,
  updateAJob,
} from "../controllers/jobsController.js";

const router = express.Router();

// GET list of jobs
router.get("/jobs", listOfJobs);

// GET Jobs by user
router.get("/jobs", getJobs);

// POST a job
router.post("/jobs", postAJob);

// UPDATE
router.put("/jobs/:id", updateAJob);

// DELETE a job
router.delete("/jobs/:id", deleteAJob);

export default router;
