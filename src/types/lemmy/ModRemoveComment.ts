
import type { CommentId } from "./CommentId";
import type { PersonId } from "./PersonId";

export interface ModRemoveComment {
  id: number;
  mod_person_id: PersonId;
  comment_id: CommentId;
  reason?: string;
  removed: boolean;
  when_: string;
}
