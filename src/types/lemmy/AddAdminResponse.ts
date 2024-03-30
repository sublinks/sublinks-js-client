
import type { PersonView } from "./PersonView";

export interface AddAdminResponse {
  admins: Array<PersonView>,
  error?: string,
  message?: string,
}
