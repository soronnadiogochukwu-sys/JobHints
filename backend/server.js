const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "JobHints API is running successfully",
  });
  app.get("/api/test", (req, res) => {
  res.json({
    message: "JobHints API is working",
  });
});
});

app.listen(PORT, () => {
  console.log(
    `JobHints API running on http://localhost:${PORT}`
  );
});