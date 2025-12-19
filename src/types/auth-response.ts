export interface AuthResponse {
  email: string;
  name: string;
  lastname: string;
  documentType: string;
  documentNumber: string;
  roles: string[];
  token: Token;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
