
import type { Comment } from "./Comment";
import type { Community } from "./Community";
import type { ModRemoveComment } from "./ModRemoveComment";
import type { Person } from "./Person";
import type { Post } from "./Post";

export interface ModRemoveCommentView {
  mod_remove_comment: ModRemoveComment;
  moderator?: Person;
  comment: Comment;
  commenter: Person;
  post: Post;
  community: Community;
}
