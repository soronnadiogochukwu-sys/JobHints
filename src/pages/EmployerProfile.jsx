import { useState } from "react";
import "./EmployerProfile.css";
import API from "../services/api";

function EmployerProfile({ currentUser }) {
  const [companyName, setCompanyName] = useState(
    currentUser?.companyName || ""
  );

  const [email] = useState(currentUser?.email || "");

  const [phone, setPhone] = useState(
    currentUser?.phone || ""
  );

  const [location, setLocation] = useState(
    currentUser?.location || ""
  );

  const [website, setWebsite] = useState(
    currentUser?.website || ""
  );

  const [description, setDescription] = useState(
    currentUser?.description || ""
  );

  const [profileImage, setProfileImage] = useState(
    currentUser?.profileImage || ""
  );

  const [logoFile, setLogoFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0] || null;

    console.log("========== LOGO SELECTED ==========");
    console.log("FILE:", file);

    if (file) {
      console.log("FILE NAME:", file.name);
      console.log("FILE TYPE:", file.type);
      console.log("FILE SIZE:", file.size);
    }

    console.log("===================================");

    setLogoFile(file);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("companyName", companyName);
    formData.append("phone", phone);
    formData.append("location", location);

    if (logoFile) {
      formData.append("profileImage", logoFile);
    }
    console.log("========== SENDING PROFILE ==========");
    
    for (const [key, value] of formData.entries()) {
      console.log(
        key,
        value instanceof File
          ? `FILE: ${value.name} (${value.type})`
          : value
      );
    }

    console.log("=====================================");

        const response = await API.put(
          "/users/profile",
          formData,
          {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(
      "PROFILE UPDATE RESPONSE:",
      response.data
    );

    const updatedUser = {
      ...currentUser,
      ...response.data.user,
      companyName: response.data.user.companyName,
      phone: response.data.user.phone,
      location: response.data.user.location,
      profileImage: response.data.user.profileImage || "",
      website,
      description,
    };

    setProfileImage(
      response.data.user.profileImage || ""
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    setLogoFile(null);

    alert("Company profile updated successfully.");

  } catch (error) {

    console.error(
      "========== PROFILE UPDATE ERROR =========="
    );

    console.error("ERROR:", error);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);

    console.error(
      "=========================================="
    );

    alert(
      error.response?.data?.message ||
      "Profile update failed."
    );

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="employer-profile-page">

      <div className="employer-profile-header">
        <h1>Company Profile</h1>

        <p>
          Manage your company information and profile.
        </p>
      </div>

      <div className="employer-profile-card">

        {/* COMPANY LOGO */}
        <div className="company-avatar">

          {profileImage ? (
            <img
              src={profileImage}
              alt="Company Logo"
            />
          ) : (
            (companyName || "C")
              .charAt(0)
              .toUpperCase()
          )}

        </div>

        <form
          className="employer-profile-form"
          onSubmit={handleSubmit}
        >

          {/* COMPANY NAME */}
          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              placeholder="Enter your company name"
              required
            />
          </div>


          {/* COMPANY LOGO */}
          <div className="form-group">
            <label>Company Logo</label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleLogoChange}
            />

            {logoFile && (
              <small>
                Selected: {logoFile.name}
              </small>
            )}
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
              placeholder="Enter company phone number"
            />
          </div>


          {/* LOCATION */}
          <div className="form-group">
            <label>Company Location</label>

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="e.g. Lagos, Nigeria"
            />
          </div>


          {/* WEBSITE */}
          <div className="form-group">
            <label>Company Website</label>

            <input
              type="url"
              value={website}
              onChange={(e) =>
                setWebsite(e.target.value)
              }
              placeholder="https://example.com"
            />
          </div>


          {/* DESCRIPTION */}
          <div className="form-group">
            <label>Company Description</label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Tell applicants about your company..."
              rows="6"
            />
          </div>


          {/* SAVE */}
          <button
            type="submit"
            className="save-profile-btn"
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

export default EmployerProfile;

