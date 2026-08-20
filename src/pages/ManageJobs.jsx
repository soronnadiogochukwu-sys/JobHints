import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageJobs.css";
import API from "../services/api";

function ManageJobs({ currentUser }) {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit modal state
  const [editingJobId, setEditingJobId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    company: "",
    description: "",
    category: "",
    location: "",
    salary: "",
    type: "",
    skills: "",
    deadline: "",
    status: "Active",
  });

  // ==========================================
  // GET EMPLOYER JOBS
  // ==========================================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/jobs");

        const allJobs = response.data.jobs || [];

        // Only show jobs belonging to the logged-in employer
        const employerJobs = currentUser?._id
          ? allJobs.filter(
              (job) =>
                job.employer?._id === currentUser._id ||
                job.employer === currentUser._id
            )
          : [];

        setJobs(employerJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // ==========================================
  // DELETE JOB
  // ==========================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/jobs/${id}`);

      // Remove deleted job from UI
      setJobs((currentJobs) =>
        currentJobs.filter((job) => job._id !== id)
      );

      alert("Job deleted successfully.");
    } catch (error) {
      console.error("Delete job error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================
  const handleEdit = (job) => {
    setEditingJobId(job._id);

    setEditForm({
      title: job.title || "",
      company: job.company || "",
      description: job.description || "",
      category: job.category || "",
      location: job.location || "",
      salary: job.salary || "",
      type: job.type || "",
      skills: Array.isArray(job.skills)
        ? job.skills.join(", ")
        : job.skills || "",
      deadline: job.deadline
        ? job.deadline.substring(0, 10)
        : "",
      status: job.status || "Active",
    });
  };

  // ==========================================
  // HANDLE EDIT INPUT
  // ==========================================
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // ==========================================
  // SAVE EDIT
  // ==========================================
  const handleSaveEdit = async (e) => {
    e.preventDefault();

    try {
      const updatedJob = {
        ...editForm,

        skills:
          typeof editForm.skills === "string"
            ? editForm.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : editForm.skills,
      };

      const response = await API.put(
        `/jobs/${editingJobId}`,
        updatedJob
      );

      const updatedJobFromServer = response.data.job;

      // Update UI with database response
      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job._id === editingJobId
            ? updatedJobFromServer
            : job
        )
      );

      setEditingJobId(null);

      alert("Job updated successfully.");
    } catch (error) {
      console.error("Update job error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update job."
      );
    }
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancelEdit = () => {
    setEditingJobId(null);
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="manage-jobs-page">
        <div className="manage-jobs-header">
          <div>
            <h1>Manage Jobs</h1>
            <p>Loading your jobs...</p>
          </div>
        </div>

        <div className="jobs-table-card">
          <div className="no-jobs">
            <h3>Loading Jobs...</h3>
            <p>
              Please wait while we load your posted jobs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="manage-jobs-page">
        <div className="manage-jobs-header">
          <div>
            <h1>Manage Jobs</h1>
            <p>
              View and manage all the jobs you have posted.
            </p>
          </div>

          <button
            className="manage-post-btn"
            onClick={() =>
              navigate("/dashboard/post-job")
            }
          >
            + Post a Job
          </button>
        </div>

        <div className="jobs-table-card">
          <div className="no-jobs">
            <h3>Unable to Load Jobs</h3>

            <p>{error}</p>

            <button
              className="manage-post-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SUMMARY DATA
  // ==========================================
  const activeJobs = jobs.filter(
    (job) => job.status === "Active"
  ).length;

  const totalApplicants = jobs.reduce(
    (total, job) =>
      total + (job.applicants?.length || job.applicants || 0),
    0
  );

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div className="manage-jobs-page">

      {/* HEADER */}
      <div className="manage-jobs-header">

        <div>
          <h1>Manage Jobs</h1>

          <p>
            View and manage all the jobs you have posted.
          </p>
        </div>

        <button
          className="manage-post-btn"
          onClick={() =>
            navigate("/dashboard/post-job")
          }
        >
          + Post a Job
        </button>

      </div>

      {/* SUMMARY */}
      <div className="jobs-summary">

        <div className="job-summary-card">
          <span>Total Jobs</span>

          <strong>
            {jobs.length}
          </strong>
        </div>

        <div className="job-summary-card">
          <span>Active Jobs</span>

          <strong>
            {activeJobs}
          </strong>
        </div>

        <div className="job-summary-card">
          <span>Total Applicants</span>

          <strong>
            {totalApplicants}
          </strong>
        </div>

      </div>

      {/* JOBS TABLE */}
      <div className="jobs-table-card">

        {jobs.length === 0 ? (

          <div className="no-jobs">

            <h3>No Jobs Posted Yet</h3>

            <p>
              You haven't posted any jobs yet.
              Create your first job opportunity to get started.
            </p>

            <button
              className="manage-post-btn"
              onClick={() =>
                navigate("/dashboard/post-job")
              }
            >
              Post Your First Job
            </button>

          </div>

        ) : (

          <div className="jobs-table-wrapper">

            <table className="jobs-table">

              <thead>

                <tr>
                  <th>Job Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Applicants</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {jobs.map((job) => (

                  <tr key={job._id}>

                    <td>
                      <strong>
                        {job.title}
                      </strong>
                    </td>

                    <td>
                      {job.category || "N/A"}
                    </td>

                    <td>
                      {job.location || "N/A"}
                    </td>

                    <td>
                      {job.type || "N/A"}
                    </td>

                    <td>
                      <span className="applicant-count">
                        {job.applicants?.length ||
                          job.applicants ||
                          0}
                      </span>
                    </td>

                    <td>

                      <span
                        className={`job-status ${
                          job.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {job.status || "Inactive"}
                      </span>

                    </td>

                    <td>

                      <div className="job-actions">

                        <button
                          className="edit-job-btn"
                          onClick={() =>
                            handleEdit(job)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-job-btn"
                          onClick={() =>
                            handleDelete(job._id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ==========================================
          EDIT JOB MODAL
      ========================================== */}
      {editingJobId !== null && (

        <div className="edit-modal-backdrop">

          <div className="edit-modal">

            <h3>Edit Job</h3>

            <form
              onSubmit={handleSaveEdit}
              className="edit-form"
            >

              <label>
                Job Title

                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  required
                />
              </label>

              <label>
                Company

                <input
                  name="company"
                  value={editForm.company}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Category

                <input
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  required
                />
              </label>

              <label>
                Location

                <input
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  required
                />
              </label>

              <label>
                Job Type

                <input
                  name="type"
                  value={editForm.type}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Salary

                <input
                  name="salary"
                  value={editForm.salary}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Skills

                <input
                  name="skills"
                  value={editForm.skills}
                  onChange={handleEditChange}
                  placeholder="React, JavaScript, CSS"
                />
              </label>

              <label>
                Deadline

                <input
                  type="date"
                  name="deadline"
                  value={editForm.deadline}
                  onChange={handleEditChange}
                />
              </label>

              <label>
                Status

                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </label>

              <label>
                Description

                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows="5"
                />
              </label>

              <div className="edit-form-actions">

                <button
                  type="submit"
                  className="save-btn"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManageJobs;