import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./DashboardSearchJobs.css";

function DashboardSearchJobs({ currentUser }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      setLoading(true);
      return;
    }

    const fetchJobs = async () => {
      try {
        setLoading(true);

        // ==========================================
        // DETERMINE TARGET ROLE
        // ==========================================

        let targetRole = null;

        if (currentUser.role === "artisan") {
          targetRole = "artisan";
        } else if (currentUser.role === "graduate") {
          targetRole = "graduate";
        }

        console.log(
          "Current user role:",
          currentUser.role
        );

        console.log(
          "Target job role:",
          targetRole
        );

        // ==========================================
        // INVALID ROLE
        // ==========================================

        if (!targetRole) {
          console.error(
            "Unable to determine target role:",
            currentUser.role
          );

          setJobs([]);
          return;
        }

        // ==========================================
        // FETCH JOBS
        // ==========================================

        const response = await API.get(
          `/jobs?targetRole=${targetRole}`
        );

        console.log(
          "Jobs API response:",
          response.data
        );

        const receivedJobs =
          response.data.jobs || [];

        // ==========================================
        // EXTRA FRONTEND FILTER
        // ==========================================

        const filteredJobs =
          receivedJobs.filter(
            (job) =>
              job.targetRole === targetRole
          );

        console.log(
          "Filtered jobs:",
          filteredJobs
        );

        setJobs(filteredJobs);

      } catch (error) {
        console.error(
          "Error loading jobs:",
          error
        );

        console.error(
          "Server response:",
          error.response?.data
        );

        setJobs([]);

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
    return (
      <div className="dashboard-search-jobs">
        <p>Loading jobs...</p>
      </div>
    );
  }


  // ==========================================
  // USER TYPE
  // ==========================================

  const isArtisan =
    currentUser?.role === "artisan";


  // ==========================================
  // PAGE CONTENT
  // ==========================================

  const pageTitle = isArtisan
    ? "Find Artisan Jobs"
    : "Search Jobs";

  const pageDescription = isArtisan
    ? "Find jobs and opportunities that match your artisan skills."
    : "Find jobs that match your skills and experience.";

  const emptyMessage = isArtisan
    ? "No artisan jobs available at the moment."
    : "No graduate jobs available at the moment.";


  // ==========================================
  // RENDER
  // ==========================================

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
          {emptyMessage}
        </p>

      ) : (

        <div className="dashboard-jobs-grid">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="dashboard-job-card"
            >

              {/* COMPANY LOGO */}

              {job.logo && (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="dashboard-job-logo"
                />
              )}


              {/* JOB TITLE */}

              <h2>
                {job.title}
              </h2>


              {/* COMPANY */}

              <p className="dashboard-job-company">
                {job.company}
              </p>


              {/* LOCATION */}

              <p>
                {job.location}
              </p>


              {/* CATEGORY */}

              <p>
                {job.category}
              </p>


              {/* SALARY */}

              <p className="dashboard-job-salary">
                {job.salary ||
                  "Salary not specified"}
              </p>


              {/* VIEW JOB */}

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