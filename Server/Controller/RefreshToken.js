const axios = require("axios");
const dotenv=require('dotenv');
dotenv.config();    
async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", null, {
      params: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      },
    });

    return response.data.access_token;  // ✅ Return new access token
  } catch (error) {
    console.error("Error refreshing access token:", error.response?.data || error.message);
    return null;
  }
}
module.exports=refreshAccessToken;
