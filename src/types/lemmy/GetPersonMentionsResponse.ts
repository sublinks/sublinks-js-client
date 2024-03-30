
import type { PersonMentionView } from "./PersonMentionView";

export interface GetPersonMentionsResponse {
  mentions: Array<PersonMentionView>,
  error?: string,
  message?: string,
}
