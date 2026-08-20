import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =========================
            BRAND SECTION
        ========================== */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <span>Job</span>
            <strong>Hints</strong>
          </Link>

          <p>
            Connecting skilled artisans, job seekers and
            employers across Nigeria.
          </p>

          <div className="footer-socials">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

          </div>

        </div>


        {/* =========================
            QUICK LINKS
        ========================== */}
        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/jobs">Jobs</Link>

          <Link to="/artisans">Artisans</Link>

          <Link to="/employers">Employers</Link>

          <Link to="/about">About Us</Link>

          <Link to="/contact">Contact</Link>

        </div>


        {/* =========================
            JOB SEEKERS
        ========================== */}
        <div className="footer-column">

          <h3>For Job Seekers</h3>

          <Link to="/jobs">Browse Jobs</Link>

          <Link to="/signup">Create Account</Link>

          <Link to="/jobs">Job Alerts</Link>

          <Link to="/career-tips">Career Tips</Link>

          <Link to="/help">Help Center</Link>

        </div>


        {/* =========================
            EMPLOYERS
        ========================== */}
        <div className="footer-column">

          <h3>For Employers</h3>

          <Link to="/employers/post-job">
            Post a Job
          </Link>

          <Link to="/artisans">
            Browse Artisans
          </Link>

          <Link to="/employers/pricing">
            Pricing
          </Link>

          <Link to="/resources">
            Resources
          </Link>

          <Link to="/employer-login">
            Employer Login
          </Link>

        </div>


        {/* =========================
            SUPPORT
        ========================== */}
        <div className="footer-column">

          <h3>Support</h3>

          <Link to="/faqs">
            FAQs
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================== */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} JobHints.
          All rights reserved.
        </p>

        <div className="payment-methods">
          <span className="visa">VISA</span>
          <span className="mastercard">MC</span>
          <span className="verve">Verve</span>
          <span className="pay-icon">₦</span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;