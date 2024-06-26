
import type { CommentId } from "./CommentId";
import type { LanguageId } from "./LanguageId";

export interface EditComment {
  comment_id: CommentId;
  content?: string;
  language_id?: LanguageId;
}
