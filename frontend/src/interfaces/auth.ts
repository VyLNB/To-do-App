// User roles
export type UserRole = 'student' | 'teacher' | 'admin';

// Auth User - Khớp với response từ backend
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

// Auth Response từ login/register
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

// User Profile Response từ /auth/me
export interface UserProfileResponse {
  success: boolean;
  user: AuthUser;
}

// Update Profile Request
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

// Change Password Request
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Generic API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Error Response
export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  errors?: string[]; // Cho validation errors
}