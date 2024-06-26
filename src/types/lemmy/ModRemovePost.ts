
import type { PersonId } from "./PersonId";
import type { PostId } from "./PostId";

export interface ModRemovePost {
  id: number;
  mod_person_id: PersonId;
  post_id: PostId;
  reason?: string;
  removed: boolean;
  when_: string;
}
