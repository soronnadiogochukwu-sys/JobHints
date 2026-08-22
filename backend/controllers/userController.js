const User = require("../models/User");

// Get logged-in user's profile
const getProfile = async (req, res) => {
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
};


// Update logged-in user's profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const {
        name,
        companyName,
        phone,
        location,
        bio,
        skills,
        profileImage,
        resumeUrl
      } = req.body;

    if (name !== undefined) user.name = name;
    if (companyName !== undefined) user.companyName = companyName;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = skills;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (resumeUrl !== undefined) user.resumeUrl = resumeUrl;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        companyName: user.companyName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        profileImage: user.profileImage,
        bio: user.bio,
        skills: user.skills,
        resumeUrl: user.resumeUrl
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error: error.message
    });
  }
};


module.exports = {
  getProfile,
  updateProfile
};