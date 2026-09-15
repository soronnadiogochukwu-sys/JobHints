import { useState } from "react";
import "./ArtisansModal.css";
import {
  FaStar,
  FaLocationDot,
  FaBriefcase,
  FaHammer,
  FaUserCheck,
  FaXmark,
  FaPhone,
  FaListCheck,
  FaImages,
} from "react-icons/fa6";
import API from "../services/api";

function ArtisansModal({ artisan, onClose }) {
  const [showForm, setShowForm] = useState(false);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ==========================================
  // SELECT ACTION
  // ==========================================

  const handleAction = (selectedAction) => {
    setAction(selectedAction);
    setShowForm(true);
  };

  // ==========================================
  // SUBMIT HIRE / INTERVIEW REQUEST
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.target);

      const message =
        formData.get("message") || "";

      const status =
        action === "hire"
          ? "hired"
          : "shortlisted";

      const response = await API.post(
        `/applications/direct-hire/${artisan._id}`,
        {
          status,
          message,
        }
      );

      console.log(
        "DIRECT HIRE RESPONSE:",
        response.data
      );

      setSuccess(true);

    } catch (error) {
      console.error(
        "DIRECT HIRE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to send request. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="modal-overlay">

      <div className="artisan-modal">

        <button
          className="close-btn"
          onClick={onClose}
          type="button"
        >
          <FaXmark />
        </button>

        {/* =========================
            ARTISAN HEADER
        ========================= */}

        <div className="modal-header">

          <img
            src={
              artisan.profileImage ||
              "https://via.placeholder.com/150?text=Artisan"
            }
            alt={artisan.name}
          />

          <h2>{artisan.name}</h2>

          <h4>
            {artisan.trade || "Artisan"}
          </h4>

          <div className="rating">

            <FaStar className="star" />

            <span>
              {artisan.experience
                ? `${artisan.experience} years experience`
                : "Experienced Artisan"}
            </span>

          </div>

          <div className="location">

            <FaLocationDot />

            <span>
              {artisan.location ||
                "Location not specified"}
            </span>

          </div>

          {artisan.phone && (
            <div className="location">

              <FaPhone />

              <span>
                {artisan.phone}
              </span>

            </div>
          )}

        </div>

        {/* =========================
            EXPERIENCE
        ========================= */}

        <div className="section">

          <h3>
            <FaBriefcase />
            Experience
          </h3>

          <p>
            {artisan.experience
              ? `${artisan.experience} years of experience`
              : "Experience not specified"}
          </p>

        </div>

        {/* =========================
            ABOUT
        ========================= */}

        <div className="section">

          <h3>
            About
          </h3>

          <p>
            {artisan.bio ||
              "No bio has been added yet."}
          </p>

        </div>

        {/* =========================
            SKILLS
        ========================= */}

        <div className="section">

          <h3>
            <FaHammer />
            Skills
          </h3>

          {artisan.skills &&
          artisan.skills.length > 0 ? (

            <ul>

              {artisan.skills.map(
                (skill, index) => (
                  <li key={index}>
                    {skill}
                  </li>
                )
              )}

            </ul>

          ) : (

            <p>
              No skills added yet.
            </p>

          )}

        </div>

        {/* =========================
            SERVICES
        ========================= */}

        <div className="section">

          <h3>
            <FaListCheck />
            Services Offered
          </h3>

          {artisan.services &&
          artisan.services.length > 0 ? (

            <ul>

              {artisan.services.map(
                (service, index) => (
                  <li key={index}>
                    {service}
                  </li>
                )
              )}

            </ul>

          ) : (

            <p>
              No services added yet.
            </p>

          )}

        </div>

        {/* =========================
            AVAILABILITY
        ========================= */}

        <div className="section">

          <h3>
            <FaUserCheck />
            Availability
          </h3>

          <p>
            {artisan.availability ||
              "Availability not specified"}
          </p>

        </div>

        {/* =========================
            PORTFOLIO
        ========================= */}

        <div className="section">

          <h3>
            <FaImages />
            Portfolio / Work Samples
          </h3>

          {artisan.portfolio &&
          artisan.portfolio.length > 0 ? (

            <div className="artisan-portfolio">

              {artisan.portfolio.map(
                (item, index) => (

                  <div
                    className="portfolio-item"
                    key={index}
                  >

                    <img
                      src={item}
                      alt={`${artisan.name} portfolio ${
                        index + 1
                      }`}
                    />

                  </div>

                )
              )}

            </div>

          ) : (

            <p>
              No portfolio or work samples added yet.
            </p>

          )}

        </div>

        {/* =========================
            EMPLOYER DECISION
        ========================= */}

        {!showForm && !success && (

          <div className="interview-form">

            <h3>
              What would you like to do?
            </h3>

            <button
              type="button"
              className="invite-btn"
              onClick={() =>
                handleAction("shortlist")
              }
            >
              Invite for Interview
            </button>

            <button
              type="button"
              className="send-btn"
              onClick={() =>
                handleAction("hire")
              }
            >
              Hire Now
            </button>

          </div>

        )}

        {/* =========================
            ACTION FORM
        ========================= */}

        {showForm && !success && (

          <form
            className="interview-form"
            onSubmit={handleSubmit}
          >

            <h3>
              {action === "hire"
                ? "Hire Artisan"
                : "Interview Invitation"}
            </h3>

            {action === "shortlist" && (

              <>
                <input
                  type="time"
                  name="interviewTime"
                  required
                />

                <input
                  type="text"
                  name="interviewLocation"
                  placeholder="Interview Location"
                  required
                />
              </>

            )}

            <textarea
              name="message"
              rows="5"
              placeholder={
                action === "hire"
                  ? "Write a message to the artisan..."
                  : "Write an interview invitation..."
              }
              required
            />

            <button
              type="submit"
              className="send-btn"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : action === "hire"
                ? "Confirm Hire"
                : "Send Invitation"}
            </button>

          </form>

        )}

        {/* =========================
            SUCCESS MESSAGE
        ========================= */}

        {success && (

          <div className="success-box">

            <h3>
              {action === "hire"
                ? "✅ Artisan Hired Successfully"
                : "✅ Invitation Sent Successfully"}
            </h3>

            <p>

              <strong>
                {artisan.name}
              </strong>

              {action === "hire"
                ? " has been hired successfully."
                : " has been shortlisted for an interview."}

            </p>

            <p>
              The application status has been updated.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default ArtisansModal;

