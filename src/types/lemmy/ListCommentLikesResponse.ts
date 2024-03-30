import type { VoteView } from "./VoteView";

export interface ListCommentLikesResponse {
  comment_likes: Array<VoteView>,
  error?: string,
  message?: string,
}
