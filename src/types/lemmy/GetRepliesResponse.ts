import type { CommentReplyView } from "./CommentReplyView";

export interface GetRepliesResponse {
  replies: Array<CommentReplyView>,
  errors?: string[],
  message?: string,
  status?: string,
}
