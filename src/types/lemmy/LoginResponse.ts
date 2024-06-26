export interface LoginResponse {
  jwt?: string,
  registration_created: boolean,
  verify_email_sent: boolean,
  errors?: string[],
  message?: string,
  status?: string,
}
