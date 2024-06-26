import type { PersonMentionView } from "./PersonMentionView";

export interface PersonMentionResponse {
  person_mention_view: PersonMentionView,
  errors?: string[],
  message?: string,
  status?: string,
}
