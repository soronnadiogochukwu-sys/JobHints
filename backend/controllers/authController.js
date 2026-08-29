const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const {
      name,
      companyName,
      email,
      password,
      role,
      phone,
      location,
    } = req.body;

    console.log("========== REGISTRATION DEBUG ==========");
    console.log("ROLE RECEIVED BY BACKEND:", role);
    console.log("ROLE TYPE:", typeof role);
    console.log("FULL REQUEST BODY:", req.body);
    console.log("========================================");

    // Check required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Please provide name, email, password and role",
      });
    }

    // Check valid role
    console.log("ROLE RECEIVED BY BACKEND:", role);
    console.log("ROLE TYPE:", typeof role);

if (!["graduate", "employer", "artisan"].includes(role)) {
  console.log("INVALID ROLE:", role);

  return res.status(400).json({
    message: "Invalid user role",
    receivedRole: role,
  });
}

    // Check if email already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
   const user = await User.create({
      name,
      companyName: companyName || "",
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      phone: phone || "",
      location: location || "",
    });

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
    res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    location: user.location,
    profileImage: user.profileImage,
    bio: user.bio,
    skills: user.skills,
    resumeUrl: user.resumeUrl
  }
});

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};



module.exports = {
  registerUser,
  login
};