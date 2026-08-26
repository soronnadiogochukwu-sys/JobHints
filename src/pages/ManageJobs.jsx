
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageJobs.css";
import API from "../services/api";

function ManageJobs({ currentUser }) {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit modal
  const [editingJobId, setEditingJobId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    company: "",
    description: "",
    category: "",
    location: "",
    salary: "",
    type: "Full-time",
    skills: "",
    deadline: "",
    status: "open",
  });

  // ==========================================
  // GET EMPLOYER JOBS + APPLICATIONS
  // ==========================================
  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        // Get all jobs
        const jobsResponse = await API.get("/jobs");

        const allJobs = jobsResponse.data.jobs || [];

        // Current logged-in employer ID
        const employerId =
          currentUser?.id || currentUser?._id;

        if (!employerId) {
          setError(
            "Employer information could not be found. Please log in again."
          );
          setLoading(false);
          return;
        }

        // Only show jobs belonging to this employer
        const employerJobs = allJobs.filter((job) => {
          const jobEmployerId =
            job.employer?._id || job.employer;

          return (
            jobEmployerId?.toString() ===
            employerId.toString()
          );
        });

        setJobs(employerJobs);

        // Get applications submitted for this employer's jobs
        try {
          const applicationsResponse = await API.get(
            "/applications/employer"
          );

          setApplications(
            applicationsResponse.data.applications || []
          );
        } catch (applicationError) {
          console.error(
            "Failed to fetch employer applications:",
            applicationError
          );

          // Do not break the Manage Jobs page
          // if applications fail to load.
          setApplications([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch employer jobs:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load your jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchEmployerData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // ==========================================
  // GET NUMBER OF APPLICATIONS FOR A JOB
  // ==========================================
  const getJobApplicationCount = (jobId) => {
    return applications.filter((application) => {
      const applicationJobId =
        application.job?._id || application.job;

      return (
        applicationJobId?.toString() ===
        jobId.toString()
      );
    }).length;
  };

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

      // Remove job from UI
      setJobs((currentJobs) =>
        currentJobs.filter((job) => job._id !== id)
      );

      // Remove applications belonging to deleted job
      setApplications((currentApplications) =>
        currentApplications.filter((application) => {
          const applicationJobId =
            application.job?._id || application.job;

          return (
            applicationJobId?.toString() !==
            id.toString()
          );
        })
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
      type: job.type || "Full-time",

      skills: Array.isArray(job.skills)
        ? job.skills.join(", ")
        : job.skills || "",

      deadline: job.deadline
        ? job.deadline.substring(0, 10)
        : "",

      // IMPORTANT:
      // Backend uses "open" and "closed"
      status: job.status || "open",
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
        title: editForm.title,
        company: editForm.company,
        description: editForm.description,
        category: editForm.category,
        location: editForm.location,
        salary: editForm.salary,
        type: editForm.type,

        skills:
          typeof editForm.skills === "string"
            ? editForm.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : [],

        deadline:
          editForm.deadline || undefined,

        // Backend expects open/closed
        status: editForm.status,
      };

      console.log(
        "Updating job:",
        updatedJob
      );

      const response = await API.put(
        `/jobs/${editingJobId}`,
        updatedJob
      );

      console.log(
        "Updated job response:",
        response.data
      );

      const updatedJobFromServer =
        response.data.job;

      // Update job in UI
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
      console.error(
        "Update job error:",
        error
      );

      console.error(
        "Update error response:",
        error.response?.data
      );

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

            <p>
              Loading your jobs...
            </p>
          </div>
        </div>

        <div className="jobs-table-card">

          <div className="no-jobs">

            <h3>Loading Jobs...</h3>

            <p>
              Please wait while we load
              your posted jobs.
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
              View and manage all the jobs
              you have posted.
            </p>
          </div>

          <button
            className="manage-post-btn"
            onClick={() =>
              navigate(
                "/dashboard/post-job"
              )
            }
          >
            + Post a Job
          </button>

        </div>

        <div className="jobs-table-card">

          <div className="no-jobs">

            <h3>
              Unable to Load Jobs
            </h3>

            <p>{error}</p>

            <button
              className="manage-post-btn"
              onClick={() =>
                window.location.reload()
              }
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

  // Backend status is "open" / "closed"
  const activeJobs = jobs.filter(
    (job) => job.status === "open"
  ).length;

  // Total applications for this employer
  const totalApplicants =
    applications.length;

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
            View and manage all the jobs
            you have posted.
          </p>

        </div>

        <button
          className="manage-post-btn"
          onClick={() =>
            navigate(
              "/dashboard/post-job"
            )
          }
        >
          + Post a Job
        </button>

      </div>

      {/* SUMMARY */}
      <div className="jobs-summary">

        <div className="job-summary-card">

          <span>
            Total Jobs
          </span>

          <strong>
            {jobs.length}
          </strong>

        </div>

        <div className="job-summary-card">

          <span>
            Active Jobs
          </span>

          <strong>
            {activeJobs}
          </strong>

        </div>

        <div className="job-summary-card">

          <span>
            Total Applicants
          </span>

          <strong>
            {totalApplicants}
          </strong>

        </div>

      </div>

      {/* JOBS TABLE */}
      <div className="jobs-table-card">

        {jobs.length === 0 ? (

          <div className="no-jobs">

            <h3>
              No Jobs Posted Yet
            </h3>

            <p>
              You haven't posted any jobs yet.
              Create your first job opportunity
              to get started.
            </p>

            <button
              className="manage-post-btn"
              onClick={() =>
                navigate(
                  "/dashboard/post-job"
                )
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
                  <th>Company</th>
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

                    {/* JOB TITLE */}
                    <td>
                      <strong>
                        {job.title}
                      </strong>
                    </td>

                    {/* COMPANY */}
                    <td>
                      {job.company ||
                        "Company not specified"}
                    </td>

                    {/* CATEGORY */}
                    <td>
                      {job.category ||
                        "N/A"}
                    </td>

                    {/* LOCATION */}
                    <td>
                      {job.location ||
                        "N/A"}
                    </td>

                    {/* TYPE */}
                    <td>
                      {job.type ||
                        "N/A"}
                    </td>

                    {/* APPLICATION COUNT */}
                    <td>

                      <span className="applicant-count">
                        {getJobApplicationCount(
                          job._id
                        )}
                      </span>

                    </td>

                    {/* STATUS */}
                    <td>

                      <span
                        className={`job-status ${
                          job.status === "open"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {job.status === "open"
                          ? "Open"
                          : "Closed"}
                      </span>

                    </td>

                    {/* ACTIONS */}
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
                            handleDelete(
                              job._id
                            )
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

            <h3>
              Edit Job
            </h3>

            <form
              onSubmit={handleSaveEdit}
              className="edit-form"
            >

              {/* JOB TITLE */}
              <label>
                Job Title

                <input
                  name="title"
                  value={editForm.title}
                  onChange={
                    handleEditChange
                  }
                  required
                />
              </label>

              {/* COMPANY */}
              <label>
                Company

                <input
                  name="company"
                  value={
                    editForm.company
                  }
                  onChange={
                    handleEditChange
                  }
                  required
                />
              </label>

              {/* CATEGORY */}
              <label>
                Category

                <input
                  name="category"
                  value={
                    editForm.category
                  }
                  onChange={
                    handleEditChange
                  }
                  required
                />
              </label>

              {/* LOCATION */}
              <label>
                Location

                <input
                  name="location"
                  value={
                    editForm.location
                  }
                  onChange={
                    handleEditChange
                  }
                  required
                />
              </label>

              {/* JOB TYPE */}
              <label>
                Job Type

                <select
                  name="type"
                  value={editForm.type}
                  onChange={
                    handleEditChange
                  }
                >
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

                  <option value="Freelance">
                    Freelance
                  </option>
                </select>
              </label>

              {/* SALARY */}
              <label>
                Salary

                <input
                  name="salary"
                  value={
                    editForm.salary
                  }
                  onChange={
                    handleEditChange
                  }
                />
              </label>

              {/* SKILLS */}
              <label>
                Skills

                <input
                  name="skills"
                  value={
                    editForm.skills
                  }
                  onChange={
                    handleEditChange
                  }
                  placeholder="React, JavaScript, CSS"
                />
              </label>

              {/* DEADLINE */}
              <label>
                Deadline

                <input
                  type="date"
                  name="deadline"
                  value={
                    editForm.deadline
                  }
                  onChange={
                    handleEditChange
                  }
                />
              </label>

              {/* STATUS */}
              <label>
                Status

                <select
                  name="status"
                  value={
                    editForm.status
                  }
                  onChange={
                    handleEditChange
                  }
                >
                  <option value="open">
                    Open
                  </option>

                  <option value="closed">
                    Closed
                  </option>
                </select>
              </label>

              {/* DESCRIPTION */}
              <label>
                Description

                <textarea
                  name="description"
                  value={
                    editForm.description
                  }
                  onChange={
                    handleEditChange
                  }
                  rows="5"
                  required
                />
              </label>

              {/* ACTIONS */}
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
                  onClick={
                    handleCancelEdit
                  }
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
