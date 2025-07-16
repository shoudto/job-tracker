import React from "react";
import { useEffect, useState } from "react";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch all jobs (I will update this later to pass user_id)
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8080/jobs");
        const data = await res.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-green-700">List of Jobs</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {jobs.map((job) => (
            <li key={job.job_id} className="border p-2 rounded">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
