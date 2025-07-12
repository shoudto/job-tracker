import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./connections/supabase.js";

dotenv.config();

const app = express();

app.use(cors()); // access from the front-end
app.use(express.json()); // accessing express and json format

// Root route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// GET /jobs - view list of jobs
app.get("/jobs", async (req, res) => {
  const user_id = req.query.user_id; // Find existing user_id

  //   If user doesn't exist
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id in query" });
  }

  //   accessing the job's tables and finding the user_id
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("user_id", user_id);

    //  If an error exit try
    if (error) throw error;

    res.status(200).json({ jobs: data });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// POST /jobs - Add a new job
app.post("/jobs", async (req, res) => {
  try {
    const {
      user_id,
      title,
      company,
      status,
      application_date,
      notes,
      location,
      salary,
      description,
    } = req.body;

    // Basic validation
    if (!user_id || !title || !company || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          user_id,
          title,
          company,
          status,
          application_date,
          notes,
          location,
          salary,
          description,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Job added successfully", job: data[0] });
  } catch (error) {
    console.error("Error adding job:", error.message);
    res.status(500).json({ error: "Failed to add job" });
  }
});

// UPDATING
app.put("/jobs/:id", async (req, res) => {
  const { id } = req.params; // job_id from the url
  const updates = req.body; // the new data for the job

  if (!id) {
    return res.status(400).json({ error: "Missing job ID" });
  }

  try {
    const { data, error } = await supabase
      .from("jobs")
      .update(updates)
      .eq("job_id", id)
      .select(); // return updated rows

    res.status(200).json({ message: "Job updated successfully", job: data[0] });
    if (error) throw error;
  } catch (error) {
    console.error("Error updating job:", error.message);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// Set port and start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});

// Keep Node.js alive in ESM + Node 20+ to prevent early exit
setInterval(() => {}, 1000);
