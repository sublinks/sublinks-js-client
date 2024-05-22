
import type { PersonView } from "./PersonView";

export interface BannedPersonsResponse {
  banned: Array<PersonView>,
  errors?: string[],
  message?: string,
  status?: string,
}
