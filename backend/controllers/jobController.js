const Job = require("../models/Job");
const User = require("../models/User");

// ==========================================
// CREATE A NEW JOB
// ==========================================
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      salary,
      type,
      skills,
      deadline,
      targetRole
    } = req.body;

    // ==========================================
    // FIND LOGGED-IN EMPLOYER
    // ==========================================

    const employer = await User.findById(req.user.id);

    if (!employer) {
      return res.status(404).json({
        message: "Employer not found"
      });
    }

    // ==========================================
    // ONLY EMPLOYERS CAN POST JOBS
    // ==========================================

    if (employer.role !== "employer") {
      return res.status(403).json({
        message: "Only employers can create jobs"
      });
    }

    // ==========================================
    // VALIDATE TARGET ROLE
    // ==========================================

    if (!["graduate", "artisan"].includes(targetRole)) {
      return res.status(400).json({
        message:
          "Job must be targeted to either graduate or artisan"
      });
    }

    // ==========================================
    // MAKE SURE EMPLOYER HAS COMPANY NAME
    // ==========================================

    if (!employer.companyName || !employer.companyName.trim()) {
      return res.status(400).json({
        message:
          "Please complete your company profile and add your company name before posting a job."
      });
    }

    // ==========================================
    // CREATE JOB
    // ==========================================
    // Company name and logo come directly from
    // the logged-in employer's profile.
    //
    // companyName -> User.companyName
    // profileImage -> User.profileImage
    // ==========================================

    const job = await Job.create({
      title,
      company: employer.companyName,
      logo: employer.profileImage || "",
      description,
      category,
      location,
      salary,
      type,
      skills,
      deadline,
      targetRole,
      employer: employer._id
    });

    // ==========================================
    // RETURN JOB WITH EMPLOYER INFORMATION
    // ==========================================

    const createdJob = await Job.findById(job._id)
      .populate(
        "employer",
        "name companyName email role profileImage"
      );

    res.status(201).json({
      message: "Job created successfully",
      job: createdJob
    });

  } catch (error) {
    console.error("Create job error:", error);

    res.status(500).json({
      message: "Failed to create job",
      error: error.message
    });
  }
};


// ==========================================
// GET ALL JOBS
// ==========================================
const getJobs = async (req, res) => {
  try {

    const filter = {};

    // ==========================================
    // OPTIONAL TARGET ROLE FILTER
    // ==========================================

    if (req.query.targetRole) {

      if (
        !["graduate", "artisan"].includes(
          req.query.targetRole
        )
      ) {
        return res.status(400).json({
          message: "Invalid target role"
        });
      }

      filter.targetRole = req.query.targetRole;
    }

    const jobs = await Job.find(filter)
      .populate(
        "employer",
        "name companyName email role profileImage"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs
    });

  } catch (error) {

    console.error("Get jobs error:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message
    });
  }
};


// ==========================================
// GET ONE JOB BY ID
// ==========================================
const getJobById = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id)
      .populate(
        "employer",
        "name companyName email role profileImage"
      );

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      job
    });

  } catch (error) {

    console.error("Get job error:", error);

    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message
    });
  }
};


// ==========================================
// UPDATE A JOB
// ==========================================
const updateJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // ==========================================
    // MAKE SURE EMPLOYER OWNS THE JOB
    // ==========================================

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message:
          "You are not authorized to update this job"
      });
    }

    const {
      title,
      description,
      category,
      location,
      salary,
      type,
      skills,
      deadline,
      status,
      targetRole
    } = req.body;

    // ==========================================
    // UPDATE FIELDS
    // ==========================================

    if (title !== undefined) {
      job.title = title;
    }

    if (description !== undefined) {
      job.description = description;
    }

    if (category !== undefined) {
      job.category = category;
    }

    if (location !== undefined) {
      job.location = location;
    }

    if (salary !== undefined) {
      job.salary = salary;
    }

    if (type !== undefined) {
      job.type = type;
    }

    if (skills !== undefined) {
      job.skills = skills;
    }

    if (deadline !== undefined) {
      job.deadline = deadline;
    }

    if (status !== undefined) {
      job.status = status;
    }

    // ==========================================
    // UPDATE TARGET ROLE
    // ==========================================

    if (targetRole !== undefined) {

      if (
        !["graduate", "artisan"].includes(
          targetRole
        )
      ) {
        return res.status(400).json({
          message: "Invalid target role"
        });
      }

      job.targetRole = targetRole;
    }

    // ==========================================
    // REFRESH COMPANY INFORMATION
    // ==========================================
    // This makes sure an updated company name/logo
    // is reflected when the employer edits the job.
    // ==========================================

    const employer = await User.findById(req.user.id);

    if (employer) {

      if (employer.companyName) {
        job.company = employer.companyName;
      }

      job.logo = employer.profileImage || "";
    }

    await job.save();

    const updatedJob = await Job.findById(job._id)
      .populate(
        "employer",
        "name companyName email role profileImage"
      );

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob
    });

  } catch (error) {

    console.error("Update job error:", error);

    res.status(500).json({
      message: "Failed to update job",
      error: error.message
    });
  }
};


// ==========================================
// DELETE A JOB
// ==========================================
const deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // ==========================================
    // MAKE SURE EMPLOYER OWNS THE JOB
    // ==========================================

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message:
          "You are not authorized to delete this job"
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {

    console.error("Delete job error:", error);

    res.status(500).json({
      message: "Failed to delete job",
      error: error.message
    });
  }
};


// ==========================================
// GET LOGGED-IN EMPLOYER'S JOBS
// ==========================================
const getEmployerJobs = async (req, res) => {
  try {

    const jobs = await Job.find({
      employer: req.user.id
    })
      .populate(
        "employer",
        "name companyName email role profileImage"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs
    });

  } catch (error) {

    console.error(
      "Get employer jobs error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch employer jobs",
      error: error.message
    });
  }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
  createJob,
  getJobs,
  getEmployerJobs,
  getJobById,
  updateJob,
  deleteJob
};