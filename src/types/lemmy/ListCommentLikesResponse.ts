import type { VoteView } from "./VoteView";

export interface ListCommentLikesResponse {
  comment_likes: Array<VoteView>,
  errors?: string[],
  message?: string,
  status?: string,
}
