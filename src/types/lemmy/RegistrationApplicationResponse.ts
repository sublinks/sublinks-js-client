import type { RegistrationApplicationView } from "./RegistrationApplicationView";

export interface RegistrationApplicationResponse {
  registration_application: RegistrationApplicationView,
  error?: string,
  message?: string,
}
