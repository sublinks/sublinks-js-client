import type { CommentReportView } from "./CommentReportView";

export interface ListCommentReportsResponse {
  comment_reports: Array<CommentReportView>,
  errors?: string[],
  message?: string,
}
