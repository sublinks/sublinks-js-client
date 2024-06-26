
import type { Community } from "./Community";
import type { ModFeaturePost } from "./ModFeaturePost";
import type { Person } from "./Person";
import type { Post } from "./Post";

export interface ModFeaturePostView {
  mod_feature_post: ModFeaturePost;
  moderator?: Person;
  post: Post;
  community: Community;
}
