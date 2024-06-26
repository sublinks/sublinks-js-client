
import type { PersonId } from "./PersonId";
import type { PostId } from "./PostId";

export interface ModLockPost {
  id: number;
  mod_person_id: PersonId;
  post_id: PostId;
  locked: boolean;
  when_: string;
}
