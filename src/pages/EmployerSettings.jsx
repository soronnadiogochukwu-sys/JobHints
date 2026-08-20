import { useState } from "react";
import "./EmployerSettings.css";

function EmployerSettings({ currentUser }) {
  const [emailNotifications, setEmailNotifications] = useState(
    currentUser?.emailNotifications ?? true
  );

  const [applicationNotifications, setApplicationNotifications] =
    useState(currentUser?.applicationNotifications ?? true);

  const [jobAlerts, setJobAlerts] = useState(
    currentUser?.jobAlerts ?? true
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...currentUser,
      emailNotifications,
      applicationNotifications,
      jobAlerts,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    alert("Settings saved successfully.");
  };

  return (
    <div className="employer-settings-page">

      <div className="employer-settings-header">
        <h1>Settings</h1>

        <p>
          Manage your account preferences and notifications.
        </p>
      </div>

      <div className="employer-settings-card">

        <form
          className="employer-settings-form"
          onSubmit={handleSubmit}
        >

          <div className="settings-section">
            <h2>Notifications</h2>

            <p className="settings-description">
              Choose the notifications you want to receive.
            </p>

            <div className="setting-item">
              <div>
                <h3>Email Notifications</h3>

                <p>
                  Receive important updates through email.
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) =>
                    setEmailNotifications(e.target.checked)
                  }
                />

                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <h3>Application Notifications</h3>

                <p>
                  Get notified when applicants apply for your jobs.
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={applicationNotifications}
                  onChange={(e) =>
                    setApplicationNotifications(e.target.checked)
                  }
                />

                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div>
                <h3>Job Alerts</h3>

                <p>
                  Receive updates about your posted jobs.
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={jobAlerts}
                  onChange={(e) =>
                    setJobAlerts(e.target.checked)
                  }
                />

                <span className="slider"></span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="save-settings-btn"
          >
            Save Settings
          </button>

        </form>

      </div>

    </div>
  );
}

export default EmployerSettings;