
import type { AdminPurgePost } from "./AdminPurgePost";
import type { Community } from "./Community";
import type { Person } from "./Person";

export interface AdminPurgePostView {
  admin_purge_post: AdminPurgePost;
  admin?: Person;
  community: Community;
}
