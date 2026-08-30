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
import About from "./pages/About";
import Contact from "./pages/Contact";

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

import ArtisanDashboard from "./pages/ArtisanDashboard";
import ArtisanDashboardLayout from "./components/ArtisanDashboardLayout";

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
      console.error("Error reading current user:", error);
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

    setCurrentUser(user);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    setShowLogin(false);

    // ========================================
    // ALL USERS ENTER THROUGH /dashboard
    //
    // The role determines which dashboard
    // layout is displayed.
    // ========================================

    navigate("/dashboard");
  };

  // ==========================================
  // SIGNUP SUCCESS
  // ==========================================

  const handleSignup = () => {
    setShowSignup(false);

    /*
      Signup does NOT automatically log the user in.

      The user must use the Login modal
      after creating an account.
    */
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

            APPLICANT
            EMPLOYER
            ARTISAN

            ALL USE /dashboard

            But each role gets its own layout.
        ====================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              currentUser={currentUser}
            >

              {/* ==================================
                  EMPLOYER
              ================================== */}

              {currentUser?.role === "employer" ? (
                <EmployerDashboardLayout
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />

              /* ==================================
                 ARTISAN
              ================================== */

              ) : currentUser?.role === "artisan" ? (
                <ArtisanDashboardLayout
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />

              /* ==================================
                 APPLICANT
              ================================== */

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

              ) : currentUser?.role === "artisan" ? (
                <ArtisanDashboard
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
              SEARCH JOBS

              Applicant and Artisan can both
              access this route.

              The actual filtering will be
              handled by the job-search logic.
          ==================================== */}

          <Route
            path="search-jobs"
            element={
              <DashboardSearchJobs
                currentUser={currentUser}
              />
            }
          />

          {/* ====================================
              APPLICATIONS
          ==================================== */}

          <Route
            path="applications"
            element={
              <DashboardApplications
                currentUser={currentUser}
              />
            }
          />

          {/* ====================================
              SAVED JOBS
          ==================================== */}

          <Route
            path="saved-jobs"
            element={
              <DashboardSavedJobs
                currentUser={currentUser}
              />
            }
          />

          {/* ====================================
              MESSAGES
          ==================================== */}

          <Route
            path="messages"
            element={
              <DashboardMessages
                currentUser={currentUser}
              />
            }
          />

          {/* ====================================
              NOTIFICATIONS
          ==================================== */}

          <Route
            path="notifications"
            element={
              <DashboardNotifications
                currentUser={currentUser}
              />
            }
          />

          {/* ====================================
              APPLICANT PROFILE
          ==================================== */}

          <Route
            path="profile"
            element={
              currentUser?.role === "applicant" ? (
                <DashboardProfile
                  currentUser={currentUser}
                />
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />

          {/* ====================================
              APPLICANT SETTINGS
          ==================================== */}

          <Route
            path="settings"
            element={
              currentUser?.role === "applicant" ? (
                <DashboardSettings
                  currentUser={currentUser}
                />
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
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

          {/* ====================================
              ARTISAN ROUTES

              THESE ARE INSIDE /dashboard.

              Therefore:

              /dashboard/hire-requests
              /dashboard/my-jobs
              /dashboard/artisan-profile
              /dashboard/artisan-settings
          ==================================== */}

          <Route
            path="hire-requests"
            element={
              currentUser?.role === "artisan" ? (
                <div>
                  <h1>Hire Requests</h1>

                  <p>
                    Employers who want to hire you
                    will appear here.
                  </p>
                </div>
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />

          <Route
            path="my-jobs"
            element={
              currentUser?.role === "artisan" ? (
                <div>
                  <h1>My Jobs</h1>

                  <p>
                    Your active and completed jobs
                    will appear here.
                  </p>
                </div>
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />

          <Route
            path="artisan-profile"
            element={
              currentUser?.role === "artisan" ? (
                <div>
                  <h1>Artisan Profile</h1>

                  <p>
                    Manage your artisan profile.
                  </p>
                </div>
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />

          <Route
            path="artisan-settings"
            element={
              currentUser?.role === "artisan" ? (
                <div>
                  <h1>Artisan Settings</h1>

                  <p>
                    Manage your artisan account settings.
                  </p>
                </div>
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
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
     <Route 
      path="/about" 
      element={<About />} 
      />
      <Route 
      path="/contact" 
      element={<Contact />} 
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