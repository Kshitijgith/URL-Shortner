const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("./Controller/Auth"); // ✅ Import Passport Before Routes
const axios = require("axios");
const refreshAccessToken=require('./Controller/RefreshToken')
const app = express();
const User=require('./Models/User')
connectDB();

// ✅ Enable CORS
app.use(cors());

// ✅ Setup Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// ✅ Home Route
app.get("/", (req, res) => {
  res.json("Welcome to URL shortener");
});

// ✅ Dashboard Route with Google Access Token Verification
app.get("/dashboard", async (req, res) => {
  console.log(req.user);
  let accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.redirect("http://localhost:3001/auth/google/callback");
  }

  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
    );

    if (!response.data.email) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    res.json({ message: `Hello, ${response.data.email}` });
  } catch (err) {
    console.log(req);
    console.log('done');
    console.error("Token Expired:", err.response?.data || err.message);

    // 🔹 Fetch the user and refresh the token
    const user = await User.findOne({ email: req.user.email });

    if (user && user.googleRefreshToken) {
      const newAccessToken = await refreshAccessToken(user.googleRefreshToken);

      if (newAccessToken) {
        user.googleAccessToken = newAccessToken;
        await user.save();
        return res.json({ newAccessToken, message: "Token refreshed successfully" });
      }
    }

    return res.redirect("http://localhost:3001/auth/google/callback");
  }
});


// ✅ Logout Route
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});


app.use("/auth", require("./Routes/authRoutes")); // Ensure routes load after Passport

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on PORT ${PORT}`);
});
