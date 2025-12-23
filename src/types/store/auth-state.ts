import type { AuthResponse } from '../auth-response';

export interface AuthState {
  user: AuthResponse | null;
  token: string | null;
  role: string | null;
  authenticated: boolean;
}
