import { useEffect, useState } from "react";
import API from "../services/api";
import "./MyApplications.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your applications.");
          setLoading(false);
          return;
        }

        const response = await API.get(
          "/applications/my-applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "My applications:",
          response.data
        );

        setApplications(
          response.data.applications || []
        );

      } catch (error) {
        console.error(
          "Error fetching applications:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load your applications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="applications-page">
        <h2>My Applications</h2>
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="applications-page">
        <h2>My Applications</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="applications-page">

      <h1>My Applications</h1>

      <p>
        Track the jobs you have applied for.
      </p>

      {applications.length === 0 ? (
        <div className="empty-applications">
          <h3>No applications yet</h3>

          <p>
            You haven't applied for any jobs yet.
          </p>
        </div>
      ) : (
        <div className="applications-list">

          {applications.map((application) => (

            <div
              className="application-card"
              key={application._id}
            >

              <div className="application-info">

                <h2>
                  {application.job?.title ||
                    "Job"}
                </h2>

                <p>
                  {application.job?.company ||
                    "Company"}
                </p>

                <div className="application-details">

                  {application.job?.location && (
                    <span>
                      📍 {application.job.location}
                    </span>
                  )}

                  {application.job?.type && (
                    <span>
                      💼 {application.job.type}
                    </span>
                  )}

                  {application.job?.salary && (
                    <span>
                      💰 {application.job.salary}
                    </span>
                  )}

                </div>

              </div>

              <div className="application-status">

                <span
                  className={`status ${application.status}`}
                >
                  {application.status}
                </span>

                <p>
                  Applied on{" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default MyApplications;