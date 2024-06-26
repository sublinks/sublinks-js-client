
import type { PersonMentionView } from "./PersonMentionView";

export interface GetPersonMentionsResponse {
  mentions: Array<PersonMentionView>,
  errors?: string[],
  message?: string,
  status?: string,
}
