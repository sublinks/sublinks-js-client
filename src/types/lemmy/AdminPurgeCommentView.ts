
import type { AdminPurgeComment } from "./AdminPurgeComment";
import type { Person } from "./Person";
import type { Post } from "./Post";

export interface AdminPurgeCommentView {
  admin_purge_comment: AdminPurgeComment;
  admin?: Person;
  post: Post;
}
