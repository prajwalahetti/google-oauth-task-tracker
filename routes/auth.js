const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const passport = require("passport");

// auth/google
// get auth
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//auth/google/callback
// get
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

// auth/current_user
// get
router.get("/current_user", ensureAuth, (req, res) => {
  res.json(req.user);
});

// logout user
// auth/logout
router.get("/logout", (req, res) => {
  //req.logout();
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });

  //res.redirect(process.env.CLIENT_URL);
});
module.exports = router;
