import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import JobCard from "../components/JobCards";
import Footer from "../components/Footer"
import "../components/FeaturedJobs.css";

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get("/jobs");

        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);

        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
    <section className="featured">
      <div className="heading">
        <div>
          <h2>All Jobs</h2>
          <p>
            Browse all available job opportunities and find the one that fits you.
          </p>
        </div>

        <button
          className="view-all-btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p>Loading jobs...</p>
      )}

      {/* Error */}
      {error && (
        <p>{error}</p>
      )}

      {/* Jobs */}
      {!loading && !error && (
        <div className="job-grid">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onOpen={() => navigate(`/jobs/${job._id}`)}
              />
            ))
          ) : (
            <p>No jobs available at the moment.</p>
          )}
        </div>
      )}
    </section>
    <Footer/>
    </div>
  );
}

export default Jobs;