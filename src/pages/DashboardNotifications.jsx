import { useState } from "react";

function DashboardNotifications() {
  const [notifications] = useState([]);

  return (
    <div className="dashboard-page">

      <div className="dashboard-page-header">
        <h1>Notifications</h1>

        <p>
          Stay updated with your applications and account activity.
        </p>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">

          <h3>No notifications yet</h3>

          <p>
            New updates about your applications will appear here.
          </p>

        </div>
      ) : (
        <div className="notifications-list">

          {notifications.map((notification) => (
            <div
              className="notification-item"
              key={notification._id}
            >

              <div>
                <h3>
                  {notification.title}
                </h3>

                <p>
                  {notification.message}
                </p>
              </div>

              <small>
                {notification.createdAt
                  ? new Date(
                      notification.createdAt
                    ).toLocaleDateString()
                  : ""}
              </small>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default DashboardNotifications;