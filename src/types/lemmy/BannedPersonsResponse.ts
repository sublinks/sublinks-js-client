
import type { PersonView } from "./PersonView";

export interface BannedPersonsResponse {
  banned: Array<PersonView>,
  error?: string,
  message?: string,
}
