import { useState } from "react";

function DashboardSettings() {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [jobAlerts, setJobAlerts] =
    useState(true);

  const [applicationUpdates, setApplicationUpdates] =
    useState(true);

  const handleSave = (e) => {
    e.preventDefault();

    alert("Settings saved successfully.");
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-page-header">
        <h1>Settings</h1>

        <p>
          Manage your account preferences and notifications.
        </p>
      </div>

      <div className="settings-card">

        <form onSubmit={handleSave}>

          <div className="settings-section">

            <h3>Notifications</h3>

            <label className="setting-item">

              <div>
                <strong>Email Notifications</strong>

                <p>
                  Receive important updates through email.
                </p>
              </div>

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) =>
                  setEmailNotifications(
                    e.target.checked
                  )
                }
              />

            </label>

            <label className="setting-item">

              <div>
                <strong>Job Alerts</strong>

                <p>
                  Receive notifications about new jobs.
                </p>
              </div>

              <input
                type="checkbox"
                checked={jobAlerts}
                onChange={(e) =>
                  setJobAlerts(
                    e.target.checked
                  )
                }
              />

            </label>

            <label className="setting-item">

              <div>
                <strong>Application Updates</strong>

                <p>
                  Get notified when your application status changes.
                </p>
              </div>

              <input
                type="checkbox"
                checked={applicationUpdates}
                onChange={(e) =>
                  setApplicationUpdates(
                    e.target.checked
                  )
                }
              />

            </label>

          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Save Settings
          </button>

        </form>

      </div>

    </div>
  );
}

export default DashboardSettings;