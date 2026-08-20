import { useState } from "react";
import "./DashboardProfile.css";

function DashboardProfile({ currentUser }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...currentUser,
      name,
      phone,
      location,
      bio,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    alert("Profile updated successfully.");
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-page-header">
        <h1>My Profile</h1>

        <p>
          Manage your personal information and profile.
        </p>
      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          {(name || "A")
            .charAt(0)
            .toUpperCase()}
        </div>

        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >

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
              placeholder="Enter your phone number"
            />
          </div>

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

          <button
            type="submit"
            className="primary-btn"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default DashboardProfile;