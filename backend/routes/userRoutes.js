const express = require("express");

const {
  getProfile,
  updateProfile,
  getFeaturedArtisans,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  updateProfile
);

// ==========================================
// GET FEATURED ARTISANS
// ==========================================
router.get(
  "/featured-artisans",
  getFeaturedArtisans
);

module.exports = router;

