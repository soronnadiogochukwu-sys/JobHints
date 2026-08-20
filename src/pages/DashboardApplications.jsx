import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
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

        setApplications(
          response.data.applications || []
        );
      } catch (error) {
        console.error(
          "Error fetching applications:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="dashboard-page">

      <div className="dashboard-page-header">
        <h1>My Applications</h1>

        <p>
          Track the jobs you have applied for.
        </p>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <h3>No applications yet</h3>

          <p>
            Applications you submit will appear here.
          </p>
        </div>
      ) : (
        <div className="application-list">

          {applications.map((application) => (
            <div
              className="application-item"
              key={application._id}
            >

              <div>
                <h3>
                  {application.job?.title ||
                    "Job"}
                </h3>

                <p>
                  {application.job?.company ||
                    "Company"}
                </p>

                <small>
                  {application.job?.location ||
                    ""}
                </small>

                <br />

                <small>
                  Applied{" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </small>
              </div>

              <div className="application-right">

                <span
                  className={`status ${application.status}`}
                >
                  {application.status}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default DashboardApplications;