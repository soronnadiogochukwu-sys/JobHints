const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getEmployerApplications,
  updateApplicationStatus,
  getEmployerDashboardStats,
  getArtisanDashboardStats,
  createDirectHire
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// NORMAL JOB APPLICATION
// ==========================================

router.post(
  "/:jobId",
  authMiddleware,
  roleMiddleware("graduate", "artisan"),
  applyForJob
);

// ==========================================
// DIRECT HIRE NOW
// ==========================================

router.post(
  "/direct-hire/:artisanId",
  authMiddleware,
  roleMiddleware("employer"),
  createDirectHire
);

// ==========================================
// MY APPLICATIONS
// ==========================================

router.get(
  "/my-applications",
  authMiddleware,
  roleMiddleware("graduate", "artisan"),
  getMyApplications
);

// ==========================================
// EMPLOYER APPLICATIONS
// ==========================================

router.get(
  "/employer",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerApplications
);

// ==========================================
// EMPLOYER DASHBOARD STATS
// ==========================================

router.get(
  "/employer/dashboard-stats",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerDashboardStats
);

// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("employer"),
  updateApplicationStatus
);

// ==========================================
// ARTISAN DASHBOARD STATS
// ==========================================

router.get(
  "/artisan/dashboard-stats",
  authMiddleware,
  roleMiddleware("artisan"),
  getArtisanDashboardStats
);

module.exports = router;