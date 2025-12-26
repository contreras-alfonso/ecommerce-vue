export interface ErrorResponse {
  msg: string;
  error?: string;
  status?: number;
  fieldErrors?: Record<string, string>;
}
