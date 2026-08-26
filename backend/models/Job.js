const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    logo: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    // ==========================================
    // WHO IS THIS JOB FOR?
    // ==========================================
    // Employers can post jobs for either
    // graduates or artisans.

    targetRole: {
      type: String,
      enum: ["graduate", "artisan"],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    salary: {
      type: String,
      default: ""
    },

    type: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Remote"
      ],
      default: "Full-time"
    },

    skills: {
      type: [String],
      default: []
    },

    // ==========================================
    // EMPLOYER WHO POSTED THE JOB
    // ==========================================

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    deadline: {
      type: Date
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Job", jobSchema);
