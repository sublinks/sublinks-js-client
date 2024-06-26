
import type { CommentReportId } from "./CommentReportId";

export interface ResolveCommentReport {
  report_id: CommentReportId;
  resolved: boolean;
}
