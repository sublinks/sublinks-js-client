
import type { PostId } from "./PostId";

export interface HidePost {
  post_ids: Array<PostId>;
  hide: boolean;
}
