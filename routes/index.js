const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// /
// get
router.get("/", (req, res) => {
  //res.json("landing page");
});

// /dashboard
// get

router.get("/dashboard", ensureAuth, (req, res) => {
  //res.json("this is a protrected routes");
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } else {
    return res.status(400).json({ errors: [{ msg: "Login Failed" }] });
  }
});

router.get("/login/failed", (req, res) => {
  return res.status(400).json({ errors: [{ msg: "Login Failed" }] });
});
module.exports = router;
