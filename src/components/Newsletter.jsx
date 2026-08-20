import { useState } from "react";
import {
  FaEnvelope,
  FaPaperPlane,
  FaCheck,
} from "react-icons/fa6";

import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    // Empty email
    if (!trimmedEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    // Invalid email
    if (!validateEmail(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Loading
    setStatus("loading");
    setMessage("");

    try {
      /*
        For now, this simulates a successful subscription.

        When i connect Firebase/backend, i will replace this section
        with the actual database/API request.
      */

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setMessage("You're subscribed! Welcome to JobHints.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section className="newsletter-section">

      <div className="newsletter-container">

        {/* LEFT SIDE */}
        <div className="newsletter-content">

          <h2>Stay Updated</h2>

          <p>
            Subscribe to our newsletter and get the latest job
            opportunities and career tips.
          </p>

          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
          >

            <div className="newsletter-input-wrapper">

              <FaEnvelope className="newsletter-input-icon" />

              <label
                htmlFor="newsletter-email"
                className="sr-only"
              >
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (status !== "idle") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                disabled={status === "loading"}
                autoComplete="email"
              />

            </div>

            <button
              type="submit"
              className="newsletter-button"
              disabled={status === "loading"}
            >

              {status === "loading" ? (
                <>
                  <span className="newsletter-spinner"></span>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <FaPaperPlane />
                </>
              )}

            </button>

          </form>

          {/* MESSAGE */}
          {message && (
            <div
              className={`newsletter-message ${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "success" && <FaCheck />}
              <span>{message}</span>
            </div>
          )}

        </div>


        {/* RIGHT SIDE ILLUSTRATION */}
        <div className="newsletter-illustration">

          <div className="illustration-circle circle-one"></div>
          <div className="illustration-circle circle-two"></div>

          {/* Small envelope icon */}
          <div className="floating-mail floating-mail-one">
            <FaEnvelope />
          </div>

          <div className="floating-mail floating-mail-two">
            <FaEnvelope />
          </div>


          {/* Main envelope */}
          <div className="main-envelope">

            {/* Paper */}
            <div className="letter-paper">

              <div className="letter-line line-one"></div>
              <div className="letter-line line-two"></div>
              <div className="letter-line line-three"></div>
              <div className="letter-line line-four"></div>

            </div>

            {/* Envelope */}
            <div className="envelope-body">

              <div className="envelope-flap"></div>

              <div className="envelope-left"></div>

              <div className="envelope-right"></div>

            </div>

          </div>


          {/* Paper plane */}
          <div className="paper-plane">
            <FaPaperPlane />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;