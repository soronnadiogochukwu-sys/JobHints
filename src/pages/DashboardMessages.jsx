import { useState } from "react";

function DashboardMessages() {
  const [messages] = useState([]);

  return (
    <div className="dashboard-page">

      <div className="dashboard-page-header">
        <h1>Messages</h1>

        <p>
          Communicate with employers about your job applications.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="empty-state">

          <h3>No messages yet</h3>

          <p>
            Your conversations with employers will appear here.
          </p>

        </div>
      ) : (
        <div className="messages-list">

          {messages.map((message) => (
            <div
              className="message-item"
              key={message._id}
            >

              <div>
                <h3>
                  {message.sender?.name || "Employer"}
                </h3>

                <p>
                  {message.message}
                </p>
              </div>

              <small>
                {message.createdAt
                  ? new Date(
                      message.createdAt
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

export default DashboardMessages;