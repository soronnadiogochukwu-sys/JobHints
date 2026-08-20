import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import "./DashboardLayout.css";

function DashboardLayout({ currentUser, onLogout }) {
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
        <div className="dashboard-logo">
          <FaBriefcase />
          <span>JobHints</span>
        </div>

        {/* NAVIGATION */}
        <nav className="dashboard-nav">

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "dashboard-link active" : "dashboard-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/search-jobs"
            className={({ isActive }) =>
              isActive ? "dashboard-link active" : "dashboard-link"
            }
          >
            Search Jobs
          </NavLink>

          <NavLink
            to="/dashboard/applications"
            className={({ isActive }) =>
              isActive ? "dashboard-link active" : "dashboard-link"
            }
          >
            My Applications
          </NavLink>

          <NavLink
            to="/dashboard/saved-jobs"
            className={({ isActive }) =>
              isActive ? "dashboard-link active" : "dashboard-link"
            }
          >
            Saved Jobs
          </NavLink>

          <NavLink
            to="/dashboard/messages"
            className={({ isActive }) =>
              isActive ? "dashboard-link active" : "dashboard-link"
            }
          >
            Messages
          </NavLink>

          <NavLink
            to="/dashboard/notifications"
            className={({ isActive }) =>
              isActive ? "dashboard-link active" : "dashboard-link"
            }
          >
            Notifications
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ? "dashboard-link active" : "dashboard-link"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? "dashboard-link active" : "dashboard-link"
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

        {/* USER HEADER */}
        <header className="dashboard-topbar">

          <div>
            <h2>
              {currentUser?.name ||
                currentUser?.fullName ||
                "Applicant"}
            </h2>

            <p>
              Applicant Dashboard
            </p>
          </div>

          <div className="dashboard-avatar">
            {(
              currentUser?.name ||
              currentUser?.fullName ||
              "A"
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

export default DashboardLayout;