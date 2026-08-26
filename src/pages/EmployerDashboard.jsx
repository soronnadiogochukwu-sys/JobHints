import { useEffect, useState } from "react";
import API from "../services/api";
import "./EmployerDashboard.css";

function EmployerDashboard({ currentUser }) {
  const [stats, setStats] = useState({
    jobsPosted: 0,
    applications: 0,
    shortlisted: 0,
    hired: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get(
          "/applications/employer/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("EMPLOYER DASHBOARD STATS:", response.data);

        setStats(response.data);

      } catch (error) {
        console.error(
          "Error loading employer dashboard stats:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="employer-dashboard">

      {/* Header */}
      <div className="employer-dashboard-header">
        <div>
          <h1>
            Welcome back, {currentUser?.name || "Employer"}!
          </h1>

          <p>
            Manage your jobs, applications, and hiring process.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="employer-stats">

        <div className="employer-stat-card">
          <div className="stat-icon">💼</div>

          <div>
            <h3>
              {loading ? "..." : stats.jobsPosted}
            </h3>

            <p>Jobs Posted</p>
          </div>
        </div>

        <div className="employer-stat-card">
          <div className="stat-icon">📄</div>

          <div>
            <h3>
              {loading ? "..." : stats.applications}
            </h3>

            <p>Applications</p>
          </div>
        </div>

        <div className="employer-stat-card">
          <div className="stat-icon">⭐</div>

          <div>
            <h3>
              {loading ? "..." : stats.shortlisted}
            </h3>

            <p>Shortlisted</p>
          </div>
        </div>

        <div className="employer-stat-card">
          <div className="stat-icon">✅</div>

          <div>
            <h3>
              {loading ? "..." : stats.hired}
            </h3>

            <p>Hired</p>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="employer-section">

        <div className="section-heading">
          <h2>Quick Actions</h2>

          <p>
            Get started with your hiring activities.
          </p>
        </div>

        <div className="employer-actions">

          <button
            className="employer-action-card"
            onClick={() =>
              (window.location.href = "/dashboard/post-job")
            }
          >
            <span className="action-icon">➕</span>

            <div>
              <h3>Post a Job</h3>
              <p>Create a new job opportunity.</p>
            </div>
          </button>

          <button
            className="employer-action-card"
            onClick={() =>
              (window.location.href = "/dashboard/applicants")
            }
          >
            <span className="action-icon">👥</span>

            <div>
              <h3>View Applicants</h3>
              <p>Review candidates who applied.</p>
            </div>
          </button>

          <button
            className="employer-action-card"
            onClick={() =>
              (window.location.href = "/dashboard/manage-jobs")
            }
          >
            <span className="action-icon">📋</span>

            <div>
              <h3>Manage Jobs</h3>
              <p>View and manage your job postings.</p>
            </div>
          </button>

        </div>

      </div>

      {/* Recent Applications */}
      <div className="employer-section">

        <div className="section-heading">
          <h2>Recent Applications</h2>

          <p>
            Applications from candidates will appear here.
          </p>
        </div>

        <div className="empty-applications">

          <div className="empty-icon">📄</div>

          <h3>
            {stats.applications > 0
              ? `${stats.applications} Application${
                  stats.applications > 1 ? "s" : ""
                } Received`
              : "No Applications Yet"}
          </h3>

          <p>
            {stats.applications > 0
              ? "You have applications waiting for review."
              : "Once applicants apply for your jobs, their applications will appear here."}
          </p>

        </div>

      </div>

    </div>
  );
}

export default EmployerDashboard;