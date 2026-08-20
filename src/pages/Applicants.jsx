import { useState } from "react";
import "./Applicants.css";

function Applicants() {
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "08012345678",
      job: "Frontend Developer",
      location: "Lagos, Nigeria",
      experience: "2 Years",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "08123456789",
      job: "Graphics Designer",
      location: "Abuja, Nigeria",
      experience: "3 Years",
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael James",
      email: "michael@example.com",
      phone: "09012345678",
      job: "Frontend Developer",
      location: "Lagos, Nigeria",
      experience: "1 Year",
      status: "Pending",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setApplicants((currentApplicants) =>
      currentApplicants.map((applicant) =>
        applicant.id === id
          ? {
              ...applicant,
              status: newStatus,
            }
          : applicant
      )
    );
  };

  return (
    <div className="applicants-page">

      <div className="applicants-header">
        <div>
          <h1>Applicants</h1>

          <p>
            Review candidates who have applied for your jobs.
          </p>
        </div>
      </div>

      <div className="applicants-summary">

        <div className="applicant-summary-card">
          <span>Total Applicants</span>

          <strong>
            {applicants.length}
          </strong>
        </div>

        <div className="applicant-summary-card">
          <span>Pending</span>

          <strong>
            {
              applicants.filter(
                (applicant) =>
                  applicant.status === "Pending"
              ).length
            }
          </strong>
        </div>

        <div className="applicant-summary-card">
          <span>Accepted</span>

          <strong>
            {
              applicants.filter(
                (applicant) =>
                  applicant.status === "Accepted"
              ).length
            }
          </strong>
        </div>

        <div className="applicant-summary-card">
          <span>Rejected</span>

          <strong>
            {
              applicants.filter(
                (applicant) =>
                  applicant.status === "Rejected"
              ).length
            }
          </strong>
        </div>

      </div>

      <div className="applicants-card">

        {applicants.length === 0 ? (
          <div className="no-applicants">

            <h3>No Applicants Yet</h3>

            <p>
              You currently have no applicants
              for your posted jobs.
            </p>

          </div>
        ) : (
          <div className="applicants-table-wrapper">

            <table className="applicants-table">

              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Job Applied For</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {applicants.map((applicant) => (
                  <tr key={applicant.id}>

                    <td>
                      <div className="applicant-info">

                        <div className="applicant-avatar">
                          {applicant.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {applicant.name}
                          </strong>

                          <span>
                            {applicant.email}
                          </span>

                          <span>
                            {applicant.phone}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      {applicant.job}
                    </td>

                    <td>
                      {applicant.location}
                    </td>

                    <td>
                      {applicant.experience}
                    </td>

                    <td>
                      <span
                        className={`applicant-status ${applicant.status.toLowerCase()}`}
                      >
                        {applicant.status}
                      </span>
                    </td>

                    <td>

                      <div className="applicant-actions">

                        <button
                          className="view-applicant-btn"
                          onClick={() =>
                            alert(
                              `Applicant: ${applicant.name}\nEmail: ${applicant.email}\nPhone: ${applicant.phone}`
                            )
                          }
                        >
                          View
                        </button>

                        <button
                          className="accept-applicant-btn"
                          onClick={() =>
                            handleStatusChange(
                              applicant.id,
                              "Accepted"
                            )
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="reject-applicant-btn"
                          onClick={() =>
                            handleStatusChange(
                              applicant.id,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Applicants;