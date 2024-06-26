
import type { Community } from "./Community";
import type { ModLockPost } from "./ModLockPost";
import type { Person } from "./Person";
import type { Post } from "./Post";

export interface ModLockPostView {
  mod_lock_post: ModLockPost;
  moderator?: Person;
  post: Post;
  community: Community;
}
