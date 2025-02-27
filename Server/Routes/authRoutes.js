const express = require("express");
const axios = require("axios");
const User = require('../Models/User');
require("dotenv").config();

const router = express.Router();

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

router.get("/google", (req, res) => {
  const authUrl = `${GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=https://url-shortner-g9ip.onrender.com/auth/google/callback&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
  res.redirect(authUrl);
});


// ✅ Google OAuth Callback
router.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.post(GOOGLE_TOKEN_URL, null, {
      params: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'https://url-shortner-g9ip.onrender.com/auth/google/callback',
        grant_type: "authorization_code",
        code,
      },
    });

    const { access_token, refresh_token, id_token } = response.data;
console.log('refresh token',refresh_token);
    // Fetch user info
    const userInfo = await axios.get(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
console.log(userInfo);
    const { sub, email } = userInfo.data;

    // Save tokens in DB
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = new User({ googleId: sub, email, googleAccessToken: access_token, googleRefreshToken: refresh_token });
    } else {
      user.googleAccessToken = access_token;
      user.googleRefreshToken = refresh_token ||user.googleRefreshToken
    }
    await user.save();

    res.redirect(
      `http://localhost:5173/dashboard?access_token=${access_token}`
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Authentication failed" });
  }
});


module.exports = router;
