# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY football-imposter-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY football-imposter-frontend/ .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]

