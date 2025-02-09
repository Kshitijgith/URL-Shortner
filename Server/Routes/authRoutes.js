const express = require("express");
const passport = require("passport");

const router = express.Router();

// ✅ Google OAuth Login Route (Ensure scope is present)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  
  (req, res) => {
    // ✅ Send Google access token to frontend 
    res.redirect(`http://localhost:5173/?token=${req.user.googleAccessToken}`);
  }
  
);

module.exports = router;
