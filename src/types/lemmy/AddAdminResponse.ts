
import type { PersonView } from "./PersonView";

export interface AddAdminResponse {
  admins: Array<PersonView>,
  errors?: string[],
  message?: string,
  status?: string,
}
