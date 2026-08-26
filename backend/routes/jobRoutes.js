const express = require("express");

const {
  createJob,
  getJobs,
  getEmployerJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all jobs
router.get("/", getJobs);

// Get jobs belonging to logged-in employer 
router.get( "/employer", 
  authMiddleware, 
  roleMiddleware("employer"),
   getEmployerJobs
   );
// Get one job by ID
router.get("/:id", getJobById)

// Only employers can create jobs
router.post(
  "/",
  authMiddleware,
  roleMiddleware("employer"),
  createJob
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("employer"),
  updateJob
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("employer"),
  deleteJob
);

module.exports = router;