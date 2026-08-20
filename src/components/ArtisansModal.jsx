import {useState} from "react"
import "./ArtisansModal.css";
import {
  FaStar,
  FaLocationDot,
  FaBriefcase,
  FaCertificate,
  FaHammer,
  FaUserCheck,
  FaXmark
} from "react-icons/fa6";

function ArtisansModal({ artisan, onClose }) {
const [showForm, setShowForm] = useState (false);
const [success, setSuccess] = useState (false);
const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);
    setTimeout(() => {
    setSuccess(false);
    setShowForm(false);
    onClose();
    }, 2500); 
};
  return (
    <div className="modal-overlay">

      <div className="artisan-modal">

        <button className="close-btn" onClick={onClose}>
          <FaXmark />
        </button>

        <div className="modal-header">

          <img src={artisan.image} 
          alt={artisan.name} 
          />

          <h2>{artisan.name}</h2>

          <h4>{artisan.profession}</h4>

          <div className="rating">
            <FaStar className="star" />
            <span>{artisan.rating}</span>
          </div>

          <div className="location">
            <FaLocationDot />
            <span>{artisan.location}</span>
          </div>

        </div>

        <div className="section">

          <h3>
            <FaBriefcase />
            Experience
          </h3>

          <p>{artisan.experience}</p>

        </div>

        <div className="section">

          <h3>About</h3>

          <p>{artisan.about}</p>

        </div>

        <div className="section">

          <h3>
            <FaHammer />
            Skills
          </h3>

          <ul>
            {artisan.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

        </div>

        <div className="section">

          <h3>
            <FaBriefcase />
            Previous Jobs
          </h3>

          <ul>
            {artisan.previousJobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>

        </div>

        <div className="section">

          <h3>
            <FaCertificate />
            Certifications
          </h3>

          <ul>
            {artisan.certifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="section">

          <h3>
            <FaUserCheck />
            Availability
          </h3>

          <p>{artisan.availability}</p>

        </div>
        {/* interview form */}

        {!showForm && !success && (
        <form className="interview-form"
        onSubmit={handleSubmit}
        >
          <h3>interview invitation</h3> 

          <input type="time"
          required
          />

          <input type="text"
          placeholder="interview Location"
          required
          />
          
          <textarea 
          row ="5"
          placeholder="write a message to the applicant..."/>

          <button type="submit"className="send-btn">
             Send Invitation
             </button>
        </form>
        )}
        
        {/* success message */}

        {success &&(
            <div className="success-box">
                 <h3>✅ Invitation Sent Successfully</h3>

                 <p>
                    <strong>{artisan.name}</strong>
                 Has received your interview  invitation
                 </p>

                 <p>
                  An email application will be sent to the applicant
                 </p>
            </div>
           
        )}

      </div>

    </div>
  );
}

export default ArtisansModal;