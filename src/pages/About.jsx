import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  FaBriefcase,
  FaUserTie,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import "./About.css";
import Footer from "../components/Footer"

function About() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    jobs: 0,
    employers: 0,
    graduates: 0,
    artisans: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // We will connect this to a stats endpoint in your API.
        const response = await API.get("/stats");

        setStats({
          jobs: response.data.jobs || 0,
          employers: response.data.employers || 0,
          graduates: response.data.graduates || 0,
          artisans: response.data.artisans || 0,
        });
      } catch (error) {
        console.error("Unable to fetch JobHints statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="about-page">
    <section className="about-section">
      <div className="about-container">

        {/* INTRO */}
        <div className="about-header">
          <span className="about-label">ABOUT JOBHINTS</span>

          <h1>
            Connecting Talent With
            <span> Opportunity.</span>
          </h1>

          <p>
            JobHints is a job platform designed to connect graduates,
            skilled artisans and employers in one place. We make it easier
            for job seekers to discover opportunities and for employers to
            find the right people for their businesses.
          </p>
        </div>

        {/* PLATFORM FEATURES */}
        <div className="about-features">

          <div className="about-card">
            <div className="about-icon">
              <FaBriefcase />
            </div>

            <h3>Find Graduate Jobs</h3>

            <p>
              Discover available job opportunities that match your skills,
              experience and career goals.
            </p>

            <button onClick={() => navigate("/jobs")}>
              Explore Jobs
              <FaArrowRight />
            </button>
          </div>

          <div className="about-card">
            <div className="about-icon">
              <FaUserTie />
            </div>

            <h3>Hire Skilled Artisans</h3>

            <p>
              Find skilled artisans and professionals who can provide
              reliable services for your personal or business needs.
            </p>

            <button onClick={() => navigate("/artisans")}>
              Find Artisans
              <FaArrowRight />
            </button>
          </div>

          <div className="about-card">
            <div className="about-icon">
              <FaUsers />
            </div>

            <h3>Employers</h3>

            <p>
              Employers can create job opportunities, publish vacancies
              and connect with qualified applicants.
            </p>

            <button onClick={() => navigate("/employers")}>
              Hire Talent
              <FaArrowRight />
            </button>
          </div>

        </div>

        {/* STATISTICS */}
        <div className="about-stats">

          <div className="about-stat">
            <h2>
              {loading ? "..." : `${stats.jobs}+`}
            </h2>
            <p>Jobs Posted</p>
          </div>

          <div className="about-stat">
            <h2>
              {loading ? "..." : `${stats.employers}+`}
            </h2>
            <p>Employers</p>
          </div>

          <div className="about-stat">
            <h2>
              {loading ? "..." : `${stats.graduates}+`}
            </h2>
            <p>Graduates</p>
          </div>

          <div className="about-stat">
            <h2>
              {loading ? "..." : `${stats.artisans}+`}
            </h2>
            <p>Artisans</p>
          </div>

        </div>

        {/* CALL TO ACTION */}
        <div className="about-cta">

          <div>
            <h2>Ready to find your next opportunity?</h2>

            <p>
              Whether you are looking for a job, hiring talent or offering
              your skills, JobHints is here to connect you.
            </p>
          </div>

          <button onClick={() => navigate("/jobs")}>
            Get Started
            <FaArrowRight />
          </button>

        </div>

      </div>
    </section>

    {/* Footer */}
    <Footer /> 
    </div>
  );
  
   
}

export default About;

