import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa6";

import "./DashboardLayout.css";

function ArtisanDashboardLayout({ currentUser, onLogout }) {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setSidebarOpen(false);

    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleNavClick = () => {
    // Close sidebar on tablet/mobile
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">

      {/* ==========================================
          MOBILE / TABLET OVERLAY
      ========================================== */}

      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* SIDEBAR HEADER */}
        <div className="dashboard-sidebar-header">

          {/* LOGO */}
          <div className="dashboard-logo">
            <FaBriefcase />
            <span>JobHints</span>
          </div>

          {/* CLOSE BUTTON
              Hidden automatically on desktop through CSS
          */}
          <button
            type="button"
            className="dashboard-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FaArrowLeft />
          </button>

        </div>

        {/* ==========================================
            NAVIGATION
        ========================================== */}

        <nav className="dashboard-nav">

          <NavLink
            to="/dashboard"
            end
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/artisan-jobs"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Find Jobs
          </NavLink>

          <NavLink
            to="/dashboard/job-requests"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Job Requests
          </NavLink>

          <NavLink
            to="/dashboard/my-jobs"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            My Jobs
          </NavLink>

          <NavLink
            to="/dashboard/messages"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Messages
          </NavLink>

          <NavLink
            to="/dashboard/artisan-profile"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/artisan-settings"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? "dashboard-link active"
                : "dashboard-link"
            }
          >
            Settings
          </NavLink>

        </nav>

        {/* ==========================================
            LOGOUT
        ========================================== */}

        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <main className="dashboard-content">

        {/* ==========================================
            TOP BAR
        ========================================== */}

        <header className="dashboard-topbar">

          {/* HAMBURGER */}
          <button
            type="button"
            className="dashboard-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
          >
            <FaArrowRight />
          </button>

          {/* USER INFO */}
          <div className="dashboard-user-info">

            <h2>
              {currentUser?.name ||
                currentUser?.fullName ||
                "Artisan"}
            </h2>

            <p>
              Artisan Dashboard
            </p>

          </div>

          {/* AVATAR */}
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

        {/* ==========================================
            PAGE CONTENT
        ========================================== */}

        <div className="dashboard-page-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default ArtisanDashboardLayout;