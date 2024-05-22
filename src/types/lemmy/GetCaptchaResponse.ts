
import type { CaptchaResponse } from "./CaptchaResponse";

export interface GetCaptchaResponse {
  ok?: CaptchaResponse,
  errors?: string[],
  message?: string,
  status?: string,
}
