const express = require("express"); //1
const router = express.Router({ mergeParams: true });// 2
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js") // schema.js lo object petti module.exports chessam and that we are requiring now
const Review = require("../models/review.js"); 
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview,isReviewAuthor} = require("../middleware.js")
const listingController = require("../controllers/reviews.js")



router.post("/", isLoggedIn,validateReview,wrapAsync(listingController.createReview))



router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapAsync(listingController.destroyReview))

module.exports = router