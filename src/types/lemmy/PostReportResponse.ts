import type { PostReportView } from "./PostReportView";

export interface PostReportResponse {
  post_report_view: PostReportView,
  error?: string,
  message?: string,
}
