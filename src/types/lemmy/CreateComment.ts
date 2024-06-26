
import type { CommentId } from "./CommentId";
import type { LanguageId } from "./LanguageId";
import type { PostId } from "./PostId";

export interface CreateComment {
  content: string;
  post_id: PostId;
  parent_id?: CommentId;
  language_id?: LanguageId;
}
