import express from "express";
import {
  deleteAJob,
  filterJobByStatus,
  getJobs,
  getJobsByUser,
  postAJob,
  updateAJob,
} from "../controllers/jobsController.js";
import { postALogin, getUsers } from "../controllers/usersController.js";

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

// FILTER a job
router.get("/jobs/filter/:status", filterJobByStatus);

// Get user list
router.get("/users", getUsers);

router.post("/login", postALogin);

export default router;
