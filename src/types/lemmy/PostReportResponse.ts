import type { PostReportView } from "./PostReportView";

export interface PostReportResponse {
  post_report_view: PostReportView,
  errors?: string[],
  message?: string,
  status?: string,
}
