const Link=require('../Models/Link');
const User=require('../Models/User');
const axios = require("axios");
const refreshAccessToken=require('./RefreshToken');
const client=require('../redisclient');
const crypto = require('crypto');

//Below is GetLink function which finds store link in db and in cache

const GetLink=async (req, res) => {
  console.log('under');
    const shortUrl = `url-shortner-g9iponrendercom/${req.params.shortId}`;
    console.log(req.params.shortId)
    console.log(shortUrl)
     
  const url=await client.get(String(req.params.shortId))
  console.log(url);
   if(url){
    console.log('reddis implemented');
    return res.redirect(url);
   }
 
    const dbEntry = await Link.findOne();
    if (!dbEntry || !dbEntry.urlMap.has(shortUrl)) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    console.log(dbEntry.urlMap.get(shortUrl));

       client.set(String(req.params.shortId), dbEntry.urlMap.get(shortUrl), 'EX', 86400); // 24 hours = 86400 seconds
       console.log(dbEntry.urlMap.get(shortUrl))
    res.redirect(dbEntry.urlMap.get(shortUrl));
  }



  //Below is Storelink which creates shortlink and store it in db
  const CreateLink=async(hashedKey,newurl,url)=>{
    let dbEntry = await Link.findOne(); // Fetch the single document
     console.log(dbEntry);
    if (!dbEntry) {
      dbEntry = new Link({ urlMap: new Map(), counter: 0 ,URL: new Map()});
      console.log(dbEntry);
    }
    if(dbEntry.URL.has(hashedKey)){
      newurl=dbEntry.URL.get(hashedKey)

      console.log( newurl);
      console.log(typeof(newurl))
      let lastSegment = newurl.split("/").pop(); 
    
    // Update newurl with the new base URL + last segment
    newurl = `https://url-shortner-g9ip.onrender.com/${lastSegment}`;

      return newurl
     }
     
    // Generate a new short URL
     newurl = `url-shortner-g9iponrendercom/${dbEntry.counter}`
    
    // ✅ Correct way to store with expiry
    let val=String(dbEntry.counter)
   
     
      

    dbEntry.urlMap.set(newurl, url);
   
    dbEntry.URL.set(hashedKey,newurl);
   
    dbEntry.counter++;
    await dbEntry.save();
     newurl=`https://url-shortner-g9ip.onrender.com/${dbEntry.counter-1}`
    return newurl
  }
  const StoreLink=async (req, res) => {

    const hashKey = (url) => crypto.createHash('sha256').update(url).digest('hex');
//console.log(req.headers.authorization);
    let accessToken = req.headers.authorization;
   
    const { url } = req.body;
    
    if (!accessToken) {
      console.log('go')
      
      return res.redirect("http/auth/google");
    }
  
    try {
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
      );
  var newurl
      if (!response.data.email) {
        return res.status(403).json({ message: "Invalid Token" });
      }
     
       const hashedKey = hashKey(url);


      
    if (!url) return res.status(400).json({ error: "URL is required" });
    newurl=await CreateLink(hashedKey,newurl,url)
    console.log(newurl);
    res.json({newurl});
    } catch (err) {
      
      if (err.response?.status === 400) {
        console.error("Token Expired. Refreshing...");
    
        const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
      );
    let Email=response.data.email
        const user = await User.findOne({ email:Email});
       console.log(user);
       console.log(err.response);
         
        if (user && user.googleRefreshToken) {
          const newAccessToken = await refreshAccessToken(user.googleRefreshToken);
          console.log('newtoken',newAccessToken)
    console.log('true');
          if (newAccessToken) {
            console.log("Token refreshed successfully!");
            user.googleAccessToken = newAccessToken;
            await user.save();
            var newurl
            const hashedKey = hashKey(url);
            newurl=await CreateLink(hashedKey,newurl)
console.log(newurl);
            return res.json({newurl})
           
          }
        }
      }
    
      return res.json("http/auth/google/callback");
    }
  
    
      
    }
  
  module.exports={GetLink,StoreLink}
