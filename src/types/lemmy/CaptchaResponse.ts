

export interface CaptchaResponse {
  png: string,
  wav: string,
  uuid: string,
  errors?: string[],
  message?: string,
}
