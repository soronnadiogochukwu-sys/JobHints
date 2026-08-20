import "./EmployerDashboard.css";

function EmployerDashboard({ currentUser }) {
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
            <h3>0</h3>
            <p>Jobs Posted</p>
          </div>
        </div>

        <div className="employer-stat-card">
          <div className="stat-icon">📄</div>

          <div>
            <h3>0</h3>
            <p>Applications</p>
          </div>
        </div>

        <div className="employer-stat-card">
          <div className="stat-icon">⭐</div>

          <div>
            <h3>0</h3>
            <p>Shortlisted</p>
          </div>
        </div>

        <div className="employer-stat-card">
          <div className="stat-icon">✅</div>

          <div>
            <h3>0</h3>
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
          onClick={() => (window.location.href = "/dashboard/post-job")}
        >
          <span className="action-icon">➕</span>

          <div>
            <h3>Post a Job</h3>
            <p>Create a new job opportunity.</p>
          </div>
        </button>

          <button
              className="employer-action-card"
              onClick={() => (window.location.href = "/dashboard/applicants")}
            >
              <span className="action-icon">👥</span>

              <div>
                <h3>View Applicants</h3>
                <p>Review candidates who applied.</p>
              </div>
            </button>

          <button
            className="employer-action-card"
            onClick={() => (window.location.href = "/dashboard/manage-jobs")}
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

          <h3>No Applications Yet</h3>

          <p>
            Once applicants apply for your jobs,
            their applications will appear here.
          </p>

        </div>

      </div>

    </div>
  );
}

export default EmployerDashboard;