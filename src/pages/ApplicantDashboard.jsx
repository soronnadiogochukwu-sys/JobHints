import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./ApplicantDashboard.css";

function ApplicantDashboard({ currentUser }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
          "Error loading applications:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const pendingApplications = applications.filter(
    (application) =>
      application.status === "pending"
  ).length;

  const reviewingApplications = applications.filter(
    (application) =>
      application.status === "reviewing"
  ).length;

  const shortlistedApplications = applications.filter(
    (application) =>
      application.status === "shortlisted"
  ).length;

  return (
    <div className="dashboard-home">

      {/* ==========================================
          WELCOME
      ========================================== */}

      <div className="dashboard-page-header">

        <h1>
          Welcome back,{" "}
          {currentUser?.name ||
            currentUser?.fullName ||
            "Applicant"}!
        </h1>

        <p>
          Here's what's happening with your job
          applications.
        </p>

      </div>


      {/* ==========================================
          STAT CARDS
      ========================================== */}

      <section className="dashboard-stats">

        <div className="stat-card">
          <h3>Total Applications</h3>

          <strong>
            {applications.length}
          </strong>
        </div>


        <div className="stat-card">
          <h3>Pending</h3>

          <strong>
            {pendingApplications}
          </strong>
        </div>


        <div className="stat-card">
          <h3>Under Review</h3>

          <strong>
            {reviewingApplications}
          </strong>
        </div>


        <div className="stat-card">
          <h3>Shortlisted</h3>

          <strong>
            {shortlistedApplications}
          </strong>
        </div>

      </section>


      {/* ==========================================
          QUICK ACTIONS
      ========================================== */}

      <section className="dashboard-section">

        <div className="section-header">

          <div>

            <h2>
              Quick Actions
            </h2>

            <p>
              Quickly access your most important
              job search activities.
            </p>

          </div>

        </div>


        <div className="applicant-actions">

          {/* FIND JOBS */}

          <button
            type="button"
            className="applicant-action-card"
            onClick={() =>
              navigate("/dashboard/search-jobs")
            }
          >

            <span className="action-icon">
              🔎
            </span>

            <div>

              <h3>
                Find Jobs
              </h3>

              <p>
                Discover new job opportunities
                that match your skills.
              </p>

            </div>

          </button>


          {/* APPLICATIONS */}

          <button
            type="button"
            className="applicant-action-card"
            onClick={() =>
              navigate("/dashboard/applications")
            }
          >

            <span className="action-icon">
              📄
            </span>

            <div>

              <h3>
                My Applications
              </h3>

              <p>
                View and track the jobs you have
                applied for.
              </p>

            </div>

          </button>


          {/* SAVED JOBS */}

          <button
            type="button"
            className="applicant-action-card"
            onClick={() =>
              navigate("/dashboard/saved-jobs")
            }
          >

            <span className="action-icon">
              🔖
            </span>

            <div>

              <h3>
                Saved Jobs
              </h3>

              <p>
                View jobs you saved for later.
              </p>

            </div>

          </button>


          {/* PROFILE */}

          <button
            type="button"
            className="applicant-action-card"
            onClick={() =>
              navigate("/dashboard/profile")
            }
          >

            <span className="action-icon">
              👤
            </span>

            <div>

              <h3>
                Update Profile
              </h3>

              <p>
                Keep your personal information and
                skills up to date.
              </p>

            </div>

          </button>

        </div>

      </section>


      {/* ==========================================
          RECENT APPLICATIONS
      ========================================== */}

      <section className="dashboard-section">

        <div className="section-header">

          <div>

            <h2>
              Recent Applications
            </h2>

            <p>
              Track your latest job applications.
            </p>

          </div>

        </div>


        {loading ? (

          <p>
            Loading applications...
          </p>

        ) : applications.length === 0 ? (

          <div className="empty-state">

            <h3>
              No applications yet
            </h3>

            <p>
              Start applying for jobs to see
              your applications here.
            </p>

          </div>

        ) : (

          <div className="application-list">

            {applications
              .slice(0, 5)
              .map((application) => (

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

                  </div>


                  <div className="application-right">

                    <span
                      className={`status ${application.status}`}
                    >
                      {application.status}
                    </span>

                    <small>
                      Applied{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </small>

                  </div>

                </div>

              ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default ApplicantDashboard;