import { useState, useRef } from "react";
import API from "../services/api";
import "./DashboardProfile.css";

function DashboardProfile({ currentUser }) {
const isArtisan = currentUser?.role === "artisan";

const [name, setName] = useState(
currentUser?.name ||
currentUser?.fullName ||
""
);

const [email] = useState(
currentUser?.email || ""
);

const [phone, setPhone] = useState(
currentUser?.phone || ""
);

const [location, setLocation] = useState(
currentUser?.location || ""
);

const [bio, setBio] = useState(
currentUser?.bio || ""
);

// ==========================================
// PROFILE IMAGE
// ==========================================

const [profileImage, setProfileImage] = useState(
currentUser?.profileImage || ""
);

const [selectedImage, setSelectedImage] = useState(null);

const [imagePreview, setImagePreview] = useState(
currentUser?.profileImage || ""
);

const [uploadingImage, setUploadingImage] = useState(false);

const fileInputRef = useRef(null);

// Artisan fields
const [trade, setTrade] = useState(
currentUser?.trade || ""
);

const [experience, setExperience] = useState(
currentUser?.experience || ""
);

const [skills, setSkills] = useState(
currentUser?.skills?.join(", ") || ""
);

const [services, setServices] = useState(
currentUser?.services?.join(", ") || ""
);

const [availability, setAvailability] = useState(
currentUser?.availability || ""
);

const [portfolio, setPortfolio] = useState(
currentUser?.portfolio?.join("\n") || ""
);

const [isFeatured, setIsFeatured] = useState(
currentUser?.isFeatured || false
);

const [loading, setLoading] = useState(false);

// ==========================================
// SELECT PROFILE IMAGE
// ==========================================

const handleImageSelect = (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert(
      "Only JPG, PNG and WEBP images are allowed."
    );
    e.target.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert(
      "Profile picture must not be larger than 10MB."
    );
    e.target.value = "";
    return;
  }

  setSelectedImage(file);

  const reader = new FileReader();

  reader.onload = () => {
    setImagePreview(reader.result);
  };

  reader.readAsDataURL(file);
};
// ==========================================
// UPLOAD PROFILE IMAGE
// ==========================================

const handleImageUpload = async () => {
  if (!selectedImage) {
    alert("Please select a profile picture first.");
    return;
  }

  try {
    setUploadingImage(true);

    const formData = new FormData();

    formData.append("profileImage", selectedImage);

    const response = await API.post(
      "/profile/profile-image",
      formData
    );

    const updatedUser = response.data.user;

    setProfileImage(
      updatedUser.profileImage || ""
    );

    setImagePreview(
      updatedUser.profileImage || ""
    );

    setSelectedImage(null);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    alert("Profile picture uploaded successfully.");

  } catch (error) {
    console.error(
      "Profile image upload error:",
      error
    );

    console.error(
      "Status:",
      error.response?.status
    );

    console.error(
      "Response:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      "Failed to upload profile picture. Please try again."
    );

  } finally {
    setUploadingImage(false);
  }
};
// ==========================================
// SAVE PROFILE
// ==========================================

const handleSubmit = async (e) => {
e.preventDefault();

```
try {
  setLoading(true);

  const profileData = {
    name,
    phone,
    location,
    bio,
  };

  // Only send artisan fields for artisans
  if (isArtisan) {
    profileData.trade = trade;

    profileData.experience =
      experience === ""
        ? 0
        : Number(experience);

    profileData.skills = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    profileData.services = services
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean);

    profileData.availability = availability;

    profileData.portfolio = portfolio
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    profileData.isFeatured = isFeatured;
  }

  const response = await API.put(
    "/profile",
    profileData
  );

  const updatedUser = response.data.user;

  // Keep localStorage updated
  localStorage.setItem(
    "currentUser",
    JSON.stringify(updatedUser)
  );

  alert("Profile updated successfully.");

} catch (error) {
  console.error(
    "Profile update error:",
    error
  );

  alert(
    error.response?.data?.message ||
    "Failed to update profile. Please try again."
  );
} finally {
  setLoading(false);
}
```

};

return ( <div className="dashboard-page">

```
  <div className="dashboard-page-header">
    <h1>My Profile</h1>

    <p>
      Manage your personal information and profile.
    </p>
  </div>

  <div className="profile-card">

    {/* ================================= */}
    {/* PROFILE AVATAR */}
    {/* ================================= */}

    <div className="profile-avatar">

      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Profile"
        />
      ) : (
        (name || "A")
          .charAt(0)
          .toUpperCase()
      )}

    </div>

    {/* ================================= */}
    {/* PROFILE PICTURE UPLOAD */}
    {/* ================================= */}

    <div className="form-group">

      <label>Profile Picture</label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleImageSelect}
      />

      {selectedImage && (
        <small>
          Selected: {selectedImage.name}
        </small>
      )}

      <button
        type="button"
        className="primary-btn"
        onClick={handleImageUpload}
        disabled={
          !selectedImage ||
          uploadingImage
        }
      >
        {uploadingImage
          ? "Uploading..."
          : "Upload Photo"}
      </button>

    </div>

    <form
      className="profile-form"
      onSubmit={handleSubmit}
    >

      {/* FULL NAME */}
      <div className="form-group">
        <label>Full Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Enter your full name"
        />
      </div>

      {/* EMAIL */}
      <div className="form-group">
        <label>Email</label>

        <input
          type="email"
          value={email}
          disabled
        />
      </div>

      {/* PHONE */}
      <div className="form-group">
        <label>Phone</label>

        <input
          type="text"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="Enter your phone number"
        />
      </div>

      {/* LOCATION */}
      <div className="form-group">
        <label>Location</label>

        <input
          type="text"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          placeholder="Enter your location"
        />
      </div>

      {/* BIO */}
      <div className="form-group">
        <label>Bio</label>

        <textarea
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          placeholder="Tell employers about yourself"
          rows="5"
        />
      </div>

      {/* ========================= */}
      {/* ARTISAN PROFILE */}
      {/* ========================= */}

      {isArtisan && (
        <>
          <div className="profile-section-title">
            <h2>Artisan Information</h2>

            <p>
              Add information about your trade,
              experience and services.
            </p>
          </div>

          {/* TRADE */}
          <div className="form-group">
            <label>Trade</label>

            <input
              type="text"
              value={trade}
              onChange={(e) =>
                setTrade(e.target.value)
              }
              placeholder="e.g. Plumber, Electrician, Tailor"
            />
          </div>

          {/* EXPERIENCE */}
          <div className="form-group">
            <label>
              Years of Experience
            </label>

            <input
              type="number"
              min="0"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              placeholder="e.g. 5"
            />
          </div>

          {/* SKILLS */}
          <div className="form-group">
            <label>
              Skills
            </label>

            <input
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="e.g. Wiring, Plumbing, Repairs"
            />

            <small>
              Separate each skill with a comma.
            </small>
          </div>

          {/* SERVICES */}
          <div className="form-group">
            <label>
              Services Offered
            </label>

            <input
              type="text"
              value={services}
              onChange={(e) =>
                setServices(e.target.value)
              }
              placeholder="e.g. House Wiring, Repairs, Installation"
            />

            <small>
              Separate each service with a comma.
            </small>
          </div>

          {/* AVAILABILITY */}
          <div className="form-group">
            <label>
              Availability
            </label>

            <select
              value={availability}
              onChange={(e) =>
                setAvailability(e.target.value)
              }
            >
              <option value="">
                Select availability
              </option>

              <option value="Available">
                Available
              </option>

              <option value="Busy">
                Busy
              </option>

              <option value="Weekends Only">
                Weekends Only
              </option>

              <option value="Available on Request">
                Available on Request
              </option>
            </select>
          </div>

          {/* PORTFOLIO */}
          <div className="form-group">
            <label>
              Portfolio / Work Samples
            </label>

            <textarea
              value={portfolio}
              onChange={(e) =>
                setPortfolio(e.target.value)
              }
              placeholder={
                "Add portfolio links, one per line.\nExample:\nhttps://example.com/my-work"
              }
              rows="5"
            />

            <small>
              Add one portfolio link per line.
            </small>
          </div>

          {/* FEATURED */}
          <div className="form-group checkbox-group">

            <label>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) =>
                  setIsFeatured(
                    e.target.checked
                  )
                }
              />

              <span>
                Show my profile in Featured Artisans
              </span>
            </label>

          </div>
        </>
      )}

      {/* SAVE */}
      <button
        type="submit"
        className="primary-btn"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Changes"}
      </button>

    </form>

  </div>

</div>


);
}

export default DashboardProfile;
