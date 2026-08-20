import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Modal from "./components/Modal";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Artisans from "./pages/Artisans";
import Employers from "./pages/Employers";
import JobDetails from "./pages/JobDetails";

import ApplicantDashboard from "./pages/ApplicantDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import DashboardSearchJobs from "./pages/DashboardSearchJobs";
import DashboardApplications from "./pages/DashboardApplications";
import DashboardSavedJobs from "./pages/DashboardSavedJobs";
import DashboardMessages from "./pages/DashboardMessages";
import DashboardNotifications from "./pages/DashboardNotifications";
import DashboardProfile from "./pages/DashboardProfile";
import DashboardSettings from "./pages/DashboardSettings";

import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";
import Applicants from "./pages/Applicants";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerSettings from "./pages/EmployerSettings";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerDashboardLayout from "./components/EmployerDashboardLayout";

import EmployerRoute from "./components/EmployerRoute";

import "./App.css";

function App() {
  const navigate = useNavigate();

  // ==========================================
  // MODAL STATE
  // ==========================================

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // ==========================================
  // CURRENT USER
  // ==========================================

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error(
        "Error reading current user:",
        error
      );

      return null;
    }
  });

  // ==========================================
  // PUBLIC NAVIGATION LINKS
  // ==========================================

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Jobs",
      href: "/jobs",
    },
    {
      name: "Artisans",
      href: "/artisans",
    },
    {
      name: "Employers",
      href: "/employers",
    },
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  // ==========================================
  // NAVBAR BUTTONS
  //
  // Login and Signup are MODALS.
  // Do not add /login or /signup routes.
  // ==========================================

  const buttons = {
    login: {
      text: "Login",
    },

    signup: {
      text: "Sign Up",
    },
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");

    setCurrentUser(null);

    navigate("/");
  };

  // ==========================================
  // LOGIN SUCCESS
  // ==========================================

  const handleLogin = (user) => {
    console.log("Logged in user:", user);

    // Save user in React state
    setCurrentUser(user);

    // Save user in localStorage
    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    // Close login modal
    setShowLogin(false);

    // ========================================
    // BOTH ROLES ENTER THROUGH /dashboard
    // The dashboard decides which layout to show.
    // ========================================

    navigate("/dashboard");
  };

  // ==========================================
  // SIGNUP SUCCESS
  // ==========================================
  //
  // IMPORTANT:
  // Signup creates the account in MongoDB.
  // It does NOT log the user in automatically.
  //
  // After successful signup, the user can close
  // the success message and click Login.
  // ==========================================

  const handleSignup = () => {
    setShowSignup(false);

    // We intentionally do NOT:
    //
    // setCurrentUser(...)
    //
    // and we do NOT navigate to dashboard.
    //
    // The user must login with the account
    // they just created.
  };

  return (
    <>
      {/* ======================================
          NAVBAR
      ====================================== */}

      <Navbar
        openLogin={() => setShowLogin(true)}
        openSignup={() => setShowSignup(true)}
        image="logo"
        title="JobHints"
        links={navLinks}
        buttons={buttons}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* ======================================
          LOGIN MODAL
      ====================================== */}

      {showLogin && (
        <Login
          close={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}

      {/* ======================================
          SIGNUP MODAL
      ====================================== */}

      {showSignup && (
        <Signup
          close={() => setShowSignup(false)}
          onSignup={handleSignup}
        />
      )}

      {/* ======================================
          ROUTES
      ====================================== */}

      <Routes>

        {/* ======================================
            HOME
        ====================================== */}

        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Home
                onOpen={(job) =>
                  setSelectedJob(job)
                }
                currentUser={currentUser}
                openLogin={() =>
                  setShowLogin(true)
                }
                openSignup={() =>
                  setShowSignup(true)
                }
              />
            )
          }
        />

        {/* ======================================
            MAIN DASHBOARD

            ONE /dashboard ROUTE FOR BOTH ROLES

            Employer:
            EmployerDashboardLayout
            +
            EmployerDashboard

            Applicant:
            DashboardLayout
            +
            ApplicantDashboard
        ====================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              currentUser={currentUser}
            >
              {currentUser?.role === "employer" ? (
                <EmployerDashboardLayout
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <DashboardLayout
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />
              )}
            </ProtectedRoute>
          }
        >

          {/* ====================================
              DASHBOARD HOME
          ==================================== */}

          <Route
            index
            element={
              currentUser?.role === "employer" ? (
                <EmployerDashboard
                  currentUser={currentUser}
                />
              ) : (
                <ApplicantDashboard
                  currentUser={currentUser}
                />
              )
            }
          />

          {/* ====================================
              APPLICANT ROUTES
          ==================================== */}

          <Route
            path="search-jobs"
            element={
              <DashboardSearchJobs />
            }
          />

          <Route
            path="applications"
            element={
              <DashboardApplications />
            }
          />

          <Route
            path="saved-jobs"
            element={
              <DashboardSavedJobs />
            }
          />

          <Route
            path="messages"
            element={
              <DashboardMessages />
            }
          />

          <Route
            path="notifications"
            element={
              <DashboardNotifications />
            }
          />

          <Route
            path="profile"
            element={
              <DashboardProfile
                currentUser={currentUser}
              />
            }
          />

          <Route
            path="settings"
            element={
              <DashboardSettings />
            }
          />

          {/* ====================================
              EMPLOYER ROUTES
          ==================================== */}

          <Route
            path="post-job"
            element={
              <EmployerRoute
                currentUser={currentUser}
              >
                <PostJob
                  currentUser={currentUser}
                />
              </EmployerRoute>
            }
          />

          <Route
            path="manage-jobs"
            element={
              <EmployerRoute
                currentUser={currentUser}
              >
                <ManageJobs
                  currentUser={currentUser}
                />
              </EmployerRoute>
            }
          />

          <Route
            path="applicants"
            element={
              <EmployerRoute
                currentUser={currentUser}
              >
                <Applicants
                  currentUser={currentUser}
                />
              </EmployerRoute>
            }
          />

          <Route
            path="employer-profile"
            element={
              <EmployerRoute
                currentUser={currentUser}
              >
                <EmployerProfile
                  currentUser={currentUser}
                />
              </EmployerRoute>
            }
          />

          <Route
            path="employer-settings"
            element={
              <EmployerRoute
                currentUser={currentUser}
              >
                <EmployerSettings
                  currentUser={currentUser}
                />
              </EmployerRoute>
            }
          />

        </Route>

        {/* ======================================
            PUBLIC JOBS
        ====================================== */}

        <Route
          path="/jobs"
          element={
            currentUser ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Jobs />
            )
          }
        />

        {/* ======================================
            PUBLIC ARTISANS
        ====================================== */}

        <Route
          path="/artisans"
          element={
            currentUser ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Artisans
                currentUser={currentUser}
                openLogin={() =>
                  setShowLogin(true)
                }
                openSignup={() =>
                  setShowSignup(true)
                }
              />
            )
          }
        />

        {/* ======================================
            PUBLIC EMPLOYERS
        ====================================== */}

        <Route
          path="/employers"
          element={
            currentUser ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Employers
                currentUser={currentUser}
                openLogin={() =>
                  setShowLogin(true)
                }
                openSignup={() =>
                  setShowSignup(true)
                }
              />
            )
          }
        />

        {/* ======================================
            JOB DETAILS
        ====================================== */}

        <Route
          path="/jobs/:id"
          element={
            <JobDetails
              currentUser={currentUser}
              openLogin={() =>
                setShowLogin(true)
              }
              openSignup={() =>
                setShowSignup(true)
              }
            />
          }
        />

        {/* ======================================
            FALLBACK
        ====================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

      {/* ======================================
          SELECTED JOB MODAL
      ====================================== */}

      {selectedJob && (
        <Modal
          onClose={() =>
            setSelectedJob(null)
          }
          ariaLabel="Job details"
        >
          <JobDetails
            job={selectedJob}
            onClose={() =>
              setSelectedJob(null)
            }
            currentUser={currentUser}
            openLogin={() =>
              setShowLogin(true)
            }
            openSignup={() =>
              setShowSignup(true)
            }
          />
        </Modal>
      )}
    </>
  );
}

export default App;