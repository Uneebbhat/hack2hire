export type APIResponse = {
  success: boolean;
  status: number;
  message?: string;
  error?: string;
  data?: unknown
}