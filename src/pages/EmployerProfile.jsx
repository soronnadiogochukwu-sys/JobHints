import { useState } from "react";
import "./EmployerProfile.css";
import API from "../services/api";

function EmployerProfile({ currentUser }) {
  const [companyName, setCompanyName] = useState(
    currentUser?.companyName ||
    currentUser?.name ||
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

  const [website, setWebsite] = useState(
    currentUser?.website || ""
  );

  const [description, setDescription] = useState(
    currentUser?.description || ""
  );

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("SAVE BUTTON CLICKED");

  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const response = await API.put(
      "/users/profile",
      {
        companyName,
        phone,
        location,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("PROFILE UPDATE RESPONSE:", response.data);

    const updatedUser = {
      ...currentUser,
      ...response.data.user,
      companyName,
      phone,
      location,
      website,
      description,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    alert("Company profile updated successfully.");

  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Failed to update company profile."
    );
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

        <div className="company-avatar">
          {(companyName || "C")
            .charAt(0)
            .toUpperCase()}
        </div>

        <form
          className="employer-profile-form"
          onSubmit={handleSubmit}
        >

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

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              disabled
            />
          </div>

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

          <button
            type="submit"
            className="save-profile-btn"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default EmployerProfile;