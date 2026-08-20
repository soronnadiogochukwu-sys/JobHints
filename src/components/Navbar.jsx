import { FaBriefcase } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import "./Navbar.css";

function Navbar({
  openLogin,
  openSignup,
  title,
  links,
  buttons,
  currentUser,
  onLogout,
}) {
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  // ==========================================
  // EMPLOYER ACCESS
  // ==========================================

  const handleEmployerClick = (e) => {
    if (!currentUser) {
      e.preventDefault();

      setFeedback({
        variant: "info",
        title: "Sign in as employer",
        message:
          "You need to sign in as an employer to access this page.",
        primaryLabel: "Sign in",
        primaryAction: () => {
          setFeedback(null);
          openLogin && openLogin();
        },
        secondaryLabel: "Create account",
        secondaryAction: () => {
          setFeedback(null);
          openSignup && openSignup();
        },
      });

      return;
    }

    if (currentUser.role !== "employer") {
      e.preventDefault();

      setFeedback({
        variant: "error",
        title: "Access denied",
        message:
          "Only users registered as employers can access the Employers area.",
      });

      return;
    }
  };

  // ==========================================
  // LOGGED-IN USER NAVIGATION
  // ==========================================

  if (currentUser) {
    const firstName =
      currentUser.name?.split(" ")[0] ||
      currentUser.fullName?.split(" ")[0] ||
      currentUser.email;

    return (
      <nav className="navbar">

        {/* LOGO */}

        <div
          className="logo"
          onClick={() => navigate("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          <FaBriefcase className="icon" />

          <h3>{title}</h3>
        </div>


        {/* DASHBOARD NAVIGATION */}

        <ul className="nav-links">

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>

        </ul>


        {/* USER AREA */}

        <div className="navbar-buttons">

          <span className="navbar-greeting">
            Hi, {firstName}
          </span>

          <button
            onClick={onLogout}
            className="signup-btn"
          >
            Logout
          </button>

        </div>

      </nav>
    );
  }


  // ==========================================
  // PUBLIC NAVBAR
  // ==========================================

  return (
    <nav className="navbar">

      {/* LOGO */}

      <div className="logo">

        <FaBriefcase className="icon" />

        <h3>{title}</h3>

      </div>


      {/* PUBLIC LINKS */}

      <ul className="nav-links">

        {links?.map((link) => (

          <li key={link.name}>

            {link.href === "/employers" ? (

              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
                onClick={handleEmployerClick}
              >
                {link.name}
              </NavLink>

            ) : (

              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {link.name}
              </NavLink>

            )}

          </li>

        ))}

      </ul>


      {/* LOGIN / SIGNUP */}

      <div className="navbar-buttons">

        <button
          onClick={openLogin}
          className="login-btn"
        >
          {buttons?.login?.text || "Login"}
        </button>

        <button
          onClick={openSignup}
          className="signup-btn"
        >
          {buttons?.signup?.text || "Sign up"}
        </button>

      </div>


      {/* FEEDBACK */}

      {feedback && (

        <FeedbackModal
          title={feedback.title}
          message={feedback.message}
          variant={feedback.variant}
          primaryLabel={feedback.primaryLabel}
          primaryAction={feedback.primaryAction}
          secondaryLabel={feedback.secondaryLabel}
          secondaryAction={feedback.secondaryAction}
          onClose={() => setFeedback(null)}
        />

      )}

    </nav>
  );
}

export default Navbar;