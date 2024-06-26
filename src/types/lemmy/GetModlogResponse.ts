
import type { AdminPurgeCommentView } from "./AdminPurgeCommentView";
import type { AdminPurgeCommunityView } from "./AdminPurgeCommunityView";
import type { AdminPurgePersonView } from "./AdminPurgePersonView";
import type { AdminPurgePostView } from "./AdminPurgePostView";
import type { ModAddCommunityView } from "./ModAddCommunityView";
import type { ModAddView } from "./ModAddView";
import type { ModBanFromCommunityView } from "./ModBanFromCommunityView";
import type { ModBanView } from "./ModBanView";
import type { ModFeaturePostView } from "./ModFeaturePostView";
import type { ModHideCommunityView } from "./ModHideCommunityView";
import type { ModLockPostView } from "./ModLockPostView";
import type { ModRemoveCommentView } from "./ModRemoveCommentView";
import type { ModRemoveCommunityView } from "./ModRemoveCommunityView";
import type { ModRemovePostView } from "./ModRemovePostView";
import type { ModTransferCommunityView } from "./ModTransferCommunityView";

export interface GetModlogResponse {
  removed_posts: Array<ModRemovePostView>,
  locked_posts: Array<ModLockPostView>,
  featured_posts: Array<ModFeaturePostView>,
  removed_comments: Array<ModRemoveCommentView>,
  removed_communities: Array<ModRemoveCommunityView>,
  banned_from_community: Array<ModBanFromCommunityView>,
  banned: Array<ModBanView>,
  added_to_community: Array<ModAddCommunityView>,
  transferred_to_community: Array<ModTransferCommunityView>,
  added: Array<ModAddView>,
  admin_purged_persons: Array<AdminPurgePersonView>,
  admin_purged_communities: Array<AdminPurgeCommunityView>,
  admin_purged_posts: Array<AdminPurgePostView>,
  admin_purged_comments: Array<AdminPurgeCommentView>,
  hidden_communities: Array<ModHideCommunityView>,
  errors?: string[],
  message?: string,
  status?: string,
}
