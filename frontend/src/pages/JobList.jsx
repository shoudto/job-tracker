import React from "react";
import { useEffect, useState } from "react";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() = > {
    // fetch all jobs (I will update this later to pass user_id)
    const fetchJobs = async () => {
        try {
            
        } catch (error) {
            
        }
    }
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-green-700">List of Jobs</h2>
    </div>
  );
}
