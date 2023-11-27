# Use an official Node runtime as a parent image
FROM node:19.3.0

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy all local files to /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Run app.js when the container launches
CMD ["npm", "start"]
