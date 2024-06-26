
import type { CommentId } from "./CommentId";
import type { CommentReportId } from "./CommentReportId";
import type { PersonId } from "./PersonId";

export interface CommentReport {
  id: CommentReportId;
  creator_id: PersonId;
  comment_id: CommentId;
  original_comment_text: string;
  reason: string;
  resolved: boolean;
  resolver_id?: PersonId;
  published: string;
  updated?: string;
}
