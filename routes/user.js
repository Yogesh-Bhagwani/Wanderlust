const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router.route("/signup")
    .get( userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get((req,res)=>{
        res.render("users/login.ejs");
    })
    .post( saveRedirectUrl,
        passport.authenticate("local", //stretagey
            { 
                failureRedirect: '/login' , 
                failureFlash : true
            },
        ),
        userController.login,
    );

 
router.get("/logout",userController.logout)

module.exports = router;