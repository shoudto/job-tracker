import React from "react";
import { useState } from "react";

export default function JobForm() {
  const [formData, setFormData] = useState({
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

    console.log({ [name]: value });
  };

  //   Submit request
  const handleSubmit = (e) => {
    // prevent page to refresh
    e.preventDefault();
    console.log("Submitting jobs:", formData);
  };

  return (
    <div>
      <form action="" method="post" onSubmit={handleSubmit}>
        {/* Job position title input */}
        <div>
          <label>Title:</label>
          <input type="text" name="title" id="title" onChange={handleChange} />
        </div>

        {/* Company Name Input */}
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="company"
            id="company"
            onChange={handleChange}
          />
        </div>

        {/* Status Input, Dropdown for status */}
        <div>
          <label>Status:</label>
          <select name="status" id="status" onChange={handleChange}>
            <option value="applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
