const Link=require('../Models/Link');
const User=require('../Models/User');
const axios = require("axios");
const refreshAccessToken=require('./RefreshToken');
const client=require('../redisclient')

const GetLink=async (req, res) => {
     
    const shortUrl = `http://localhost:3001/${req.params.shortId}`;
    
     
  const url=await client.get(String(req.params.shortId))
   if(url){
    return res.redirect(url);
   }
 
    const dbEntry = await Link.findOne();
    if (!dbEntry || !dbEntry.urlMap.has(shortUrl)) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    console.log(dbEntry.urlMap.get(shortUrl));
      client.set(String(req.params.shortId), dbEntry.urlMap.get(shortUrl));
    res.redirect(dbEntry.urlMap.get(shortUrl));
  }



  const StoreLink=async (req, res) => {
  
    let accessToken = req.headers.authorization;
    
    if (!accessToken) {
      console.log('go')
      
      return res.redirect("http://localhost:3001/auth/google/callback");
    }
  
    try {
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
      );
  
      if (!response.data.email) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      const { url } = req.body;
       

      
    if (!url) return res.status(400).json({ error: "URL is required" });
  
    let dbEntry = await Link.findOne(); // Fetch the single document
  
    if (!dbEntry) {
      dbEntry = new Link({ urlMap: new Map(), counter: 0 });
    }
  
    // Check if URL already exists
   
  
    // Generate a new short URL
    const newurl = `http://localhost:3001/${dbEntry.counter}`;
    

    
    // ✅ Correct way to store with expiry
    let val=String(dbEntry.counter)
    await client.set(val,  url);
    
    
    
    dbEntry.urlMap.set(newurl, url);
    
     
      
    dbEntry.counter++;
    
    await dbEntry.save();
  
    res.json({ newurl });
    } catch (err) {
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
      );
      console.log('done');
      console.error("Token Expired:", err.response?.data || err.message);
  
      // 🔹 Fetch the user and refresh the token
      const user = await User.findOne({ email: response.data.email });
  
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
  }
  module.exports={GetLink,StoreLink}