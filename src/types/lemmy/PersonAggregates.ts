
import type { PersonId } from "./PersonId";

export interface PersonAggregates {
  person_id: PersonId;
  post_count: /* integer */ number;
  comment_count: /* integer */ number;
  post_score?: number;
  comment_score?: number;
}
