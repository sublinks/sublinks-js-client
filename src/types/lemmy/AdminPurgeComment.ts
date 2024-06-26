
import type { PersonId } from "./PersonId";
import type { PostId } from "./PostId";

export interface AdminPurgeComment {
  id: number;
  admin_person_id: PersonId;
  post_id: PostId;
  reason?: string;
  when_: string;
}
