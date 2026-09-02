const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
        },
      companyName: {
      type: String,
      default: "",
      trim: true,
       },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  resetPasswordToken: {
    type: String,
    default: null,
  },

  resetPasswordExpires: {
    type: Date,
    default: null,
  },

role: {
  type: String,
  enum: ["graduate", "employer", "artisan"],
  required: true,
},
    role: {
      type: String,
      enum: ["graduate", "employer", "artisan"],
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    resumeUrl: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
    type: String,
    default: null,
    },

  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);