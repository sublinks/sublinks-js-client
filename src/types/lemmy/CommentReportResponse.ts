
import type { CommentReportView } from "./CommentReportView";

export interface CommentReportResponse {
  comment_report_view: CommentReportView,
  errors?: string[],
  message?: string,
  status?: string,
}
