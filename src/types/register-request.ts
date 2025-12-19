export interface RegisterRequest {
  name: string;
  lastname: string;
  documentType: string;
  documentNumber: string;
  email: string;
  password: string;
  repeatPassword?: string;
}
