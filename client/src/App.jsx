import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";

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
      const response = await axios.post("http://localhost:3001/GenrateUrl",
        {url:url},
        {
        headers: {
          Authorization: token
        }
      })
    console.log(response);
      setShortUrl(response.data.newurl)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
    
    
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">URL Shortener</h1>
          {!token?<button
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
  onClick={() => window.location.href = "http://localhost:3001/auth/google"} // Replace with your URL
>
  Login with Google
</button>:<button
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
  onClick={()=>{logout()}}
>
  Logout
</button>}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? "Creating..." : "Create Short URL"}
            </button>
          </form>

          {error && <p className="mt-4 text-red-600">{error}</p>}

          {shortUrl && (
  <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
    <p className="text-sm font-medium text-gray-700">Shortened URL:</p>
    <div className="flex items-center space-x-2 mt-2">
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium hover:underline break-all"
      >
        {shortUrl}
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(shortUrl)}
        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
      >
        Copy
      </button>
    </div>
  </div>
)}

        </div>
      </main>
    </div>
  )
}


export default App