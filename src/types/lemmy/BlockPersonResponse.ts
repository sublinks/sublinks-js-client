
import type { PersonView } from "./PersonView";

export interface BlockPersonResponse {
  person_view: PersonView,
  blocked: boolean,
  errors?: string[],
  message?: string,
  status?: string,
}
