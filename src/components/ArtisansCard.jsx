import "./FeaturedArtisans.css";
import { FaLocationDot, FaStar } from "react-icons/fa6";

function ArtisansCard({ artisan, onHire }) {
  return (
    <div className="artisans-card">
      <div className="artisans-image">
        <img
          src={artisan.profileImage}
          alt={artisan.name}
        />
      </div>

      <div className="artisan-details">
        <h3>{artisan.name}</h3>

        <p className="profession">
          {artisan.trade}
        </p>

        <div className="artisan-rating">
          <FaStar className="star" />
          <span>
            {artisan.experience
              ? `${artisan.experience} experience`
              : "Experienced Artisan"}
          </span>
        </div>

        <div className="artisan-location">
          <FaLocationDot className="location-icon" />
          <span>{artisan.location || "Location not specified"}</span>
        </div>
      </div>

      <button
        className="hire-btn"
        onClick={() => onHire(artisan)}
      >
        Hire Now
      </button>
    </div>
  );
}

export default ArtisansCard;
