const Link=require('../Models/Link');
const User=require('../Models/User');
const axios = require("axios");
const refreshAccessToken=require('./RefreshToken');
const client=require('../redisclient');
const crypto = require('crypto');

//Below is GetLink function which finds store link in db and in cache

const GetLink=async (req, res) => {
  console.log('under');
  
  const ttl = await client.TTL(String(req.params.shortId));

if (ttl === -1) {
  console.log('Key exists but has no expiration.');
} else if (ttl === -2) {
  console.log('Key does not exist.');
} else {
  console.log(`Key will expire in ${ttl} seconds.`);
}

const keys = await client.keys('*'); // Fetch keys after flushing
console.log(keys);

for (let key of keys) {
  const value = await client.get(key);
  console.log(`${key}: ${value}`);
}

    const shortUrl = req.params.shortId;
    console.log(req.params.shortId)
    //console.log(shortUrl)
     
  const url=await client.get(String(req.params.shortId))
  
   if(url){
    console.log('reddis implemented');
    console.log(url);
    return res.redirect(url);
   }
 
    const dbEntry = await Link.findOne();
    if (!dbEntry || !dbEntry.URL.has(shortUrl)) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    console.log(dbEntry.URL.get(shortUrl));

    client.setEx(String(req.params.shortId), 24 * 60 * 60, dbEntry.URL.get(shortUrl));

    console.log('client set with expiry');
       console.log(dbEntry.URL.get(shortUrl))
    return res.redirect(dbEntry.URL.get(shortUrl));
  }



  //Below is Storelink which creates shortlink and store it in db
  const CreateLink=async(hashedKey,newurl,url)=>{
    let dbEntry = await Link.findOne(); // Fetch the single document
     console.log(dbEntry);
    if (!dbEntry) {
      dbEntry = new Link({ URL: new Map()});
      console.log(dbEntry);
    }
    if(dbEntry.URL.has(hashedKey)){
      newurl=dbEntry.URL.get(hashedKey)

      console.log( newurl);
      console.log(typeof(newurl))
      
       
    // Update newurl with the new base URL + last segment
    newurl = `https://url-shortner-g9ip.onrender.com/${hashedKey}`;

      return newurl
     }
     
    // Generate a new short URL
     newurl = `url-shortner-g9iponrendercom/${hashedKey}`
    
    // ✅ Correct way to store with expiry
    
   
     
      

   
    dbEntry.URL.set(hashedKey,url);
   
    
    await dbEntry.save();
     newurl=`https://url-shortner-g9ip.onrender.com/${hashedKey}`
    return newurl
  }
  const StoreLink=async (req, res) => {
console.log('in  executing')
    const hashKey = (url) => crypto.createHash('md5').update(url).digest('hex');
//console.log(req.headers.authorization);
    let accessToken = req.headers.authorization;
   
    const { url } = req.body;
    console.log(url);
    if (!accessToken) {
      console.log('go')
      
      return res.redirect("https://url-shortner-g9ip.onrender.com/auth/google/callback");
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
        console.log("Token expiring")
      // Find user based on stored email (use accessToken to get email)
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`
      );
      console.log(response)
    let Email=response.data.email
        const user = await User.findOne({ email:Email});
         
        if (user && user.googleRefreshToken) {
          const newAccessToken = await refreshAccessToken(user.googleRefreshToken);
          console.log(newAccessToken)
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
    
      return res.json("https://url-shortner-g9ip.onrender.com/auth/google/callback");
    }
  
    
      
    }
  
  module.exports={GetLink,StoreLink}