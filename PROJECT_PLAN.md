# Project Plan: Vue 3 Forms Application

## Overview
Create a Vue 3 + TypeScript + Vite application with Pinia and Vue Router that includes two forms with specific validation requirements.

## Technology Stack
- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia (State Management)
- Vue Router
- Tailwind CSS v4

## Project Structure
```
src/
├── assets/
│   └── main.css
├── components/
│   ├── forms/
│   │   ├── FormA.vue
│   │   └── FormB.vue
│   ├── InputField.vue
│   ├── Button.vue
│   ├── Header.vue
│   └── Navigation.vue
├── router/
│   └── index.ts
├── stores/
│   ├── formStore.ts
├── views/
│   ├── HomeView.vue
│   ├── FormAView.vue
│   ├── FormBView.vue
│   └── ResultsView.vue
├── types/
│   └── index.ts
├── App.vue
└── main.ts
```

## Implementation Steps

### 1. Setup and Configuration
- [x] Update router configuration with new routes
- [x] Create form store with Pinia
- [x] Define TypeScript interfaces for form data and responses

### 2. Form A Implementation
- [x] Create FormA component with validation
- [x] Implement INN validation (physical vs legal entity)
- [x] Implement phone number formatting (+7 (XXX) XXX-XX-XX)
- [x] Add real-time validation
- [x] Implement form submission to /form/a

### 3. Form B Implementation
- [x] Create FormB component with validation
- [x] Implement date formatting (DD.MM.YYYY)
- [x] Implement login validation (min 6 characters, Latin only)
- [x] Add real-time validation
- [x] Implement form submission to /form/b

### 4. Store Implementation
- [x] Create Pinia store to save requestId and classifier
- [x] Implement store actions for form submissions
- [x] Create getters for accessing stored data

### 5. Results View
- [x] Create ResultsView to display stored data
- [x] Implement navigation to results page after successful submission

### 6. Component Refactoring
- [x] Create reusable InputField component with label
- [x] Create reusable Button component
- [x] Refactor FormA to use new components
- [x] Refactor FormB to use new components

### 7. UI Component Modularization
- [x] Create Header component
- [x] Create Navigation component
- [x] Refactor App.vue to use new components

### 8. Localization
- [x] Translate all validation error messages to Russian
- [x] Translate all UI text to Russian

### 9. Validation and Testing
- [x] Test all form validations
- [x] Verify store functionality
- [x] Test navigation between views
- [x] Verify responsive design with Tailwind

### 10. Backend Integration (Optional)
- [ ] Create NestJS backend
- [ ] Implement form endpoints
- [ ] Connect frontend to backend

## Form Requirements

### Form A Fields
- Name (required)
- Email (optional)
- INN (required, validation for physical/legal entity)
- Phone (required, format +7 (XXX) XXX-XX-XX)

### Form B Fields
- Name (required)
- Surname (required)
- Patronymic (required)
- Date of Birth (required, format DD.MM.YYYY)
- Login (required, min 6 characters, Latin only)
- Email (required)

## Validation Rules
- Real-time validation
- Submit button only active when form is valid
- Server response simulation with fetch and setTimeout
- Success response: { "requestId": "12345", "classifier": "some-string" }
- Error response: { "error": "Error message" }

## Component Approach
- Reusable form components
- Strict typing with TypeScript
- Composition API usage
- Tailwind CSS for styling