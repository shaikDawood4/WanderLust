const express = require("express"); //1
const router = express.Router(); // 2
const wrapAsync = require("../utils/wrapAsync.js"); // 5
const {listingSchema,reviewSchema} = require("../schema.js") // 6
const ExpressError = require("../utils/ExpressError.js"); // 7 as of now we arent using this here, it is being used in middleware.js
const Listing = require("../models/listing.js"); // 9 
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js") // we can write {index}
const multer  = require('multer') // parse karenge
const {storage} = require("../cloudConfig.js")
const upload = multer({storage}) // forms me files nikaalta, aur uploads naam ka folder auto bana ke usme daalta


router.route("/")
 .get(wrapAsync(listingController.index)) // if we use {index} then we can just pass index here
 .post( isLoggedIn,upload.single('image'),validateListing,wrapAsync(listingController.createListing))



router.get("/new", isLoggedIn,wrapAsync(listingController.renderNewForm))


router.route("/:id")
// show route
.get(validateListing,  wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('image'),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))


router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.renderEditform))



module.exports= router // 4