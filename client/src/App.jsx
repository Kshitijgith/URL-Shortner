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
    <div className="min-h-screen bg-gradient-to-r bg-slate-300 flex flex-col items-center p-4">
    {/* Header */}
    <header className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">URL Shortener</h1>
      {!token ? (
        <GoogleButton
          type="dark"
          className="shadow-md hover:shadow-lg"
          onClick={() => window.location.href = "https://url-shortner-g9ip.onrender.com/auth/google"}
        />
      ) : (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </header>

    {/* Main Content */}
    <main className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Enter URL to shorten
          </label>
          <input
            type="url"
            id="url"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? "Creating..." : "Create Short URL"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-center">
          <p className="text-sm font-medium text-gray-700 mb-2">Shortened URL:</p>
          <div className=" rounded-lg p-4 flex flex-col items-center">
            <button
              className="text-black bg-blue-300 font-bold py-2 px-4 rounded w-full mb-2"
              onClick={() => window.location.href = shortUrl}
            >
              {shortUrl}
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition w-full"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </main>
  </div>
  )
}


export default App