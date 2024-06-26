
import type { PersonId } from "./PersonId";
import type { PostId } from "./PostId";

export interface ModFeaturePost {
  id: number;
  mod_person_id: PersonId;
  post_id: PostId;
  featured: boolean;
  when_: string;
  is_featured_community: boolean;
}
