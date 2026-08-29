import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./ApplicantDashboard.css";

function ArtisanDashboard({ currentUser }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ==========================================
  // FETCH ARTISAN APPLICATIONS
  // ==========================================

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
          "Error loading artisan applications:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ==========================================
  // APPLICATION COUNTS
  // ==========================================

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

  // ==========================================
  // ARTISAN NAME
  // ==========================================

  const userName =
    currentUser?.name ||
    currentUser?.fullName ||
    "Artisan";

  return (
    <div className="dashboard-home">

      {/* ==========================================
          WELCOME
      ========================================== */}

      <div className="dashboard-page-header">

        <h1>
          Welcome back, {userName}!
        </h1>

        <p>
          Here's what's happening with your
          artisan job applications.
        </p>

      </div>


      {/* ==========================================
          STAT CARDS
      ========================================== */}

      <section className="dashboard-stats">

        {/* TOTAL APPLICATIONS */}

        <div className="stat-card">

          <h3>
            Total Applications
          </h3>

          <strong>
            {loading
              ? "..."
              : applications.length}
          </strong>

        </div>


        {/* PENDING */}

        <div className="stat-card">

          <h3>
            Pending
          </h3>

          <strong>
            {loading
              ? "..."
              : pendingApplications}
          </strong>

        </div>


        {/* UNDER REVIEW */}

        <div className="stat-card">

          <h3>
            Under Review
          </h3>

          <strong>
            {loading
              ? "..."
              : reviewingApplications}
          </strong>

        </div>


        {/* SHORTLISTED */}

        <div className="stat-card">

          <h3>
            Shortlisted
          </h3>

          <strong>
            {loading
              ? "..."
              : shortlistedApplications}
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
              artisan job search activities.
            </p>

          </div>

        </div>


        <div className="applicant-actions">

          {/* FIND ARTISAN JOBS */}

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
                Discover new artisan job
                opportunities that match your skills.
              </p>

            </div>

          </button>


          {/* MY APPLICATIONS */}

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
                View and track the artisan jobs
                you have applied for.
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
                View artisan jobs you saved
                for later.
              </p>

            </div>

          </button>


          {/* ARTISAN PROFILE */}

          <button
            type="button"
            className="applicant-action-card"
            onClick={() =>
              navigate("/dashboard/artisan-profile")
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
                Keep your artisan information and
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
              Track your latest artisan job
              applications.
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
              Start applying for artisan jobs
              to see your applications here.
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

export default ArtisanDashboard;

