import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./connections/supabase.js";

dotenv.config();

const app = express();

app.use(cors()); // connects to the frontend
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working!");
});

const PORT = process.env.PORT || 5000;

app.post("/jobs", async (req, res) => {
  // telling our app to wait
  console.log("POST /jobs hit");

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
    } = req.body; // object destructuring

    if (!user_id || !title || !company || !status) {
      return res.status(400).json({ error: "Missing required fields" }); // all these fields are required
    }

    const { data, error } = await supabase.from("jobs").insert([
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
    ]);

    if (error) {
      throw error;
    }

    res.status(201).json({ message: "Job added successfully", job: data[0] });
  } catch (error) {
    console.log("Error adding job:", error);
    res.status(500).json({ error: "Failed to add job" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
