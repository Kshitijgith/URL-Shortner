const axios = require("axios");
const dotenv=require('dotenv');
dotenv.config();    
const refreshAccessToken = async ( refreshToken) => {
  try {
    
    const response = await axios.post('https://oauth2.googleapis.com/token',  {
      params: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
    });
console.log(response);
    const { access_token } = response.data;

    // Update access token in DB
    

    return access_token;
  } catch (error) {
    console.log("Error whiloe refreshing")
    return null;
  }
};
module.exports=refreshAccessToken;

