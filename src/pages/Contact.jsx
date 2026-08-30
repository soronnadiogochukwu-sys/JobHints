import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaPaperPlane,
} from "react-icons/fa6";
import API from "../services/api";
import Footer from "../components/Footer"
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFeedback({
      type: "",
      message: "",
    });

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFeedback({
        type: "error",
        message: "Please fill in all fields.",
      });

      return;
    }

    try {
      setLoading(true);

      await API.post("/contact", formData);

      setFeedback({
        type: "success",
        message:
          "Your message has been sent successfully. We will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <section className="contact-section">
      <div className="contact-container">

        {/* HEADER */}
        <div className="contact-header">
          <span>CONTACT US</span>

          <h1>
            We'd Love To
            <strong> Hear From You.</strong>
          </h1>

          <p>
            Have a question, suggestion, or need help using JobHints?
            Send us a message and our team will get back to you.
          </p>
        </div>

        {/* CONTACT CONTENT */}
        <div className="contact-content">

          {/* CONTACT INFORMATION */}
          <div className="contact-info">

            <h2>Get In Touch</h2>

            <p>
              Whether you're a job seeker, artisan, employer, or simply
              interested in JobHints, we're here to help.
            </p>

            <div className="contact-details">

              <div className="contact-detail">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>

                <div>
                  <h3>Email</h3>
                  <p>support@jobhints.com</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">
                  <FaPhone />
                </div>

                <div>
                  <h3>Phone</h3>
                  <p>+234 800 000 0000</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon">
                  <FaLocationDot />
                </div>

                <div>
                  <h3>Location</h3>
                  <p>Lagos, Nigeria</p>
                </div>
              </div>

            </div>

          </div>

          {/* CONTACT FORM */}
          <div className="contact-form-container">

            <form onSubmit={handleSubmit} className="contact-form">

              <div className="form-row">

                <div className="form-group">
                  <label htmlFor="name">Name</label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What is your message about?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {feedback.message && (
                <div
                  className={`contact-feedback ${feedback.type}`}
                >
                  {feedback.message}
                </div>
              )}

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane />
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
    
    {/* Footer */}
    <Footer/>
    </div>
  );
}

export default Contact;
