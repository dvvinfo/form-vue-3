# Use Node.js 20 as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including dev dependencies for building
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application (including init-db.ts)
RUN npx tsc init-db.ts --outDir dist/src --target ES2023 --module commonjs --esModuleInterop true

# Build the main application
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 3000

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership of the app directory to the nestjs user
RUN chown -R nestjs:nodejs /app

# Switch to the non-root user
USER nestjs

# Run migrations and then start the application
CMD ["sh", "-c", "node dist/src/init-db.js && node dist/src/main.js"]