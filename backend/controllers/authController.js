const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

// EMAIL TRANSPORTER
const resend = new Resend(process.env.RESEND_API_KEY);
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
// ==========================================
// FORGOT PASSWORD
// ==========================================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please provide your email address",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email address",
      });
    }

    // Generate a random reset token
    const resetToken = require("crypto")
      .randomBytes(32)
      .toString("hex");

    // Save token and expiration time
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires =
      Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // For now, return the reset link.
    // Later we can send this link through email.
    // Create password reset link
const resetLink = `https://jobhints-go.onrender.com/reset-password/${resetToken}`;

// Send reset email
const { data, error } = await resend.emails.send({
  from: "JobHints <onboarding@resend.dev>",
  to: [user.email],
  subject: "JobHints Password Reset",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">
      
      <h2 style="color: #2563eb;">
        Reset Your JobHints Password
      </h2>

      <p>Hello ${user.name},</p>

      <p>
        We received a request to reset the password for your
        JobHints account.
      </p>

      <p>
        Click the button below to create a new password:
      </p>

      <div style="margin: 30px 0;">
        <a
          href="${resetLink}"
          style="
            background: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
          "
        >
          Reset Password
        </a>
      </div>

      <p>
        This password reset link will expire in
        <strong>15 minutes</strong>.
      </p>

      <p>
        If you did not request a password reset, you can safely
        ignore this email.
      </p>

      <p>
        Regards,<br />
        <strong>JobHints Team</strong>
      </p>

    </div>
  `,
});
  if (error) {
    console.error("Resend email error:", error);

    return res.status(500).json({
      message: "Failed to send password reset email",
    });
  }
res.status(200).json({
  message:
    "Password reset link has been sent to your email address.",
});

  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      message: "Failed to process forgot password request",
    });
  }
};


// ==========================================
// RESET PASSWORD
// ==========================================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Please provide a new password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message:
          "Password reset token is invalid or has expired",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    // Clear reset token after successful reset
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({
      message:
        "Password reset successfully. You can now login.",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      message: "Failed to reset password",
    });
  }
};


module.exports = {
  registerUser,
  login,
  forgotPassword,
  resetPassword
};
