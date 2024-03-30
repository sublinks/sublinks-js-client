
import type { CommentSortType } from "./CommentSortType";

export interface GetPersonMentions {
  sort?: CommentSortType;
  page?: /* integer */ number;
  limit?: /* integer */ number;
  unread_only?: boolean;
}
