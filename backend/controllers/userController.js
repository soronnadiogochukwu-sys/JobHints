const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// ==========================================
// GET LOGGED-IN USER'S PROFILE
// ==========================================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE LOGGED-IN USER'S PROFILE
// ==========================================
const updateProfile = async (req, res) => {
  try {

    console.log("====================================");
    console.log("PROFILE UPDATE STARTED");
    console.log("USER ID:", req.user.id);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // ==========================================
    // CHECK IF MULTER RECEIVED THE LOGO
    // ==========================================

    if (
      req.files &&
      req.files.profileImage &&
      req.files.profileImage[0]
    ) {

      const receivedFile = req.files.profileImage[0];

      console.log("LOGO FILE RECEIVED BY BACKEND");
      console.log("ORIGINAL NAME:", receivedFile.originalname);
      console.log("MIME TYPE:", receivedFile.mimetype);
      console.log("FILE SIZE:", receivedFile.size);
      console.log(
        "BUFFER EXISTS:",
        !!receivedFile.buffer
      );
      console.log(
        "BUFFER SIZE:",
        receivedFile.buffer
          ? receivedFile.buffer.length
          : 0
      );

    } else {

      console.log(
        "NO PROFILE IMAGE RECEIVED BY BACKEND"
      );

    }

    console.log("====================================");


    // ==========================================
    // FIND USER
    // ==========================================

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    // ==========================================
    // NORMAL PROFILE INFORMATION
    // ==========================================

    const {
      name,
      companyName,
      phone,
      location,
      bio,
      skills,
    } = req.body;


    if (name !== undefined) {
      user.name = name;
    }

    if (companyName !== undefined) {
      user.companyName = companyName;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (location !== undefined) {
      user.location = location;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (skills !== undefined) {
      user.skills = skills;
    }


    // ==========================================
    // COMPANY LOGO
    // ==========================================

    if (
      req.files &&
      req.files.profileImage &&
      req.files.profileImage[0]
    ) {

      const file = req.files.profileImage[0];

      console.log("====================================");
      console.log("STARTING CLOUDINARY UPLOAD");
      console.log("FILE:", file.originalname);
      console.log("TYPE:", file.mimetype);
      console.log("SIZE:", file.size);
      console.log("====================================");


      const uploadResult = await new Promise(
        (resolve, reject) => {

          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "jobhints/profile-images",
                resource_type: "image",
              },

              (error, result) => {

                if (error) {

                  console.error(
                    "===================================="
                  );

                  console.error(
                    "CLOUDINARY UPLOAD ERROR"
                  );

                  console.error(
                    "ERROR:",
                    error
                  );

                  console.error(
                    "===================================="
                  );

                  reject(error);

                } else {

                  console.log(
                    "===================================="
                  );

                  console.log(
                    "CLOUDINARY UPLOAD SUCCESS"
                  );

                  console.log(
                    "PUBLIC ID:",
                    result.public_id
                  );

                  console.log(
                    "SECURE URL:",
                    result.secure_url
                  );

                  console.log(
                    "===================================="
                  );

                  resolve(result);
                }
              }
            );

          stream.on("error", (streamError) => {

            console.error(
              "CLOUDINARY STREAM ERROR:",
              streamError
            );

            reject(streamError);

          });

          stream.end(file.buffer);
        }
      );


      // ==========================================
      // SAVE CLOUDINARY URL TO USER
      // ==========================================

      user.profileImage =
        uploadResult.secure_url;

      console.log(
        "PROFILE IMAGE URL TO BE SAVED:",
        user.profileImage
      );

    }


    // ==========================================
    // SAVE USER TO MONGODB
    // ==========================================

    await user.save();


    console.log("====================================");
    console.log(
      "PROFILE SAVED SUCCESSFULLY TO MONGODB"
    );
    console.log("USER ID:", user._id);
    console.log(
      "COMPANY NAME:",
      user.companyName
    );
    console.log(
      "PROFILE IMAGE:",
      user.profileImage
    );
    console.log("====================================");


    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({

      message: "Profile updated successfully",

      user: {
        id: user._id,
        name: user.name,
        companyName: user.companyName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        profileImage: user.profileImage,
        bio: user.bio,
        skills: user.skills,
        resumeUrl: user.resumeUrl,
      },

    });

  } catch (error) {

    console.error("====================================");
    console.error("PROFILE UPDATE ERROR");
    console.error("ERROR MESSAGE:", error.message);
    console.error("ERROR NAME:", error.name);
    console.error("FULL ERROR:", error);
    console.error("====================================");

    res.status(500).json({
      message: "Profile update failed",
      error: error.message,
    });
  }
};


module.exports = {
  getProfile,
  updateProfile,
};