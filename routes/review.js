const express = require("express");
const router = express.Router({mergeParams :true});
const wrapAsync = require("../utils/wrapAsync.js"); 
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {vaildateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");




//Post review Route
router.post(
    "/",
    isLoggedIn,
    vaildateReview,
    wrapAsync(reviewController.createReview)
);

//Delete review Route
router.delete(
    "/:reviewId" ,
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);


module.exports = router;