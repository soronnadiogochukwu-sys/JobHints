import heroImage from "../assets/images/heroImage.jpg";
import { FaBriefcase, FaUserTie } from "react-icons/fa";
import "./Hero.css"
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="hero-left">
          <h1>
            Find the Right <span>Job.</span>
            <br />
            Hire Skilled <span>Artisans.</span>
            <br />
            Build A Better <span>Future.</span>
          </h1>

          <p>
            JobHints connects graduates, artisans and employers across
            industries. Discover opportunities that match your skills and
            grow your career.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              <FaBriefcase />
              Find Jobs
            </button>

            <button className="secondary-btn">
              <FaUserTie />
              Hire Artisans
            </button>
          </div>

          <div className="hero-users">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="user"
            />
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="user"
            />
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="user"
            />

            <h3>20K+</h3>

            <p>People already joined JobHints</p>
          </div>
        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Hero" />
        </div>

      </div>
    </section>
  );
}

export default Hero;