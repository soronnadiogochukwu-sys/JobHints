const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

// ==========================================
// APPLY FOR A JOB
// ==========================================
const applyForJob = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const jobId = req.params.jobId;

    // Get the logged-in applicant
    const applicant = await User.findById(req.user.id);

    if (!applicant) {
      return res.status(404).json({
        message: "Applicant not found"
      });
    }

    // Make sure applicant has a CV
    if (!applicant.resumeUrl) {
      return res.status(400).json({
        message: "Please upload your CV to your profile before applying for a job"
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // Make sure the job is still open
    if (job.status !== "open") {
      return res.status(400).json({
        message: "This job is no longer accepting applications"
      });
    }

    // Check if applicant has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job"
      });
    }

    // Create application using applicant's saved CV
    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      coverLetter: coverLetter || "",
      resumeUrl: applicant.resumeUrl
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    console.error("APPLY FOR JOB ERROR:", error);

    res.status(500).json({
      message: "Failed to submit application",
      error: error.message
    });
  }
};

// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "reviewing",
      "shortlisted",
      "rejected",
      "hired"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status"
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    const job = await Job.findById(application.job);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // Make sure this employer owns the job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this application"
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update application status",
      error: error.message
    });
  }
};
// ==========================================
// GET EMPLOYER DASHBOARD STATISTICS
// ==========================================
const getEmployerDashboardStats = async (req, res) => {
  try {
    // Find all jobs belonging to the logged-in employer
    const jobs = await Job.find({
      employer: req.user.id
    }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    // Get all applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds }
    }).select("status");

    const jobsPosted = jobs.length;
    const totalApplications = applications.length;

    const shortlisted = applications.filter(
      (application) => application.status === "shortlisted"
    ).length;

    const hired = applications.filter(
      (application) => application.status === "hired"
    ).length;

    res.status(200).json({
      jobsPosted,
      applications: totalApplications,
      shortlisted,
      hired
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employer dashboard statistics",
      error: error.message
    });
  }
};

// ==========================================
// GET ARTISAN DASHBOARD STATISTICS
// ==========================================
// ==========================================
// GET ARTISAN DASHBOARD STATISTICS
// ==========================================
const getArtisanDashboardStats = async (req, res) => {
  try {
    // Get all applications submitted by the logged-in artisan
    const applications = await Application.find({
      applicant: req.user.id
    })
      .populate({
        path: "job",
        select: "title company location category salary type status employer",
        populate: {
          path: "employer",
          select: "name companyName email phone location profileImage"
        }
      })
      .sort({ createdAt: -1 });

    // Job requests = applications still waiting for employer response
    const jobRequests = applications.filter(
      (application) =>
        application.status === "pending"
    ).length;

    // Active jobs = jobs where the artisan has been hired
    const activeJobs = applications.filter(
      (application) =>
        application.status === "hired"
    ).length;

    // Completed jobs
    const completedJobs = applications.filter(
      (application) =>
        application.status === "completed"
    ).length;

    // Rating
    // Until ratings/reviews are implemented, return 0
    const rating = 0;

    // Employer connections
    // Show applications that have progressed beyond simple pending
    const connections = applications.filter(
      (application) =>
        application.status === "reviewing" ||
        application.status === "shortlisted" ||
        application.status === "hired" ||
        application.status === "completed"
    );

    res.status(200).json({
      jobRequests,
      activeJobs,
      completedJobs,
      rating,
      connections
    });

  } catch (error) {
    console.error(
      "ARTISAN DASHBOARD ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch artisan dashboard statistics",
      error: error.message
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getEmployerApplications,
  updateApplicationStatus,
  getEmployerDashboardStats,
  getArtisanDashboardStats
};