const express = require("express");

const {
  createTestimonial,
  getDisplayedTestimonials,
} = require("../controllers/TestimonialController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


/*
========================================
SUBMIT TESTIMONIAL
========================================
*/

router.post(
  "/",
  authMiddleware,
  roleMiddleware("graduate", "artisan", "employer"),
  createTestimonial
);


/*
========================================
GET DISPLAYED TESTIMONIALS
========================================
*/

router.get(
  "/",
  getDisplayedTestimonials
);


module.exports = router;