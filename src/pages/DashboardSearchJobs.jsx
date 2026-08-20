import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./DashboardSearchJobs.css";

function DashboardSearchJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get("/jobs");

        setJobs(response.data.jobs || response.data || []);
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  return (
    <div className="dashboard-search-jobs">

      <h1>Search Jobs</h1>

      <p>
        Find jobs that match your skills and experience.
      </p>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="dashboard-jobs-grid">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="dashboard-job-card"
            >

              {job.logo && (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="dashboard-job-logo"
                />
              )}

              <h2>
                {job.title}
              </h2>

              <p className="dashboard-job-company">
                {job.company}
              </p>

              <p>
                {job.location}
              </p>

              <p className="dashboard-job-salary">
                {job.salary || "Salary not specified"}
              </p>

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