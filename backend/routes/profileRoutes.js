const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  updateProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.put(
  "/",
  authMiddleware,
  updateProfile
);

router.post(
  "/profile-image",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;