
import type { CommentView } from "./CommentView";

export interface GetCommentsResponse {
  comments: Array<CommentView>,
  errors?: string[],
  message?: string,
  status?: string,
}
