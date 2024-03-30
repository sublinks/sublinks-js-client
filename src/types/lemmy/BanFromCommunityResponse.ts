
import type { PersonView } from "./PersonView";

export interface BanFromCommunityResponse {
  person_view: PersonView,
  banned: boolean,
  error?: string,
  message?: string,
}
