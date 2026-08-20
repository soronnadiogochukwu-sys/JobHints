const express = require("express");

const {registerUser, login} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const User = require("../models/User");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;