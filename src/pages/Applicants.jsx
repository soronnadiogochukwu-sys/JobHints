import { useEffect, useState } from "react";
import "./Applicants.css";
import API from "../services/api";

function Applicants() {
  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // ==========================================
  // FETCH EMPLOYER APPLICATIONS
  // ==========================================
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/applications/employer");

      console.log(
        "EMPLOYER APPLICATIONS:",
        response.data
      );

      setApplicants(
        response.data.applications || []
      );

    } catch (error) {
      console.error(
        "Failed to fetch applicants:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load applicants."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD APPLICATIONS
  // ==========================================
  useEffect(() => {
    fetchApplicants();
  }, []);

  // ==========================================
  // UPDATE APPLICATION STATUS
  // ==========================================
  const handleStatusChange = async (
    applicationId,
    newStatus
  ) => {
    try {
      const response = await API.put(
        `/applications/${applicationId}/status`,
        {
          status: newStatus
        }
      );

      console.log(
        "APPLICATION STATUS UPDATED:",
        response.data
      );

      // Update the application immediately
      setApplicants((currentApplicants) =>
        currentApplicants.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status: newStatus
              }
            : application
        )
      );

      // Close applicant details if open
      if (
        selectedApplicant?._id === applicationId
      ) {
        setSelectedApplicant((current) =>
          current
            ? {
                ...current,
                status: newStatus
              }
            : null
        );
      }

    } catch (error) {
      console.error(
        "Failed to update application status:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    }
  };

  // ==========================================
  // CONFIRM STATUS CHANGE
  // ==========================================
  const handleDecision = (
    applicationId,
    newStatus
  ) => {
    let message = "";

    if (newStatus === "shortlisted") {
      message =
        "Are you sure you want to shortlist this applicant?";
    }

    if (newStatus === "rejected") {
      message =
        "Are you sure you want to reject this applicant?";
    }

    if (newStatus === "hired") {
      message =
        "Are you sure you want to hire this applicant?";
    }

    const confirmed = window.confirm(message);

    if (!confirmed) return;

    handleStatusChange(
      applicationId,
      newStatus
    );
  };

  // ==========================================
  // STATUS DISPLAY
  // ==========================================
  const formatStatus = (status) => {
    if (!status) return "Pending";

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  // ==========================================
  // SUMMARY
  // ==========================================
  const totalApplicants =
    applicants.length;

  const pendingApplicants =
    applicants.filter(
      (application) =>
        application.status === "pending"
    ).length;

  const shortlistedApplicants =
    applicants.filter(
      (application) =>
        application.status === "shortlisted"
    ).length;

  const hiredApplicants =
    applicants.filter(
      (application) =>
        application.status === "hired"
    ).length;

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="applicants-page">

        <div className="applicants-header">
          <div>
            <h1>Applicants</h1>

            <p>
              Review candidates who have applied
              for your jobs.
            </p>
          </div>
        </div>

        <div className="applicants-card">

          <div className="no-applicants">

            <h3>
              Loading Applicants...
            </h3>

            <p>
              Please wait while we load
              your applications.
            </p>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="applicants-page">

        <div className="applicants-header">
          <div>
            <h1>Applicants</h1>

            <p>
              Review candidates who have applied
              for your jobs.
            </p>
          </div>
        </div>

        <div className="applicants-card">

          <div className="no-applicants">

            <h3>
              Unable to Load Applicants
            </h3>

            <p>{error}</p>

            <button
              onClick={fetchApplicants}
              className="view-applicant-btn"
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div className="applicants-page">

      {/* HEADER */}
      <div className="applicants-header">

        <div>

          <h1>Applicants</h1>

          <p>
            Review candidates who have applied
            for your jobs.
          </p>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="applicants-summary">

        <div className="applicant-summary-card">

          <span>
            Total Applicants
          </span>

          <strong>
            {totalApplicants}
          </strong>

        </div>

        <div className="applicant-summary-card">

          <span>
            Pending
          </span>

          <strong>
            {pendingApplicants}
          </strong>

        </div>

        <div className="applicant-summary-card">

          <span>
            Shortlisted
          </span>

          <strong>
            {shortlistedApplicants}
          </strong>

        </div>

        <div className="applicant-summary-card">

          <span>
            Hired
          </span>

          <strong>
            {hiredApplicants}
          </strong>

        </div>

      </div>

      {/* APPLICATIONS */}
      <div className="applicants-card">

        {applicants.length === 0 ? (

          <div className="no-applicants">

            <h3>
              No Applicants Yet
            </h3>

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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {applicants.map(
                  (application) => {

                    const applicant =
                      application.applicant;

                    const job =
                      application.job;

                    return (
                      <tr
                        key={
                          application._id
                        }
                      >

                        {/* APPLICANT */}
                        <td>

                          <div className="applicant-info">

                            <div className="applicant-avatar">

                              {(
                                applicant?.name ||
                                "A"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <div>

                              <strong>
                                {
                                  applicant?.name ||
                                  "Unknown Applicant"
                                }
                              </strong>

                              <span>
                                {
                                  applicant?.email ||
                                  "No email"
                                }
                              </span>

                              <span>
                                {
                                  applicant?.phone ||
                                  "No phone number"
                                }
                              </span>

                            </div>

                          </div>

                        </td>

                        {/* JOB */}
                        <td>

                          {
                            job?.title ||
                            "Unknown Job"
                          }

                        </td>

                        {/* LOCATION */}
                        <td>

                          {
                            applicant?.location ||
                            job?.location ||
                            "N/A"
                          }

                        </td>

                        {/* STATUS */}
                        <td>

                          <span
                            className={`applicant-status ${
                              application.status ||
                              "pending"
                            }`}
                          >
                            {formatStatus(
                              application.status
                            )}
                          </span>

                        </td>

                        {/* ACTIONS */}
                        <td>

                          <div className="applicant-actions">

                            {/* VIEW */}
                            <button
                              className="view-applicant-btn"
                              onClick={() =>
                                setSelectedApplicant(
                                  application
                                )
                              }
                            >
                              View
                            </button>

                            {/* SHORTLIST */}
                            {application.status !==
                              "shortlisted" &&
                              application.status !==
                                "hired" && (
                                <button
                                  className="accept-applicant-btn"
                                  onClick={() =>
                                    handleDecision(
                                      application._id,
                                      "shortlisted"
                                    )
                                  }
                                >
                                  Shortlist
                                </button>
                              )}

                            {/* HIRE */}
                            {application.status ===
                              "shortlisted" && (
                              <button
                                className="accept-applicant-btn"
                                onClick={() =>
                                  handleDecision(
                                    application._id,
                                    "hired"
                                  )
                                }
                              >
                                Hire
                              </button>
                            )}

                            {/* REJECT */}
                            {application.status !==
                              "rejected" &&
                              application.status !==
                                "hired" && (
                                <button
                                  className="reject-applicant-btn"
                                  onClick={() =>
                                    handleDecision(
                                      application._id,
                                      "rejected"
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              )}

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ==========================================
          APPLICANT DETAILS MODAL
      ========================================== */}
      {selectedApplicant && (

        <div
          className="applicant-modal-backdrop"
          onClick={() =>
            setSelectedApplicant(null)
          }
        >

          <div
            className="applicant-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="applicant-modal-close"
              onClick={() =>
                setSelectedApplicant(null)
              }
            >
              ×
            </button>

            <h2>
              Applicant Details
            </h2>

            <div className="applicant-details">

              <div className="applicant-detail-item">

                <strong>
                  Name
                </strong>

                <span>
                  {
                    selectedApplicant
                      .applicant?.name ||
                    "N/A"
                  }
                </span>

              </div>

              <div className="applicant-detail-item">

                <strong>
                  Email
                </strong>

                <span>
                  {
                    selectedApplicant
                      .applicant?.email ||
                    "N/A"
                  }
                </span>

              </div>

              <div className="applicant-detail-item">

                <strong>
                  Phone
                </strong>

                <span>
                  {
                    selectedApplicant
                      .applicant?.phone ||
                    "N/A"
                  }
                </span>

              </div>

              <div className="applicant-detail-item">

                <strong>
                  Location
                </strong>

                <span>
                  {
                    selectedApplicant
                      .applicant?.location ||
                    "N/A"
                  }
                </span>

              </div>

              <div className="applicant-detail-item">

                <strong>
                  Job Applied For
                </strong>

                <span>
                  {
                    selectedApplicant
                      .job?.title ||
                    "N/A"
                  }
                </span>

              </div>

              <div className="applicant-detail-item">

                <strong>
                  Company
                </strong>

                <span>
                  {
                    selectedApplicant
                      .job?.company ||
                    "N/A"
                  }
                </span>

              </div>

              <div className="applicant-detail-item">

                <strong>
                  Skills
                </strong>

                <span>
                  {selectedApplicant
                    .applicant?.skills
                    ?.length
                    ? selectedApplicant
                        .applicant.skills
                        .join(", ")
                    : "No skills provided"}
                </span>

              </div>

              <div className="applicant-detail-item">

                <strong>
                  Status
                </strong>

                <span>
                  {formatStatus(
                    selectedApplicant.status
                  )}
                </span>

              </div>

              <div className="applicant-detail-full">

                <strong>
                  Cover Letter
                </strong>

                <p>
                  {
                    selectedApplicant
                      .coverLetter ||
                    "No cover letter provided."
                  }
                </p>

              </div>

              {selectedApplicant
                .applicant?.bio && (

                <div className="applicant-detail-full">

                  <strong>
                    Bio
                  </strong>

                  <p>
                    {
                      selectedApplicant
                        .applicant.bio
                    }
                  </p>

                </div>

              )}

              {selectedApplicant
                .resumeUrl && (

                <div className="applicant-detail-full">

                  <strong>
                    Resume
                  </strong>

                  <a
                    href={
                      selectedApplicant.resumeUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>

                </div>

              )}

            </div>

            {/* MODAL ACTIONS */}
            <div className="applicant-modal-actions">

              {selectedApplicant.status !==
                "shortlisted" &&
                selectedApplicant.status !==
                  "hired" && (
                  <button
                    className="accept-applicant-btn"
                    onClick={() =>
                      handleDecision(
                        selectedApplicant._id,
                        "shortlisted"
                      )
                    }
                  >
                    Shortlist
                  </button>
                )}

              {selectedApplicant.status ===
                "shortlisted" && (
                <button
                  className="accept-applicant-btn"
                  onClick={() =>
                    handleDecision(
                      selectedApplicant._id,
                      "hired"
                    )
                  }
                >
                  Hire
                </button>
              )}

              {selectedApplicant.status !==
                "rejected" &&
                selectedApplicant.status !==
                  "hired" && (
                  <button
                    className="reject-applicant-btn"
                    onClick={() =>
                      handleDecision(
                        selectedApplicant._id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </button>
                )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Applicants;