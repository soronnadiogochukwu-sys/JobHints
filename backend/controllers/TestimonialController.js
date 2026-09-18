const Testimonial = require("../models/Testimonial");
const User = require("../models/User");

/*
========================================
CALCULATE TESTIMONIAL QUALITY SCORE
========================================
*/

const calculateQualityScore = (feedback, rating) => {
  let score = 0;

  const text = feedback.toLowerCase().trim();

  /*
  ----------------------------------------
  1. RATING SCORE
  ----------------------------------------
  */
  score += rating * 10;

  /*
  ----------------------------------------
  2. FEEDBACK LENGTH
  ----------------------------------------
  */
  const length = text.length;

  if (length >= 80 && length <= 350) {
    score += 20;
  } else if (length >= 40 && length < 80) {
    score += 10;
  } else if (length > 350 && length <= 500) {
    score += 10;
  }

  /*
  ----------------------------------------
  3. USEFUL EXPERIENCE WORDS
  ----------------------------------------
  */
  const usefulWords = [
    "job",
    "hired",
    "hire",
    "employment",
    "work",
    "opportunity",
    "employer",
    "employee",
    "career",
    "project",
    "client",
    "artisan",
    "graduate",
    "application",
    "applied",
    "found",
    "position",
    "workshop",
    "business",
    "income",
  ];

  const usefulWordMatches = usefulWords.filter((word) =>
    text.includes(word)
  ).length;

  score += Math.min(usefulWordMatches * 3, 18);

  /*
  ----------------------------------------
  4. POSITIVE WORDS
  ----------------------------------------
  */
  const positiveWords = [
    "amazing",
    "excellent",
    "great",
    "good",
    "helpful",
    "easy",
    "simple",
    "professional",
    "reliable",
    "fantastic",
    "wonderful",
    "love",
    "loved",
    "happy",
    "satisfied",
    "recommend",
    "recommended",
    "success",
    "successful",
    "thank",
    "thanks",
    "grateful",
    "impressed",
    "useful",
    "awesome",
  ];

  const positiveWordMatches = positiveWords.filter((word) =>
    text.includes(word)
  ).length;

  score += Math.min(positiveWordMatches * 3, 15);

  /*
  ----------------------------------------
  5. NEGATIVE / UNSUITABLE WORDS
  ----------------------------------------
  */
  const negativeWords = [
    "useless",
    "terrible",
    "worst",
    "bad",
    "poor",
    "hate",
    "hated",
    "awful",
    "horrible",
    "scam",
    "fake",
    "fraud",
    "fraudulent",
    "waste",
    "disappointing",
    "disappointed",
    "angry",
    "annoying",
    "annoyed",
    "failed",
    "failure",
    "rubbish",
    "trash",
  ];

  const negativeWordMatches = negativeWords.filter((word) =>
    text.includes(word)
  ).length;

  score -= negativeWordMatches * 15;

  /*
  ----------------------------------------
  6. VERY SHORT / MEANINGLESS FEEDBACK
  ----------------------------------------
  */
  const meaninglessFeedback = [
    "nice",
    "good",
    "great",
    "cool",
    "okay",
    "ok",
    "fine",
    "love it",
    "nice website",
    "good website",
  ];

  if (meaninglessFeedback.includes(text)) {
    score -= 25;
  }

  /*
  ----------------------------------------
  KEEP SCORE BETWEEN 0 AND 100
  ----------------------------------------
  */
  score = Math.max(0, Math.min(score, 100));

  return score;
};


/*
========================================
SUBMIT TESTIMONIAL
========================================
*/

const createTestimonial = async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    /*
    ----------------------------------------
    VALIDATE USER
    ----------------------------------------
    */

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /*
    ----------------------------------------
    VALIDATE RATING
    ----------------------------------------
    */

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5.",
      });
    }

    /*
    ----------------------------------------
    VALIDATE FEEDBACK
    ----------------------------------------
    */

    if (!feedback || !feedback.trim()) {
      return res.status(400).json({
        message: "Please enter your feedback.",
      });
    }

    const cleanFeedback = feedback.trim();

    if (cleanFeedback.length < 10) {
      return res.status(400).json({
        message: "Feedback must be at least 10 characters.",
      });
    }

    if (cleanFeedback.length > 500) {
      return res.status(400).json({
        message: "Feedback cannot exceed 500 characters.",
      });
    }

    /*
    ----------------------------------------
    CALCULATE QUALITY SCORE
    ----------------------------------------
    */

    const qualityScore = calculateQualityScore(
      cleanFeedback,
      numericRating
    );

    /*
    ----------------------------------------
    AUTOMATIC DISPLAY DECISION
    ----------------------------------------
    
    A score of 60 or above is considered
    suitable for the landing page.

    Lower scores are saved but hidden.
    */

    const isGoodFeedback = qualityScore >= 60;

    /*
    ----------------------------------------
    CREATE TESTIMONIAL
    ----------------------------------------
    */

    const testimonial = await Testimonial.create({
      user: user._id,
      rating: numericRating,
      feedback: cleanFeedback,
      qualityScore,
      isApproved: isGoodFeedback,
      isDisplayed: isGoodFeedback,
    });

    res.status(201).json({
      message: isGoodFeedback
        ? "Thank you for your feedback. Your testimonial has been submitted."
        : "Thank you for your feedback. It has been received.",
      testimonial: {
        id: testimonial._id,
        rating: testimonial.rating,
        feedback: testimonial.feedback,
        qualityScore: testimonial.qualityScore,
        isDisplayed: testimonial.isDisplayed,
      },
    });

  } catch (error) {
    console.error(
      "CREATE TESTIMONIAL ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to submit testimonial",
      error: error.message,
    });
  }
};


/*
========================================
GET DISPLAYED TESTIMONIALS
========================================
*/

const getDisplayedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      isApproved: true,
      isDisplayed: true,
    })
      .populate(
        "user",
        "name role profileImage"
      )
      .sort({
        qualityScore: -1,
        createdAt: -1,
      })
      .limit(10);

    res.status(200).json({
      count: testimonials.length,
      testimonials,
    });

  } catch (error) {
    console.error(
      "GET DISPLAYED TESTIMONIALS ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};


/*
========================================
EXPORT CONTROLLERS
========================================
*/

module.exports = {
  createTestimonial,
  getDisplayedTestimonials,
};