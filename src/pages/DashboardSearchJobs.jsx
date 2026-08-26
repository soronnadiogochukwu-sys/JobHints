import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./DashboardSearchJobs.css";

function DashboardSearchJobs({ currentUser }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs...");

      // ==========================================
      // DETERMINE JOB TYPE FOR CURRENT USER
      // ==========================================

      let targetRole = "";

      if (currentUser?.role === "artisan") {
        targetRole = "artisan";
      } else if (currentUser?.role === "applicant") {
        targetRole = "graduate";
      }

      console.log(
        "Current user role:",
        currentUser?.role
      );

      console.log(
        "Target job role:",
        targetRole
      );

      // ==========================================
      // GET ONLY THE JOBS FOR THIS USER
      // ==========================================

      const response = await API.get(
        `/jobs?targetRole=${targetRole}`
      );

      console.log(
        "Jobs API response:",
        response.data
      );

      console.log(
        "Jobs received:",
        response.data.jobs
      );

      // Backend has already filtered the jobs
      setJobs(response.data.jobs || []);

    } catch (error) {
      console.error(
        "Error loading jobs:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, [currentUser]);
  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  // ==========================================
  // PAGE TITLE
  // ==========================================

  const pageTitle =
    currentUser?.role === "artisan"
      ? "Find Artisan Jobs"
      : "Search Jobs";

  const pageDescription =
    currentUser?.role === "artisan"
      ? "Find jobs and opportunities that match your artisan skills."
      : "Find jobs that match your skills and experience.";

  return (
    <div className="dashboard-search-jobs">

      <h1>
        {pageTitle}
      </h1>

      <p>
        {pageDescription}
      </p>

      {/* ======================================
          NO JOBS
      ====================================== */}

      {jobs.length === 0 ? (
        <p>
          {currentUser?.role === "artisan"
            ? "No artisan jobs available at the moment."
            : "No jobs available at the moment."}
        </p>
      ) : (

        /* ======================================
           JOBS GRID
        ====================================== */

        <div className="dashboard-jobs-grid">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="dashboard-job-card"
            >

              {/* ==================================
                  COMPANY LOGO
              ================================== */}

              {job.logo && (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="dashboard-job-logo"
                />
              )}

              {/* ==================================
                  JOB TITLE
              ================================== */}

              <h2>
                {job.title}
              </h2>

              {/* ==================================
                  COMPANY
              ================================== */}

              <p className="dashboard-job-company">
                {job.company}
              </p>

              {/* ==================================
                  LOCATION
              ================================== */}

              <p>
                {job.location}
              </p>

              {/* ==================================
                  JOB CATEGORY
              ================================== */}

              <p>
                {job.category}
              </p>

              {/* ==================================
                  SALARY
              ================================== */}

              <p className="dashboard-job-salary">
                {job.salary || "Salary not specified"}
              </p>

              {/* ==================================
                  VIEW JOB
              ================================== */}

              <button
                type="button"
                onClick={() =>
                  navigate(`/jobs/${job._id}`)
                }
              >
                View Job
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default DashboardSearchJobs;

