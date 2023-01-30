import type { ApiResponse } from "./API";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse;
