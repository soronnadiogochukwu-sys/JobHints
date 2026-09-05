require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const statsRoutes = require("./routes/statsRoutes");


const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/stats", statsRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "JobHints API is running successfully",
  });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "JobHints API is working",
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`JobHints API running on port ${PORT}`);
});