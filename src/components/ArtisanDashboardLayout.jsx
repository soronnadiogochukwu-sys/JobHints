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

  const role = currentUser?.role || "applicant";

  const dashboardLinks = {
    applicant: [
      {
        label: "Dashboard",
        path: "/dashboard",
        end: true,
      },
      {
        label: "Search Jobs",
        path: "/dashboard/search-jobs",
      },
      {
        label: "My Applications",
        path: "/dashboard/applications",
      },
      {
        label: "Saved Jobs",
        path: "/dashboard/saved-jobs",
      },
      {
        label: "Messages",
        path: "/dashboard/messages",
      },
      {
        label: "Notifications",
        path: "/dashboard/notifications",
      },
      {
        label: "Profile",
        path: "/dashboard/profile",
      },
      {
        label: "Settings",
        path: "/dashboard/settings",
      },
    ],

    artisan: [
      {
        label: "Dashboard",
        path: "/dashboard",
        end: true,
      },
      {
        label: "Search Jobs",
        path: "/dashboard/search-jobs",
      },
      {
        label: "My Applications",
        path: "/dashboard/applications",
      },
      {
        label: "Saved Jobs",
        path: "/dashboard/saved-jobs",
      },
      {
        label: "Messages",
        path: "/dashboard/messages",
      },
      {
        label: "Notifications",
        path: "/dashboard/notifications",
      },
      {
        label: "Profile",
        path: "/dashboard/profile",
      },
      {
        label: "Settings",
        path: "/dashboard/settings",
      },
    ],

    employer: [
      {
        label: "Dashboard",
        path: "/dashboard",
        end: true,
      },
      {
        label: "Post Job",
        path: "/dashboard/post-job",
      },
      {
        label: "Manage Jobs",
        path: "/dashboard/manage-jobs",
      },
      {
        label: "Applications",
        path: "/dashboard/applications",
      },
      {
        label: "Messages",
        path: "/dashboard/messages",
      },
      {
        label: "Notifications",
        path: "/dashboard/notifications",
      },
      {
        label: "Profile",
        path: "/dashboard/profile",
      },
      {
        label: "Settings",
        path: "/dashboard/settings",
      },
    ],
  };

  const links =
    dashboardLinks[role] || dashboardLinks.applicant;

  const dashboardTitle =
    role === "artisan"
      ? "Artisan Dashboard"
      : role === "employer"
      ? "Employer Dashboard"
      : "Applicant Dashboard";

  const userName =
    currentUser?.name ||
    currentUser?.fullName ||
    role.charAt(0).toUpperCase() + role.slice(1);

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

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                isActive
                  ? "dashboard-link active"
                  : "dashboard-link"
              }
            >
              {link.label}
            </NavLink>
          ))}

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
            <h2>{userName}</h2>

            <p>{dashboardTitle}</p>
          </div>

          <div className="dashboard-avatar">
            {userName
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