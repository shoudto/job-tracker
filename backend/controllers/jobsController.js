import { supabase } from "../connections/supabase.js";

export const getJobs = async (req, res) => {
  try {
    const { data, error } = await supabase.from("jobs").select("*");

    if (error) throw error;

    res.status(200).json({ jobs: data });
  } catch (error) {
    console.error("Error fetching jobs", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

export const getJobsByUser = async (req, res) => {
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
};

// POST /jobs - Add a new job
export const postAJob = async (req, res) => {
  try {
    const {
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
};

// UPDATING
export const updateAJob = async (req, res) => {
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
};

// DELETE
export const deleteAJob = async (req, res) => {
  console.log("DELETE FUNCTION!");
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "missing job ID" });
  }

  try {
    const { error } = await supabase.from("jobs").delete().eq("job_id", id);

    if (error) throw error;

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error.message);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

// FILTER
export const filterJobByStatus = async (req, res) => {
  console.log(req.params);

  const { status } = req.params;

  if (!status) {
    return res
      .status(400)
      .json({ error: "Missing user_id or status in query " });
  }

  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      // .eq("user_id", user_id)
      .eq("status", status);

    if (error) throw error;

    res.status(200).json({ jobs: data });
  } catch (error) {
    console.error("Error filtering jobs:", error.message);
    res.status(500).json({ error: "Failed to filter jobs" });
  }
};
