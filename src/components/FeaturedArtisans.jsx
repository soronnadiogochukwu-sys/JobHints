import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import API from "../services/api";
import ArtisansCard from "../components/ArtisansCard";
import ArtisansModal from "../components/ArtisansModal";
import FeedbackModal from "../components/FeedbackModal";
import "./FeaturedArtisans.css";

function FeaturedArtisans({ currentUser, openLogin, openSignup }) {
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [artisans, setArtisans] = useState([]);
  const navigate = useNavigate();

  // ==========================================
  // FETCH FEATURED ARTISANS
  // ==========================================
  useEffect(() => {
    const fetchFeaturedArtisans = async () => {
      try {
        const response = await API.get("/users/featured-artisans");

        setArtisans(response.data.artisans || []);

      } catch (error) {
        console.error(
          "FETCH FEATURED ARTISANS ERROR:",
          error
        );

        setArtisans([]);
      }
    };

    fetchFeaturedArtisans();
  }, []);

  const handleHireNow = (artisan) => {
    if (!currentUser) {
      setFeedback({
        variant: "info",
        title: "Sign in required",
        message: "Please sign in as an employer to hire artisans.",
        primaryLabel: "Sign in",
        primaryAction: () => openLogin && openLogin(),
        secondaryLabel: "Create account",
        secondaryAction: () => openSignup && openSignup(),
      });
      return;
    }

    if (currentUser.role !== "employer") {
      setFeedback({
        variant: "error",
        title: "Access denied",
        message: "Only users registered as employers can hire artisans.",
      });
      return;
    }

    setSelectedArtisan(artisan);
  };

  const closeModal = () => {
    setSelectedArtisan(null);
  };

  return (
    <section className="featured-artisans">
      <div className="featured-header">
        <div>
          <h2>Featured Artisans</h2>
          <p>
            Discover skilled artisans ready to work on your next project.
          </p>
        </div>

        <button
          className="view-all-btn"
          onClick={() => navigate("/artisans")}
        >
          View All
          <FaArrowRight />
        </button>
      </div>

      <div className="artisans-grid">
        {artisans.slice(0, 4).map((artisan) => (
          <ArtisansCard
            key={artisan._id}
            artisan={artisan}
            onHire={handleHireNow}
          />
        ))}
      </div>

      {selectedArtisan && (
        <ArtisansModal
          artisan={selectedArtisan}
          onClose={closeModal}
        />
      )}

      {feedback && (
        <FeedbackModal
          title={feedback.title}
          message={feedback.message}
          variant={feedback.variant}
          primaryLabel={feedback.primaryLabel}
          secondaryLabel={feedback.secondaryLabel}
          primaryAction={feedback.primaryAction}
          secondaryAction={feedback.secondaryAction}
          onClose={() => setFeedback(null)}
        />
      )}
    </section>
  );
}

export default FeaturedArtisans;

