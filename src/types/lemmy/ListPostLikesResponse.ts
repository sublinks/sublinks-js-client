import type { VoteView } from "./VoteView";

export interface ListPostLikesResponse {
  post_likes: Array<VoteView>,
  errors?: string[],
  message?: string,
}
