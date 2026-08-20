import { useEffect, useState } from "react";

function DashboardSavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("savedJobs")
    ) || [];

    setSavedJobs(saved);
  }, []);

  const removeSavedJob = (jobId) => {
    const updatedJobs = savedJobs.filter(
      (job) => job._id !== jobId
    );

    setSavedJobs(updatedJobs);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-page-header">
        <h1>Saved Jobs</h1>

        <p>
          Jobs you saved for later.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="empty-state">

          <h3>No saved jobs</h3>

          <p>
            Jobs you save will appear here.
          </p>

        </div>
      ) : (
        <div className="dashboard-job-list">

          {savedJobs.map((job) => (
            <div
              className="dashboard-job-card"
              key={job._id}
            >

              {job.logo && (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="dashboard-job-logo"
                />
              )}

              <div className="dashboard-job-info">

                <h3>{job.title}</h3>

                <p>{job.company}</p>

                <span>
                  {job.location}
                </span>

                <span>
                  {job.type}
                </span>

              </div>

              <div className="dashboard-job-actions">

                <button
                  className="primary-btn"
                  onClick={() =>
                    window.location.href =
                      `/jobs/${job._id}`
                  }
                >
                  View Job
                </button>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    removeSavedJob(job._id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default DashboardSavedJobs;