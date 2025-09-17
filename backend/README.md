# Forms API Backend

Backend service for handling form submissions with NestJS, PostgreSQL, and TypeORM.

## Description

This is a NestJS backend service that handles form submissions for two different form types:
- Form A: For individual users
- Form B: For business users

The service validates incoming data, stores submissions in a PostgreSQL database, and returns appropriate responses.

## Features

- REST API with JSON payloads
- Data validation using class-validator
- PostgreSQL database integration with TypeORM
- CORS support for frontend integration
- UUID-based request tracking
- Docker support for database setup

## Project setup

```bash
# Install dependencies
$ npm install
```

## Database Setup

You can run PostgreSQL in Docker using the provided script:

```bash
# Start PostgreSQL database
$ npm run db:up

# Stop PostgreSQL database
$ npm run db:down
```

Or configure your own PostgreSQL instance and update the environment variables in [.env](file:///d:/test-tz/form/backend/.env) file.

## Environment Configuration

Create a [.env](file:///d:/test-tz/form/backend/.env) file with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=forms_db
DB_SYNC=true

# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints

- `POST /forms/a` - Submit Form A data
- `POST /forms/b` - Submit Form B data
- `GET /submissions` - Get all submissions
- `GET /submissions/:id` - Get specific submission

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Form A Data Structure

```json
{
  "name": "string (required, min length 1)",
  "email": "string (optional, email format)",
  "inn": "string (required, 10 or 12 digits)",
  "phone": "string (required, +7 format with exactly 11 digits)"
}
```

## Form B Data Structure

```json
{
  "name": "string (required, min length 1)",
  "surname": "string (required, min length 1)",
  "patronymic": "string (required, min length 1)",
  "birthDate": "string (required, valid date format)",
  "login": "string (required, min 6 characters, Latin only)",
  "email": "string (required, email format)"
}
```

## Success Response Format

```json
{
  "requestId": "uuid-string",
  "classifier": "form-type-classifier"
}
```

## License

MIT