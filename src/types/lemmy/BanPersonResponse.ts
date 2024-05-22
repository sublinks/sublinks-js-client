
import type { PersonView } from "./PersonView";

export interface BanPersonResponse {
  person_view: PersonView,
  banned: boolean,
  errors?: string[],
  message?: string,
  status?: string,
}
