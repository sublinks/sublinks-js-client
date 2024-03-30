
import type { CaptchaResponse } from "./CaptchaResponse";

export interface GetCaptchaResponse {
  ok?: CaptchaResponse,
  error?: string,
  message?: string,
}
