const User = require("../models/User");
const Job = require("../models/Job");

const getStats = async (req, res) => {
  try {
    const [
      jobs,
      employers,
      graduates,
      artisans,
    ] = await Promise.all([
      Job.countDocuments(),

      User.countDocuments({
        role: "employer",
      }),

      User.countDocuments({
        role: "graduate",
      }),

      User.countDocuments({
        role: "artisan",
      }),
    ]);

    res.status(200).json({
      jobs,
      employers,
      graduates,
      artisans,
    });
  } catch (error) {
    console.error("Stats error:", error);

    res.status(500).json({
      message: "Failed to fetch JobHints statistics",
    });
  }
};

module.exports = {
  getStats,
};