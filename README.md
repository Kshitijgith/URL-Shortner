# 🚀 URL Shortener

## 🌟 Overview
The **URL Shortener** is a web application that allows users to shorten long URLs into concise, easy-to-share links. It also includes authentication via Google OAuth, caching with Redis for improved performance, and deployment using AWS services.

## ✨ Features
- 🔗 **URL Shortening**: Convert long URLs into short, shareable links.
- ⚡ **Caching with Redis**: Optimizes performance by caching frequently accessed URLs.
- 🔐 **Google OAuth Authentication**: Secure login and user authentication via Google.
- ☁️ **AWS Deployment**:
  - Deployed using **AWS Elastic Container Registry (ECR)** and **Elastic Container Service (ECS)**.
- ⚙️ **Basic CI/CD Integration**:
  - Automated builds and deployments using **GitHub Actions**.
  - Dockerized builds pushed to AWS ECR.

## 🛠 Tech Stack
- 🎨 **Frontend**: React.js (if applicable)
- ⚙️ **Backend**: Node.js, Express.js
- 🗄 **Database**: MongoDB
- 🔥 **Caching**: Redis
- 🔑 **Authentication**: Google OAuth 2.0
- 🚀 **Deployment**: AWS ECR, AWS ECS

## 📥 Installation & Setup

### ✅ Prerequisites
- 📌 Node.js & npm installed
- 📌 MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- 📌 Redis installed and running
- 📌 AWS CLI configured

### 📌 Steps to Run Locally
1. 📂 Clone the repository:
   ```sh
   git clone https://github.com/Kshitijgith/URL-Shortner
   cd url-shortener
   ```
2. 📦 Install dependencies:
   ```sh
   npm install
   ```
3. 🛠 Set up environment variables in a `.env` file:
   ```env
   PORT=you port
   MONGO_URI=your_mongodb_connection_string
   REDIS_HOST=your_redis_host
   REDIS_PORT=your_redis_port
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. ▶️ Start the Server:
   ```sh
   npm start
   ```
5. ▶️ Go to Client:
   ```sh
   npm run dev
   ```
## 🚢 Deployment
The application is containerized using Docker and deployed to AWS ECS with ECR. A simple CI/CD pipeline using GitHub Actions automates the build and deployment process.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo, make changes, and submit a pull request.

