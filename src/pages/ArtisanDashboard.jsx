import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaBriefcase,
  FaCheckCircle,
  FaStar,
  FaSearch,
  FaUser,
  FaUsers
} from "react-icons/fa";

import API from "../services/api";
import "./ArtisanDashboard.css";

function ArtisanDashboard({ currentUser }) {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    jobRequests: 0,
    activeJobs: 0,
    completedJobs: 0,
    rating: 0,
    connections: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await API.get(
          "/applications/artisan/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log(
          "ARTISAN DASHBOARD:",
          response.data
        );

        setStats({
          jobRequests: response.data.jobRequests || 0,
          activeJobs: response.data.activeJobs || 0,
          completedJobs: response.data.completedJobs || 0,
          rating: response.data.rating || 0,
          connections: response.data.connections || []
        });

      } catch (error) {
        console.error(
          "Error loading artisan dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const userName =
    currentUser?.name ||
    currentUser?.fullName ||
    "Artisan";

  return (
    <div className="artisan-dashboard">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="artisan-dashboard-header">

        <div>
          <h1>
            Welcome back, {userName}!
          </h1>

          <p>
            Manage your profile, job requests, and
            projects.
          </p>
        </div>

      </div>


      {/* ==========================================
          STATISTICS
      ========================================== */}

      <div className="artisan-stats">

        {/* JOB REQUESTS */}

        <div className="artisan-stat-card">

          <div className="stat-icon">
            <FaBell />
          </div>

          <div>
            <h3>
              {loading ? "..." : stats.jobRequests}
            </h3>

            <p>
              Job Requests
            </p>
          </div>

        </div>


        {/* ACTIVE JOBS */}

        <div className="artisan-stat-card">

          <div className="stat-icon">
            <FaBriefcase />
          </div>

          <div>
            <h3>
              {loading ? "..." : stats.activeJobs}
            </h3>

            <p>
              Active Jobs
            </p>
          </div>

        </div>


        {/* COMPLETED JOBS */}

        <div className="artisan-stat-card">

          <div className="stat-icon">
            <FaCheckCircle />
          </div>

          <div>
            <h3>
              {loading ? "..." : stats.completedJobs}
            </h3>

            <p>
              Completed Jobs
            </p>
          </div>

        </div>


        {/* RATING */}

        <div className="artisan-stat-card">

          <div className="stat-icon">
            <FaStar />
          </div>

          <div>
            <h3>
              {loading ? "..." : stats.rating}
            </h3>

            <p>
              Rating
            </p>
          </div>

        </div>

      </div>


      {/* ==========================================
          QUICK ACTIONS
      ========================================== */}

      <div className="artisan-section">

        <div className="section-heading">

          <h2>
            Quick Actions
          </h2>

          <p>
            Manage your artisan activities.
          </p>

        </div>


        <div className="artisan-actions">

          {/* FIND JOBS */}

          <button
            type="button"
            className="artisan-action-card"
            onClick={() =>
              navigate("/dashboard/artisan-jobs")
            }
          >

            <span className="action-icon">
              <FaSearch />
            </span>

            <div>

              <h3>
                Find Jobs
              </h3>

              <p>
                Find opportunities that match
                your skills.
              </p>

            </div>

          </button>


          {/* JOB REQUESTS */}

          <button
            type="button"
            className="artisan-action-card"
            onClick={() =>
              navigate("/dashboard/job-requests")
            }
          >

            <span className="action-icon">
              <FaBell />
            </span>

            <div>

              <h3>
                Job Requests
              </h3>

              <p>
                View requests and applications
                from employers.
              </p>

            </div>

          </button>


          {/* PROFILE */}

          <button
            type="button"
            className="artisan-action-card"
            onClick={() =>
              navigate("/dashboard/artisan-profile")
            }
          >

            <span className="action-icon">
              <FaUser />
            </span>

            <div>

              <h3>
                Update Profile
              </h3>

              <p>
                Keep your skills and information
                updated.
              </p>

            </div>

          </button>

        </div>

      </div>


      {/* ==========================================
          EMPLOYER CONNECTIONS
      ========================================== */}

      <div className="artisan-section">

        <div className="section-heading">

          <h2>
            Employer Connections
          </h2>

          <p>
            Employers you are currently working
            with or being considered by.
          </p>

        </div>


        {loading ? (

          <div className="empty-artisan">

            <div className="empty-icon">
              <FaUsers />
            </div>

            <h3>
              Loading connections...
            </h3>

          </div>

        ) : stats.connections.length === 0 ? (

          <div className="empty-artisan">

            <div className="empty-icon">
              <FaUsers />
            </div>

            <h3>
              No Employer Connections Yet
            </h3>

            <p>
              Apply for artisan jobs and employers
              will appear here when they review,
              shortlist, or hire you.
            </p>

          </div>

        ) : (

          <div className="artisan-connections">

            {stats.connections
              .slice(0, 5)
              .map((application) => {

                const employer =
                  application.job?.employer;

                return (
                  <div
                    className="artisan-connection-card"
                    key={application._id}
                  >

                    <div className="connection-avatar">

                      {employer?.profileImage ? (

                        <img
                          src={employer.profileImage}
                          alt={
                            employer.name ||
                            "Employer"
                          }
                        />

                      ) : (

                        <span>
                          {(
                            employer?.name ||
                            employer?.companyName ||
                            "E"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </span>

                      )}

                    </div>


                    <div className="connection-info">

                      <h3>
                        {employer?.companyName ||
                          employer?.name ||
                          "Employer"}
                      </h3>

                      <p>
                        {application.job?.title ||
                          "Job"}
                      </p>

                      <small>
                        {application.job?.location ||
                          ""}
                      </small>

                    </div>


                    <span
                      className={`connection-status ${application.status}`}
                    >
                      {application.status}
                    </span>

                  </div>
                );
              })}

          </div>

        )}

      </div>

    </div>
  );
}

export default ArtisanDashboard;