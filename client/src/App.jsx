import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
const App = () => {
  const location=useLocation();
  var params = new URLSearchParams(location.search);
    var token = params.get("access_token");
  console.log(token);
    
  const navigate=useNavigate();
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

    // Get token from query params
    params = new URLSearchParams(location.search);
     

    if (token) {
      localStorage.setItem("authToken", token); // ✅ Store token in localStorage
      console.log(localStorage.getItem("authToken"));
    } else {
      if(localStorage.getItem("authToken")){
        console.log('hi')
        token=localStorage.getItem("authToken");
        console.log(token);
      }
      else{
        navigate("/"); // If no token, redirect to login
      }
      
    }

const logout=()=>{
  params.delete("token");
  localStorage.removeItem("authToken");
  console.log(params.get("token"));
  console.log(localStorage.getItem("authToken"));
  navigate('/')


}

  const handleSubmit = async (e) => {
     token = localStorage.getItem("authToken");
    
    if (!token) {
     alert('login first');
     return;
      
    }
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      console.log(token);
      const response = await axios.post("https://url-shortner-g9ip.onrender.com/GenrateUrl",
        {url:url},
        {
        headers: {
          Authorization: token
        }
      })
    console.log(response);
      setShortUrl(response.data.newurl)
      console.log
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
    
    
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gradient-to-br from-gray-700 via-gray-500 to-gray-400">

  <header className="w-100p h-8p sm:h-10p bg-gray-800 flex justify-between items-center px-5 shadow-lg rounded-b-xl">
    <h1 className="sm:w-40p w-20p font-bold text-white h-100p text-2xl flex items-center justify-center">
      URL Shortener
    </h1>
    <div className="h-100p w-50p sm:w-60p flex justify-end items-center">
      {!token ? (
        <GoogleButton
          type="dark"
          className=" hover:shadow-lg h-70p  w-30p sm:text-xs "
          onClick={() =>
            (window.location.href =
              "https://url-shortner-g9ip.onrender.com/auth/google")
          }
        />
      ) : (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold h-70p w-30p sm:w-60p rounded-lg transition duration-300 ease-in-out"
          onClick={logout}
        >
          Logout
        </button>
      )}
      <div className="h-10p w-5p"></div>
    </div>
  </header>

  <main className="w-90p sm:w-90p md:w-50p lg:w-40p h-50p bg-gray-800 shadow-2xl rounded-lg flex flex-col items-center p-5 mt-5">
    <form
      onSubmit={handleSubmit}
      className="h-100p w-100p flex flex-col items-center"
    >
      <div className="h-10p w-100p"></div>
      <div className="h-30p w-100p flex flex-col">
        <label
          htmlFor="url"
          className="h-40p text-xl font-medium text-gray-300 flex items-center"
        >
          Enter URL to shorten
        </label>
        <input
          type="url"
          id="url"
          required
          className="h-70p w-100p border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      <div className="h-10p w-100p"></div>
      <button
        type="submit"
        disabled={isLoading}
        className="h-20p w-90p bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
      >
        {isLoading ? "Creating..." : "Create Short URL"}
      </button>
      {error && (
        <p className="text-red-500 text-center mt-2">
          {error}
        </p>
      )}

      {shortUrl && (
        <div className="w-100p h-60p bg-gray-700 rounded-lg shadow-md flex flex-col items-center mt-5">
          <p className="text-sm font-medium text-gray-300 h-30p flex items-center justify-center">
            Shortened URL:
          </p>
          <div className="h-50p w-90p flex flex-col items-center">
            <button
              className="text-white bg-blue-600 font-bold h-80p w-100p rounded-lg hover:bg-blue-700"
              onClick={() => (window.location.href = shortUrl)}
            >
              {shortUrl.length > 50
                ? shortUrl.slice(0, 25) + "..." + shortUrl.slice(-10)
                : shortUrl}
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="h-60p w-100p bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out mt-2"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </form>
  </main>
</div>

  
  )
}


export default App