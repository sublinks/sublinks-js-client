import type { RegistrationApplicationView } from "./RegistrationApplicationView";

export interface RegistrationApplicationResponse {
  registration_application: RegistrationApplicationView,
  errors?: string[],
  message?: string,
}
