import axios from 'axios';
import type { FormAData, FormBData } from '@/types';

// Create axios instance with base URL
// In Docker environment, we use the Nginx proxy path /api
// In development, we use the direct backend URL
const isDocker = import.meta.env.VITE_DOCKER_ENV === 'true';
const baseURL = isDocker ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:3000');

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error translation map
const errorTranslations: Record<string, string> = {
  'Phone must be in +7 format with exactly 11 digits': 'Телефон должен быть в формате +7 и содержать ровно 11 цифр',
  'phone must be a number string': 'Телефон должен быть числовым значением',
  'INN must be 10 or 12 digits': 'ИНН должен содержать 10 или 12 цифр',
  'Login must contain only Latin characters and numbers': 'Логин должен содержать только латинские символы и цифры',
  'name must be a string': 'Имя должно быть строкой',
  'name should not be empty': 'Имя не должно быть пустым',
  'surname must be a string': 'Фамилия должна быть строкой',
  'surname should not be empty': 'Фамилия не должна быть пустой',
  'patronymic must be a string': 'Отчество должно быть строкой',
  'patronymic should not be empty': 'Отчество не должно быть пустым',
  'birthDate must be a string': 'Дата рождения должна быть строкой',
  'birthDate should not be empty': 'Дата рождения не должна быть пустой',
  'login must be a string': 'Логин должен быть строкой',
  'login should not be empty': 'Логин не должен быть пустым',
  'email must be an email': 'Неверный формат электронной почты',
  'email must be a string': 'Email должен быть строкой',
  'email should not be empty': 'Email не должен быть пустым',
  'inn must be a number string': 'ИНН должен быть числовым значением',
  'inn should not be empty': 'ИНН не должен быть пустым',
  'phone should not be empty': 'Телефон не должен быть пустым'
};

// Function to translate error messages
const translateError = (message: string): string => {
  return errorTranslations[message] || message;
};

// API functions
export const submitFormA = async (data: FormAData) => {
  try {
    const response = await apiClient.post('/forms/a', data);
    return response.data;
  } catch (error: any) {
    console.error('Error submitting Form A:', error);
    
    // Handle validation errors from backend
    if (error.response?.data?.message) {
      const backendErrors = error.response.data.message;
      if (Array.isArray(backendErrors)) {
        // Translate each error message
        const translatedErrors = backendErrors.map(translateError);
        throw new Error(translatedErrors.join(', '));
      } else if (typeof backendErrors === 'string') {
        throw new Error(translateError(backendErrors));
      }
    }
    
    throw error;
  }
};

export const submitFormB = async (data: FormBData) => {
  try {
    const response = await apiClient.post('/forms/b', data);
    return response.data;
  } catch (error: any) {
    console.error('Error submitting Form B:', error);
    
    // Handle validation errors from backend
    if (error.response?.data?.message) {
      const backendErrors = error.response.data.message;
      if (Array.isArray(backendErrors)) {
        // Translate each error message
        const translatedErrors = backendErrors.map(translateError);
        throw new Error(translatedErrors.join(', '));
      } else if (typeof backendErrors === 'string') {
        throw new Error(translateError(backendErrors));
      }
    }
    
    throw error;
  }
};

export const getSubmissions = async () => {
  try {
    const response = await apiClient.get('/submissions');
    return response.data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};