
import type { AdminPurgeCommunity } from "./AdminPurgeCommunity";
import type { Person } from "./Person";

export interface AdminPurgeCommunityView {
  admin_purge_community: AdminPurgeCommunity;
  admin?: Person;
}
