
import type { PostId } from "./PostId";

export interface SavePost {
  post_id: PostId;
  save: boolean;
}
