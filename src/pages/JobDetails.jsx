import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import Modal from "../components/Modal";
import FeedbackModal from "../components/FeedbackModal";
import "./JobDetails.css";


// ======================================================
// APPLY FORM
// ======================================================

function ApplyForm({
  job,
  onClose,
  currentUser,
  openLogin,
  openSignup,
}) {
  const [feedback, setFeedback] = useState(null);
  const [applicationSent, setApplicationSent] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);


  // Prefill applicant information
  useEffect(() => {
  if (currentUser) {
    setName(
      currentUser.fullName ||
      currentUser.name ||
      ""
    );

    setEmail(
      currentUser.email || ""
    );
  }
}, [currentUser]);


  // Submit application
  const submit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setFeedback({
        variant: "error",
        title: "Login required",
        message: "Please log in before applying for this job.",
      });

      return;
    }

    if (!file) {
      setFeedback({
        variant: "error",
        title: "CV required",
        message: "Please upload your CV before submitting.",
      });

      return;
    }

    const response = await API.post(
      `/applications/${job._id}`,
      {
        coverLetter: note,
        resumeUrl: file.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Application response:", response.data);

    setApplicationSent(true);

    setFeedback({
      variant: "success",
      title: "Application submitted",
      message: "Your application has been submitted successfully.",
    });

  } catch (error) {
    console.error("Application error:", error);
    console.error("Server response:", error.response?.data);

    setFeedback({
      variant: "error",
      title: "Application failed",
      message:
        error.response?.data?.message ||
        "Something went wrong while submitting your application.",
    });
  }
};
  // ======================================================
  // USER NOT LOGGED IN
  // ======================================================

  if (!currentUser) {
    return (
      <div className="apply-form">

        <h2>I have an account</h2>

        <p>
          Sign in to apply for this job.
        </p>

        <p>
          I don't have an account. Create an account to
          apply for jobs.
        </p>

        <div className="auth-actions">

          <button
            className="primary-btn"
            onClick={() =>
              openLogin && openLogin()
            }
          >
            Sign in
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              openSignup && openSignup()
            }
          >
            Create account
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>
    );
  }


  // ======================================================
  // LOGGED-IN USER APPLICATION FORM
  // ======================================================

  return (
    <div className="apply-form">

      <h2>
        Apply for {job?.title}
      </h2>

      <form onSubmit={submit}>

        {/* FULL NAME */}

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />


        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />


        {/* NOTE */}

        <textarea
          placeholder="Short note"
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
        />


        {/* CV */}

        <label>
          Upload CV (PDF, DOC, DOCX)

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setFile(
                e.target.files &&
                e.target.files[0]
              )
            }
            required
          />
        </label>


        {/* FORM BUTTONS */}

        <div className="form-actions">

          <button
            type="submit"
            className="primary-btn"
          >
            Send Application
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </form>


      {/* FEEDBACK MODAL */}

      {feedback && (
        <FeedbackModal
          title={feedback.title}
          message={feedback.message}
          variant={feedback.variant}
          onClose={() => {
            setFeedback(null);

            if (applicationSent) {
              onClose();
            }
          }}
        />
      )}

    </div>
  );
}




// JOB DETAILS

function JobDetails({
  onClose,
  currentUser,
  openLogin,
  openSignup,
}) {

  // Get MongoDB job ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // JOB DETAILS STATES

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showApply, setShowApply] = useState(false);


  // FETCH JOB FROM API

  useEffect(() => {

    const fetchJob = async () => {

      try {

        setLoading(true);

        console.log(
          "Job ID from URL:",
          id
        );


        const response = await fetch(
          `http://localhost:5000/api/jobs/${id}`
        );


        console.log(
          "API response status:",
          response.status
        );


        if (!response.ok) {
          throw new Error(
            "Job not found"
          );
        }


        const data = await response.json();

        console.log(
          "Job received from MongoDB:",
          data
        );

        setJob(data.job);

      } catch (error) {

        console.error(
          "Error fetching job:",
          error
        );

        setJob(null);

      } finally {

        setLoading(false);

      }

    };


    if (id) {
      fetchJob();
    }

  }, [id]);



  // LOADING

  if (loading) {

    return (
      <div className="details">

        <h2>
          Loading job...
        </h2>

      </div>
    );

  }



  // JOB NOT FOUND

  if (!job) {

    return (
      <div className="details">

        <h2>
          Job Not Found
        </h2>

        <p>
          We couldn't find the job you're
          looking for.
        </p>

      </div>
    );

  }


  // JOB DETAILS PAGE

  return (

    <div className="details">


      {/* CLOSE BUTTON */}

      {onClose && (

        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close details"
        >
          ×
        </button>

      )}



      {/*JOB HEADER*/}

      <div className="job-header">


        <div className="job-intro">


          {/* COMPANY LOGO */}

          {job.logo && (

            <img
              src={job.logo}
              alt={`${job.company} logo`}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />

          )}



          {/* JOB TITLE */}

          <h1>
            {job.title}
          </h1>



          {/* COMPANY */}

          <p className="company">
            {job.company}
          </p>



          {/* JOB TAGS */}

          <div className="job-tags">


            {job.location && (

              <span>
                {job.location}
              </span>

            )}


            {job.type && (

              <span>
                {job.type}
              </span>

            )}


            {job.status && (

              <span>
                {job.status}
              </span>

            )}

          </div>

        </div>


         {/* SALARY */}
            
        <div className="job-summary-card">

          <p>
            Salary
          </p>

          <h3>
            {job.salary ||
              "Salary not specified"}
          </h3>

        </div>

      </div>



      {/*JOB OVERVIEW */}

      <section className="job-section">

        <h3>
          Job Overview
        </h3>

        <p>
          {job.description ||
            "No description provided."}
        </p>

      </section>



      {/* REQUIRED SKILLS*/}

      {job.skills &&
        job.skills.length > 0 && (

          <section className="job-section">

            <h3>
              Required Skills
            </h3>

            <div className="job-tags">

              {job.skills.map(
                (skill, index) => (

                  <span
                    key={index}
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

          </section>

        )}



      {/*APPLICATION DEADLINE*/}

      {job.deadline && (

        <section className="job-section">

          <h3>
            Application Deadline
          </h3>

          <p>
            {new Date(
              job.deadline
            ).toLocaleDateString()}
          </p>

        </section>

      )}



      {/*DASHBOARD NAVIGATION */}

<div className="job-details-actions">

  <button
    type="button"
    className="back-dashboard-btn"
    onClick={() => navigate("/dashboard")}
  >
    ← Back to Dashboard
  </button>

  <button
    type="button"
    className="primary-btn"
    onClick={() => setShowApply(true)}
  >
    Apply Now
  </button>

</div>

{/* APPLY MODAL */}

      {showApply && (

        <Modal
          onClose={() =>
            setShowApply(false)
          }
          ariaLabel="Apply form"
        >

          <ApplyForm
            job={job}
            onClose={() =>
              setShowApply(false)
            }
            currentUser={currentUser}
            openLogin={openLogin}
            openSignup={openSignup}
          />

        </Modal>

      )}

    </div>

  );
}



export default JobDetails;