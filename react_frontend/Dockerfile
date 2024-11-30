# Using the official node 16 Alpine image as the base image (lightweight and optimized for production)
FROM node:16-alpine

# Set the working directory inside the container to /react_frontend
WORKDIR /react_frontend

# Copy the package.json and package-lock.json files into the container
# These files are used to install project dependencies
COPY package.json package-lock.json ./

# Install all project dependencies specified in package.json
RUN npm install


# Copy the entire React project into the container
# This includes source files, configurations, and assets
COPY . .


# Build the React application
# This creates an optimized production-ready version of the app in the "dist" directory
RUN npm run build


