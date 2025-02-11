# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install
COPY .env ./
# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 3001

# Command to start the application
CMD ["node", "index.js"]
