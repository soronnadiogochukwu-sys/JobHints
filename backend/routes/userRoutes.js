const express = require("express");

const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ==========================================
// GET PROFILE
// ==========================================

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// ==========================================
// UPDATE PROFILE
// Employer uploads COMPANY LOGO only
// ==========================================

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;