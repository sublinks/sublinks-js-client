
import type { Community } from "./Community";
import type { ModRemovePost } from "./ModRemovePost";
import type { Person } from "./Person";
import type { Post } from "./Post";

export interface ModRemovePostView {
  mod_remove_post: ModRemovePost;
  moderator?: Person;
  post: Post;
  community: Community;
}
