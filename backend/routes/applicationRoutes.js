const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getEmployerApplications,
  updateApplicationStatus,
  getEmployerDashboardStats,
  getArtisanDashboardStats
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Applicant applies for a job
router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware("applicant"),
  applyForJob
);

// Applicant views their applications
router.get(
  "/my-applications",
  authMiddleware,
  roleMiddleware("applicant"),
  getMyApplications
);

// Employer views applications for their jobs
router.get(
  "/employer",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerApplications
);
router.get(
  "/employer/dashboard-stats",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerDashboardStats
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("employer"),
  updateApplicationStatus
);
router.get(
  "/artisan/dashboard-stats",
  authMiddleware,
  getArtisanDashboardStats
);
module.exports = router;