
import type { PersonId } from "./PersonId";
import type { PostId } from "./PostId";
import type { PostReportId } from "./PostReportId";

export interface PostReport {
  id: PostReportId;
  creator_id: PersonId;
  post_id: PostId;
  original_post_name: string;
  original_post_url?: string;
  original_post_body?: string;
  reason: string;
  resolved: boolean;
  resolver_id?: PersonId;
  published: string;
  updated?: string;
}
