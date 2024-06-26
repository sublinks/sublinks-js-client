
import type { PostFeatureType } from "./PostFeatureType";
import type { PostId } from "./PostId";

export interface FeaturePost {
  post_id: PostId;
  featured: boolean;
  feature_type: PostFeatureType;
}
