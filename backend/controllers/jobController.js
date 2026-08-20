const Job = require("../models/Job");

// ==========================================
// CREATE A NEW JOB
// ==========================================
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      logo,
      description,
      category,
      location,
      salary,
      type,
      skills,
      deadline
    } = req.body;

    const job = await Job.create({
      title,
      company,
      logo,
      description,
      category,
      location,
      salary,
      type,
      skills,
      deadline,
      employer: req.user.id
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {
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
    const jobs = await Job.find()
      .populate("employer", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: jobs.length,
      jobs
    });

  } catch (error) {
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
      .populate("employer", "name email role");

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      job
    });

  } catch (error) {
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

    // Make sure the logged-in employer owns this job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this job"
      });
    }

    const {
      title,
      company,
      description,
      category,
      location,
      salary,
      type,
      skills,
      deadline,
      status
    } = req.body;

    if (title !== undefined) job.title = title;
    if (company !== undefined) job.company = company;
    if (description !== undefined) job.description = description;
    if (category !== undefined) job.category = category;
    if (location !== undefined) job.location = location;
    if (salary !== undefined) job.salary = salary;
    if (type !== undefined) job.type = type;
    if (skills !== undefined) job.skills = skills;
    if (deadline !== undefined) job.deadline = deadline;
    if (status !== undefined) job.status = status;

    await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      job
    });

  } catch (error) {
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

    // Make sure the logged-in employer owns this job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this job"
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message
    });
  }
};

// EXPORT CONTROLLERS
module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
};