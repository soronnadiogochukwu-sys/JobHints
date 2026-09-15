const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // ==========================================
    // JOB
    // ==========================================
    // Required for normal job applications.
    // Optional for direct Hire Now applications.
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: false,
      default: null
    },

    // ==========================================
    // APPLICANT / ARTISAN
    // ==========================================
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // ==========================================
    // EMPLOYER
    // ==========================================
    // Used especially for direct Hire Now
    // applications.
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null
    },

    // ==========================================
    // APPLICATION TYPE
    // ==========================================
    applicationType: {
      type: String,
      enum: ["job", "direct-hire"],
      default: "job"
    },

    // ==========================================
    // COVER LETTER
    // ==========================================
    coverLetter: {
      type: String,
      default: ""
    },

    // ==========================================
    // RESUME
    // ==========================================
    resumeUrl: {
      type: String,
      default: ""
    },

    // ==========================================
    // STATUS
    // ==========================================
    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "shortlisted",
        "rejected",
        "hired"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);