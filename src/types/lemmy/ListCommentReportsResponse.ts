import type { CommentReportView } from "./CommentReportView";

export interface ListCommentReportsResponse {
  comment_reports: Array<CommentReportView>,
  error?: string,
  message?: string,
}
