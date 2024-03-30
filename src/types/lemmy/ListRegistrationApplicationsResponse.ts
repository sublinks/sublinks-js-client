import type { RegistrationApplicationView } from "./RegistrationApplicationView";

export interface ListRegistrationApplicationsResponse {
  registration_applications: Array<RegistrationApplicationView>,
  error?: string,
  message?: string,
}
