const express = require("express"); //1
const router = express.Router(); // 2
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware"); // *
const listingController = require("../controllers/users")

router.route("/signup")
.get(listingController.renderSignupForm)
.post(wrapAsync(listingController.createUser))

router.route("/login")
.get(listingController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),listingController.login)



router.get("/logout",listingController.logout)

module.exports = router;