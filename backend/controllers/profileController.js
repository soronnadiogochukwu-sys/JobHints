const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// Upload image buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "jobhints/profile-images",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      phone,
      location,
      profileImage,
      bio,
      skills,
      resumeUrl,
      trade,
      experience,
      services,
      availability,
      portfolio,
      isFeatured,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // =========================
    // PROFILE IMAGE UPLOAD
    // =========================

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer
      );

      user.profileImage = uploadedImage.secure_url;
    }

    // =========================
    // BASIC PROFILE INFORMATION
    // =========================

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (location !== undefined) {
      user.location = location;
    }

    // Only use profileImage from request body
    // if no new image was uploaded
    if (!req.file && profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (skills !== undefined) {
      user.skills = skills;
    }

    if (resumeUrl !== undefined) {
      user.resumeUrl = resumeUrl;
    }

    // =========================
    // ARTISAN INFORMATION
    // =========================

    if (user.role === "artisan") {
      if (trade !== undefined) {
        user.trade = trade;
      }

      if (experience !== undefined) {
        user.experience = experience;
      }

      if (services !== undefined) {
        user.services = services;
      }

      if (availability !== undefined) {
        user.availability = availability;
      }

      if (portfolio !== undefined) {
        user.portfolio = portfolio;
      }

      if (isFeatured !== undefined) {
        user.isFeatured = isFeatured;
      }
    }

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
        resumeUrl: user.resumeUrl,

        // Artisan fields
        trade: user.trade,
        experience: user.experience,
        services: user.services,
        availability: user.availability,
        portfolio: user.portfolio,
        isFeatured: user.isFeatured,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

module.exports = {
  updateProfile,
};