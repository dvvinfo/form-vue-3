// Form A Types
export interface FormAData {
  name: string;
  email?: string;
  inn: string;
  phone: string;
}

// Form B Types
export interface FormBData {
  name: string;
  surname: string;
  patronymic: string;
  birthDate: string;
  login: string;
  email: string;
}

// Server Response Types
export interface SuccessResponse {
  requestId: string;
  classifier: string;
}

export interface ErrorResponse {
  error: string;
}

export type FormResponse = SuccessResponse | ErrorResponse;