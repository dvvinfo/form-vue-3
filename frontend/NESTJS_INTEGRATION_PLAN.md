# NestJS Backend Integration Plan

## Overview
This document outlines the plan for integrating the Vue 3 frontend with a NestJS backend to handle form submissions and data storage.

## Technology Stack
- **Frontend**: Vue 3 + TypeScript + Vite + Pinia + Vue Router
- **Backend**: NestJS + TypeScript
- **Database**: SQLite (for simplicity, can be upgraded to PostgreSQL)
- **API Communication**: REST API with JSON payloads
- **Validation**: Class-validator for request validation

## Project Structure
```
project-root/
├── frontend/              # Current Vue 3 application
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── stores/
│   │   └── services/
│   └── vite.config.ts
├── backend/               # New NestJS application
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── forms/         # Forms module
│   │   │   ├── forms.controller.ts
│   │   │   ├── forms.service.ts
│   │   │   ├── forms.module.ts
│   │   │   └── dto/
│   │   │       ├── form-a.dto.ts
│   │   │       └── form-b.dto.ts
│   │   └── submissions/   # Submissions module
│   │       ├── submissions.controller.ts
│   │       ├── submissions.service.ts
│   │       ├── submissions.module.ts
│   │       └── entities/
│   │           └── submission.entity.ts
│   ├── package.json
│   └── nest-cli.json
├── package.json           # Workspace root package.json
└── README.md
```

## Backend Implementation Plan

### 1. Project Setup
- Initialize NestJS project with `@nestjs/cli`
- Configure TypeScript and ESLint
- Set up database integration (TypeORM with SQLite)
- Configure environment variables

### 2. Data Models
- Create Submission entity to store form data
- Define relationships between forms and submissions
- Implement database migrations

### 3. Forms Module
- Create DTOs for Form A and Form B validation
- Implement validation rules matching frontend validation
- Create controller endpoints for form submissions
- Implement service layer for business logic

### 4. API Endpoints
```
POST /forms/a     - Submit Form A data
POST /forms/b     - Submit Form B data
GET /submissions  - Get all submissions
GET /submissions/:id - Get specific submission
```

### 5. Validation Implementation
- Form A DTO with validation decorators:
  - Name: Required, min length 1
  - Email: Optional, email format
  - INN: Required, 10 or 12 digits
  - Phone: Required, exactly 11 digits, +7 format
- Form B DTO with validation decorators:
  - Name: Required, min length 1
  - Surname: Required, min length 1
  - Patronymic: Required, min length 1
  - BirthDate: Required, valid date format
  - Login: Required, min 6 characters, Latin only
  - Email: Required, email format

### 6. Service Layer
- Implement form submission handling
- Generate requestId and classifier
- Store data in database
- Handle error cases

### 7. Frontend Integration
- Create API service layer in Vue frontend
- Update form submission to call backend endpoints
- Handle success and error responses
- Update Pinia store with backend data

## Implementation Steps

### Step 1: Backend Project Setup
1. Create new NestJS project
2. Install required dependencies (TypeORM, SQLite, class-validator)
3. Configure database connection
4. Set up basic project structure

### Step 2: Data Models
1. Create Submission entity
2. Define fields matching form requirements
3. Set up database migrations

### Step 3: Forms Module Implementation
1. Create DTOs with validation rules
2. Implement controller endpoints
3. Create service layer with business logic
4. Add error handling

### Step 4: Frontend API Integration
1. Create API service in Vue frontend
2. Update form submission handlers
3. Connect to backend endpoints
4. Handle responses and errors

### Step 5: Testing
1. Unit tests for backend services
2. Integration tests for API endpoints
3. End-to-end testing with frontend
4. Validation testing

## API Response Format

### Success Response
```json
{
  "requestId": "12345",
  "classifier": "form-a-classifier"
}
```

### Error Response
```json
{
  "error": "Validation failed",
  "message": "Phone must contain exactly 11 digits"
}
```

## Database Schema

### Submission Entity
```typescript
@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestId: string;

  @Column()
  classifier: string;

  @Column()
  formType: 'A' | 'B';

  @Column({ type: 'json' })
  formData: object;

  @CreateDateColumn()
  createdAt: Date;
}
```

## Environment Configuration

### Backend .env
```
PORT=3000
DB_TYPE=sqlite
DB_NAME=database.sqlite
```

### Frontend .env
```
VITE_API_URL=http://localhost:3000
```

## Deployment Considerations

1. **CORS Configuration** - Enable communication between frontend and backend
2. **Environment Variables** - Different configs for development/production
3. **Database Migration** - Automated migration scripts
4. **Logging** - Implement structured logging
5. **Error Handling** - Global exception filters
6. **Security** - Helmet, rate limiting, input sanitization

## Future Enhancements

1. **Authentication** - User login/registration
2. **Authorization** - Role-based access control
3. **File Upload** - Support for document uploads
4. **Email Notifications** - Send confirmation emails
5. **Admin Dashboard** - View all submissions
6. **API Documentation** - Swagger/OpenAPI integration

## Timeline Estimate

1. **Backend Setup**: 2-3 hours
2. **Data Models & Database**: 3-4 hours
3. **Forms Module & Validation**: 4-5 hours
4. **Frontend Integration**: 3-4 hours
5. **Testing & Debugging**: 3-4 hours
6. **Documentation**: 1-2 hours

**Total Estimated Time**: 16-21 hours