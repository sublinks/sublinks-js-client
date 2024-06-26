
import type { CommentId } from "./CommentId";
import type { LanguageId } from "./LanguageId";
import type { PersonId } from "./PersonId";
import type { PostId } from "./PostId";

export interface Comment {
  id: CommentId;
  creator_id: PersonId;
  post_id: PostId;
  content: string;
  removed: boolean;
  published: string;
  updated?: string;
  deleted: boolean;
  ap_id: string;
  local: boolean;
  path: string;
  distinguished: boolean;
  language_id: LanguageId;
}
