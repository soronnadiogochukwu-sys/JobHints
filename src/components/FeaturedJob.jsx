import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedJobs.css";
import JobCard from "../components/JobCards";
import { FaArrowRight } from "react-icons/fa6";
import API from "../services/api";

function FeaturedJob({ onOpen }) {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/jobs");

        const fetchedJobs = response.data.jobs || [];

        // Only show jobs that are currently open
        const openJobs = fetchedJobs.filter(
          (job) => job.status === "open"
        );

        // Show the most recently posted jobs first
        const latestJobs = openJobs
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 6);

        setJobs(latestJobs);
      } catch (error) {
        console.error(
          "Failed to fetch featured jobs:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="featured">

      {/* HEADER */}
      <div className="heading">

        <h2>
          Featured Jobs For Graduates
        </h2>

        <button
          className="view-all-btn"
          onClick={() => navigate("/jobs")}
        >
          View All Jobs

          <FaArrowRight />
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="featured-jobs-message">
          <p>Loading jobs...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="featured-jobs-message">
          <p>{error}</p>
        </div>
      )}

      {/* NO JOBS */}
      {!loading && !error && jobs.length === 0 && (
        <div className="featured-jobs-message">
          <h3>No jobs available yet.</h3>

          <p>
            New job opportunities will appear here
            when employers post them.
          </p>
        </div>
      )}

      {/* JOBS */}
      {!loading && !error && jobs.length > 0 && (
        <div className="job-grid">

          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onOpen={onOpen}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default FeaturedJob;