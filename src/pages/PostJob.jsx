import { useState } from "react";
import "./PostJob.css";

function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      jobTitle,
      category,
      description,
      location,
      salary,
      employmentType,
      skills,
    };

    console.log("Job Data:", jobData);

    alert("Job created successfully!");

    setJobTitle("");
    setCategory("");
    setDescription("");
    setLocation("");
    setSalary("");
    setEmploymentType("");
    setSkills("");
  };

  return (
    <div className="post-job-page">

      <div className="post-job-header">
        <h1>Post a Job</h1>

        <p>
          Create a new job opportunity and find the right candidate.
        </p>
      </div>

      <div className="post-job-card">

        <form
          className="post-job-form"
          onSubmit={handleSubmit}
        >

          {/* Job Title */}
          <div className="form-group">
            <label>Job Title</label>

            <input
              type="text"
              value={jobTitle}
              onChange={(e) =>
                setJobTitle(e.target.value)
              }
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Job Category</label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              required
            >
              <option value="">
                Select a category
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="Design">
                Design
              </option>

              <option value="Marketing">
                Marketing
              </option>

              <option value="Administrative">
                Administrative
              </option>

              <option value="Sales">
                Sales
              </option>

              <option value="Customer Service">
                Customer Service
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Job Description</label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe the job, responsibilities and requirements..."
              rows="6"
              required
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="e.g. Lagos, Nigeria"
              required
            />
          </div>

          {/* Salary */}
          <div className="form-group">
            <label>Salary</label>

            <input
              type="text"
              value={salary}
              onChange={(e) =>
                setSalary(e.target.value)
              }
              placeholder="e.g. ₦200,000 - ₦300,000"
            />
          </div>

          {/* Employment Type */}
          <div className="form-group">
            <label>Employment Type</label>

            <select
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value)
              }
              required
            >
              <option value="">
                Select employment type
              </option>

              <option value="Full-time">
                Full-time
              </option>

              <option value="Part-time">
                Part-time
              </option>

              <option value="Contract">
                Contract
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Remote">
                Remote
              </option>
            </select>
          </div>

          {/* Skills */}
          <div className="form-group">
            <label>Required Skills</label>

            <input
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="e.g. React, JavaScript, CSS"
              required
            />

            <small>
              Separate multiple skills with commas.
            </small>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="post-job-btn"
          >
            Post Job
          </button>

        </form>

      </div>

    </div>
  );
}

export default PostJob;