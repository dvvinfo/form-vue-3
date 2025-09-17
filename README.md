# Forms Application with Docker

This project contains a Vue 3 frontend and NestJS backend that can be run together using Docker Compose.

## Project Structure

```
.
├── backend/          # NestJS backend API
├── frontend/         # Vue 3 frontend application
├── docker-compose.yml # Docker Compose configuration
└── README.md         # This file
```

## Prerequisites

- Docker
- Docker Compose

## Running the Application

To run the entire application with one command:

```bash
docker-compose up --build
```

This will start:
- PostgreSQL database
- NestJS backend API on port 3000
- Vue 3 frontend on port 80

## Accessing the Application

- Frontend: http://localhost
- Backend API: http://localhost/api
- Database: localhost:5432

## Stopping the Application

To stop all services:

```bash
docker-compose down
```

To stop all services and remove data volumes:

```bash
docker-compose down -v
```

## Development

### Backend Development

To run the backend in development mode:

```bash
cd backend
npm install
npm run start:dev
```

### Frontend Development

To run the frontend in development mode:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

The application uses the following environment variables (defaults shown):

### Database
- `DB_HOST`: localhost
- `DB_PORT`: 5432
- `DB_USERNAME`: postgres
- `DB_PASSWORD`: postgres
- `DB_NAME`: forms_db

### Backend
- `PORT`: 3000
- `FRONTEND_URL`: http://localhost:5173

## API Endpoints

### Form A
- `POST /api/forms/a` - Submit Form A data

### Form B
- `POST /api/forms/b` - Submit Form B data

### Submissions
- `GET /api/submissions` - Get all submissions
- `GET /api/submissions/:id` - Get specific submission

## Docker Images

### Building Images Separately

To build the backend Docker image:

```bash
cd backend
docker build -t forms-api .
```

To build the frontend Docker image:

```bash
cd frontend
docker build -t forms-frontend .
```

### Running Containers Separately

To run the backend container:

```bash
docker run -p 3000:3000 --env-file .env forms-api
```

To run the frontend container:

```bash
docker run -p 8080:80 forms-frontend
```