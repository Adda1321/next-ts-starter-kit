# Use official Node.js 18 Alpine image for smaller size and security
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (use npm ci for clean install)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables for development (can be overridden by Docker Compose)
ENV NODE_ENV=development
ENV APP_MODE=development
ENV PORT=3000

# Copy the appropriate environment file (handled by Docker Compose env_file)
COPY .env.${APP_MODE:-development} ./.env

# # Generate GraphQL types
# RUN npm run codegen

# Expose the app port
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]
