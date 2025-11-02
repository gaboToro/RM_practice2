# backend/strapi-server/Dockerfile
# Base image: Node.js (Strapi runs on Node)
FROM node:18-alpine

# Create and set the working directory inside the container
WORKDIR /opt/node_app

# Copy manifest files first to leverage Docker cache
# IMPORTANT: npm uses package-lock.json, not yarn.lock. Ensure your project uses package-lock.json
COPY package.json package-lock.json ./ 

# Install dependencies (replaces yarn install --production)
# The '--omit=dev' flag ensures we only install production dependencies, keeping the image small
RUN npm install --omit=dev 

# Copy the rest of the Strapi application files
COPY . .

RUN npm run build

# Expone Strapi's default port
EXPOSE 1337

# Command to start Strapi in production mode (replaces yarn start)
CMD ["npm", "start"]