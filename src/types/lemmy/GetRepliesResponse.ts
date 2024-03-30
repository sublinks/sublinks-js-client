import type { CommentReplyView } from "./CommentReplyView";

export interface GetRepliesResponse {
  replies: Array<CommentReplyView>,
  error?: string,
  message?: string,
}
