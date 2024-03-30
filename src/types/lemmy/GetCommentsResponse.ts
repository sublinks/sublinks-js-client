
import type { CommentView } from "./CommentView";

export interface GetCommentsResponse {
  comments: Array<CommentView>,
  error?: string,
  message?: string,
}
