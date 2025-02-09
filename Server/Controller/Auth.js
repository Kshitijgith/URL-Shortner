const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/User"); 
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      scope: ["profile", "email"],
      accessType: "offline",  // ✅ Get refresh token
      prompt: "consent", // ✅ Ask for permission again
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(accessToken);
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            googleRefreshToken: refreshToken,  // ✅ Store refresh token
          });
          await user.save();
          
        } else {
          user.googleRefreshToken = refreshToken; // ✅ Update refresh token if changed
          await user.save();
        }

        user.googleAccessToken = accessToken;
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


// ✅ Fix serialization (store accessToken too)
passport.serializeUser((user, done) => {
  done(null, { id: user.id, accessToken: user.googleAccessToken });
});

passport.deserializeUser(async (obj, done) => {
  try {
    const user = await User.findById(obj.id);
    user.googleAccessToken = obj.accessToken; 
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
