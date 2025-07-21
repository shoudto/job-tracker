import React from "react";
import { useState } from "react";

export default function JobForm() {
  const [formData, setFormData] = useState({
    user_id: "a3b2e7b6-fa3c-4091-bac0-bbee6e31215d",
    title: "",
    Company: "",
    Status: "Applied",
  });

  //   Track the value
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   Submit request
  const handleSubmit = async (e) => {
    // prevent page to refresh
    e.preventDefault();

    // fetch request
    try {
      const response = await fetch("http://localhost:8080/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Something went wrong");
      console.log("Job added:", result);
      setFormData({});
    } catch (error) {
      console.error("Failed to add the job", error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font bold">Add New Job</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        {/* Job position title input */}
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Company Name Input */}
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="company"
            id="company"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Status Input, Dropdown for status */}
        <div>
          <label>Status:</label>
          <select
            name="status"
            id="status"
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
