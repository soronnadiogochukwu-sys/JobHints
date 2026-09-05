const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC USER INFORMATION
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["graduate", "employer", "artisan"],
      required: true,
    },

    // =========================
    // CONTACT & PROFILE
    // =========================
    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    // =========================
    // ARTISAN PROFILE
    // =========================
    trade: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    services: {
      type: [String],
      default: [],
    },

    availability: {
      type: String,
      default: "",
      trim: true,
    },

    portfolio: {
      type: [String],
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // =========================
    // PASSWORD RESET
    // =========================
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);