import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import "./DashboardLayout.css";

function EmployerDashboardLayout({ currentUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        {/* LOGO */}
        <div
          className="dashboard-logo"
          onClick={() => navigate("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          <FaBriefcase />
          <span>JobHints</span>
        </div>

        {/* EMPLOYER NAVIGATION */}
        <nav className="dashboard-nav">

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/post-job"
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Post a Job
          </NavLink>

          <NavLink
            to="/dashboard/manage-jobs"
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Manage Jobs
          </NavLink>

          <NavLink
            to="/dashboard/applicants"
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Applicants
          </NavLink>

          <NavLink
            to="/dashboard/employer-profile"
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Company Profile
          </NavLink>

          <NavLink
            to="/dashboard/employer-settings"
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Settings
          </NavLink>

        </nav>

        {/* LOGOUT */}
        <button
          className="dashboard-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      {/* MAIN DASHBOARD AREA */}
      <main className="dashboard-content">

        {/* TOP BAR */}
        <header className="dashboard-topbar">

          <div>
            <h2>
              {currentUser?.name ||
                currentUser?.fullName ||
                "Employer"}
            </h2>

            <p>
              Employer Dashboard
            </p>
          </div>

          <div className="dashboard-avatar">
            {(
              currentUser?.name ||
              currentUser?.fullName ||
              "E"
            )
              .charAt(0)
              .toUpperCase()}
          </div>

        </header>

        {/* PAGE CONTENT */}
        <div className="dashboard-page-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default EmployerDashboardLayout;