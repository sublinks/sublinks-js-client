
import type { PostId } from "./PostId";

export interface DeletePost {
  post_id: PostId;
  deleted: boolean;
}
