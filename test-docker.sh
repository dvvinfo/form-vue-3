#!/bin/bash

# Test Docker Setup Script

echo "Testing Docker setup for Forms Application..."

# Check if docker is installed
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "Docker and Docker Compose are installed."

# Build and start services
echo "Building and starting services..."
docker-compose up -d --build

# Wait for services to start
echo "Waiting for services to start..."
sleep 30

# Check if services are running
echo "Checking service status..."
docker-compose ps

# Test backend API
echo "Testing backend API..."
curl -f http://localhost:3000/ || echo "Backend API is not responding"

# Test frontend
echo "Testing frontend..."
curl -f http://localhost/ || echo "Frontend is not responding"

echo "Test completed. Check the output above for any issues."

# Show logs if there were issues
echo "Showing recent logs..."
docker-compose logs --tail=20