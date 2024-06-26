import type { RegistrationApplicationView } from "./RegistrationApplicationView";

export interface ListRegistrationApplicationsResponse {
  registration_applications: Array<RegistrationApplicationView>,
  errors?: string[],
  message?: string,
  status?: string,
}
