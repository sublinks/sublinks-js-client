import type { PostReportView } from "./PostReportView";

export interface ListPostReportsResponse {
  post_reports: Array<PostReportView>,
  error?: string,
  message?: string,
}
