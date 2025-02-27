const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("./Controller/Auth"); // ✅ Import Passport Before Routes
const axios = require("axios");
const refreshAccessToken=require('./Controller/RefreshToken')
const app = express();

const {GetLink,StoreLink}=require('./Controller/GetLink')
connectDB();

// ✅ Enable CORS
app.use(cors());

// ✅ Setup Express Session


// ✅ Initialize Passport

app.use(express.json());

// ✅ Home Route
app.get("/", (req, res) => {
  res.json("Welcome to URL shortener");
});

// ✅ Dashboard Route with Google Access Token Verification
app.post("/GenrateUrl", StoreLink);


// ✅ Logout Route
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});


app.use("/auth", require("./Routes/authRoutes")); // Ensure routes load after Passport
app.get("/:shortId",GetLink );


// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`App running on PORT ${PORT}`);
});
