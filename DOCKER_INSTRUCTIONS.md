# Docker Setup Instructions

## Prerequisites

1. Install Docker Desktop for Windows/macOS or Docker Engine for Linux
2. Ensure Docker Compose is installed (included with Docker Desktop)

## Quick Start

1. Clone or navigate to the project directory
2. Run the following command to build and start all services:

```bash
docker-compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 3000
- Frontend application on port 80

## Accessing the Application

Once the services are running:

- Frontend: http://localhost
- Backend API: http://localhost/api
- Database: localhost:5432 (PostgreSQL)

## Stopping the Application

To stop all services:

```bash
docker-compose down
```

To stop all services and remove data volumes (WARNING: This will delete all data):

```bash
docker-compose down -v
```

## Development Workflow

### Running Individual Services

To run only the database:

```bash
docker-compose up -d db
```

To run only the backend:

```bash
docker-compose up -d db backend
```

To run only the frontend:

```bash
docker-compose up -d frontend
```

### Viewing Logs

To view logs for all services:

```bash
docker-compose logs -f
```

To view logs for a specific service:

```bash
docker-compose logs -f backend
```

### Rebuilding Services

To rebuild all services:

```bash
docker-compose up --build
```

To rebuild a specific service:

```bash
docker-compose build backend
docker-compose up -d backend
```

## Environment Variables

The application uses environment variables defined in the docker-compose.yml file. You can override these by creating a [.env](file:///d:/test-tz/form/.env) file in the root directory:

```env
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure no other services are running on ports 80, 3000, or 5432
2. **Permission denied**: On Linux, you might need to run Docker commands with sudo
3. **Database connection failed**: Ensure the database service is running before starting the backend

### Checking Service Status

```bash
docker-compose ps
```

### Restarting Services

```bash
docker-compose restart
```

## Testing the Setup

You can run the provided test scripts to verify the setup:

### On Windows (PowerShell):

```powershell
.\test-docker.ps1
```

### On Linux/macOS (Bash):

```bash
chmod +x test-docker.sh
./test-docker.sh
```