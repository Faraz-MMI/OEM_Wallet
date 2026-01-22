export interface LoginRequest {
  username: string;
  md5Password: string;
  grant_type: 'password';
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  expires_in: number;
  fname: string;
  lname: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface CreateUserRequest {
  userName: string;
  password: string; // md5 hashed
  fname: string;
  lname: string;
  email: string;
  mobile: string;
}

export interface CreateUserResponse {
  status: boolean;
  message: string;
}

export interface SetMpinRequest {
  mPin: string;     // md5 hashed pin
  confPin: string;  // md5 hashed pin
}

export interface SetMpinResponse {
  status: boolean;
  message: string;
}

