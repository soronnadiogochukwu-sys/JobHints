import { useState } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaArrowRight,
  FaXmark,
} from "react-icons/fa6";

import TestiMonialsData from "../data/TestiMonialsData";
import "./TestiMonials.css";

function TestiMonials() {
  const [showAll, setShowAll] = useState(false);

  // The first 3 are displayed on the landing page
  const displayedTestimonials = TestiMonialsData.slice(0, 3);

  return (
    <section className="testimonials-section">

      {/* HEADER */}
      <div className="testimonials-header">

        <div className="testimonials-title">
          <h2>What Our Users Say</h2>
        </div>

        <button
          className="view-all-btn"
          onClick={() => setShowAll(true)}
          type="button"
        >
          View all
          <FaArrowRight />
        </button>

      </div>


      {/* TESTIMONIAL CARDS */}
      <div className="testimonials-grid">

        {displayedTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
          />
        ))}

      </div>


      {/* VIEW ALL MODAL */}
      {showAll && (
        <div
          className="testimonials-overlay"
          onClick={() => setShowAll(false)}
        >

          <div
            className="testimonials-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="modal-header">

              <div>
                <h2>What Our Users Say</h2>
                <p>
                  See what people are saying about JobHints.
                </p>
              </div>

              <button
                type="button"
                className="close-testimonials"
                onClick={() => setShowAll(false)}
                aria-label="Close testimonials"
              >
                <FaXmark />
              </button>

            </div>


            {/* ALL TESTIMONIALS */}
            <div className="all-testimonials-grid">

              {TestiMonialsData.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}

            </div>

          </div>

        </div>
      )}

    </section>
  );
}


/* ==============================
   TESTIMONIAL CARD
================================ */

function TestimonialCard({ testimonial }) {

  return (
    <article className="testimonial-card">

      {/* QUOTE */}
      <div className="quote-icon">
        <FaQuoteLeft />
      </div>


      {/* COMMENT */}
      <p className="testimonial-comment">
        {testimonial.comment}
      </p>


      {/* USER INFORMATION */}
      <div className="testimonial-user">

        <div className="user-image-wrapper">

          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-image"
            />
          ) : (
            <div className="user-placeholder">
              {testimonial.name.charAt(0)}
            </div>
          )}

        </div>


        <div className="user-details">

          <h3>{testimonial.name}</h3>

          <p>{testimonial.role}</p>


          {/* RATING */}
          <div
            className="testimonial-rating"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >

            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={
                  star <= testimonial.rating
                    ? "star active"
                    : "star"
                }
              />
            ))}

          </div>

        </div>

      </div>

    </article>
  );
}

export default TestiMonials;